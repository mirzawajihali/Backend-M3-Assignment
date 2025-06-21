import express, { Request, Response } from 'express';
import { Book } from '../models/books.model';


export const booksRouter = express.Router();


booksRouter.post("/" , async(req : Request, res: Response) =>{
    const body = req.body;

    const data = await Book.create(body);

    res.status(201).json({
        success : true,
        message: "Book created successfully",
        data
    });
})