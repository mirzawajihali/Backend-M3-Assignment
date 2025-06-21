import { model, Schema } from "mongoose";
import { BorrowStaticMethods, IBorrow } from "../interfaces/borrows.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow, BorrowStaticMethods>({
    book: { 
        type: Schema.Types.ObjectId,
         ref: "Book",
         required: true },

    quantity: { 
        type: Number, 
        required: true,
        min: 1 },
        
    dueDate: { 
        type: Date,
        required: true }
}, {
    timestamps: true,
    versionKey: false
})

borrowSchema.statics.createBorrowAndUpdateBook = async function(borrowData) {
    
    try {
        // 1. Get the book
        const book = await Book.findById(borrowData.book);
        if (!book) {
            throw new Error("Book not found");
        }
        
        // 2. Check if enough copies are available
        if (book.copies < borrowData.quantity) {
            throw new Error(`Not enough copies available. Only ${book.copies} remaining.`);
        }
         const newCopiesCount = book.copies - borrowData.quantity;
        const updateBookResult = await Book.findByIdAndUpdate(
            borrowData.book,
            { 
                copies: newCopiesCount,
                available: newCopiesCount > 0
            },
            { new: true }
        );
        
        
        if (!updateBookResult) {
            throw new Error("Failed to update book");
        }
        
        // 4. Create borrow record
        const borrow = await this.create(borrowData);
        
        return borrow;
    } catch (error) {
        throw error;
    }
};

export const Borrow = model<IBorrow, BorrowStaticMethods>("Borrow", borrowSchema);