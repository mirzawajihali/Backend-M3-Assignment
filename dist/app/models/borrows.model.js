"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const books_model_1 = require("./books.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
borrowSchema.statics.createBorrowAndUpdateBook = function (borrowData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. Get the book
            const book = yield books_model_1.Book.findById(borrowData.book);
            if (!book) {
                throw new Error("Book not found");
            }
            // 2. Check if enough copies are available
            if (book.copies < borrowData.quantity) {
                throw new Error(`Not enough copies available. Only ${book.copies} remaining.`);
            }
            const newCopiesCount = book.copies - borrowData.quantity;
            const updateBookResult = yield books_model_1.Book.findByIdAndUpdate(borrowData.book, {
                copies: newCopiesCount,
                available: newCopiesCount > 0
            }, { new: true });
            if (!updateBookResult) {
                throw new Error("Failed to update book");
            }
            // 4. Create borrow record
            const borrow = yield this.create(borrowData);
            return borrow;
        }
        catch (error) {
            throw error;
        }
    });
};
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
