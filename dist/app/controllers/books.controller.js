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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data
        });
    }
    catch (error) {
        res.status(error.name === 'ValidationError' ? 400 : 500).json({
            success: false,
            message: error.name === 'ValidationError' ? 'Validation failed' : 'Failed to create book',
            error
        });
    }
}));
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
    try {
        // aggregation pipeline
        const pipeline = [];
        if (filter) {
            pipeline.push({
                $match: {
                    genre: filter
                }
            });
        }
        const sortDirection = sort === 'desc' ? -1 : 1;
        pipeline.push({
            $sort: {
                [sortBy]: sortDirection
            }
        });
        const limitValue = parseInt(limit) || 10;
        pipeline.push({
            $limit: limitValue
        });
        const data = yield books_model_1.Book.aggregate(pipeline);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving books",
            error: error.message
        });
    }
}));
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const data = yield books_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book got successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve book",
            error
        });
    }
}));
exports.booksRouter.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const updatableData = req.body;
    const data = yield books_model_1.Book.findByIdAndUpdate(id, updatableData, {
        new: true
    });
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data
    });
}));
exports.booksRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const data = yield books_model_1.Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete book",
            error
        });
    }
}));
