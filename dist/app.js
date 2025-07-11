"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrows_controller_1 = require("./app/controllers/borrows.controller");
const errorHandler_1 = require("./app/middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", books_controller_1.booksRouter);
app.use("/api/borrow", borrows_controller_1.borrowsRouter);
app.get("/", (req, res) => {
    res.send("Welcome to the Library app");
});
// Error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
    (0, errorHandler_1.errorHandler)(err, req, res, next);
});
exports.default = app;
