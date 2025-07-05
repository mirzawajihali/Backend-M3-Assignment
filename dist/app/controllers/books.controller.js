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
const NotFoundError_1 = __importDefault(require("../utils/NotFoundError"));
exports.booksRouter = express_1.default.Router();
exports.booksRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        next(error); // Passig the error to the error handling middleware
    }
}));
exports.booksRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        next(error);
    }
}));
exports.booksRouter.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const data = yield books_model_1.Book.findById(id);
        if (!data) {
            throw new NotFoundError_1.default('Book', id);
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.booksRouter.put('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updatableData = req.body;
        const data = yield books_model_1.Book.findByIdAndUpdate(id, updatableData, {
            new: true,
            runValidators: true
        });
        if (!data) {
            throw new NotFoundError_1.default('Book', id);
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.booksRouter.delete('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const data = yield books_model_1.Book.findByIdAndDelete(id);
        if (!data) {
            throw new NotFoundError_1.default('Book', id);
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data
        });
    }
    catch (error) {
        next(error);
    }
}));
