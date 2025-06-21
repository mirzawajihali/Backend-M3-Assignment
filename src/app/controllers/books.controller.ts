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


booksRouter.get("/" , async(req : Request, res: Response) =>{

    //   const { 
    //         filter, 
    //         sortBy = 'createdAt', 
    //         sort = 'asc', 
    //         limit = '10' 
    //     } = req.query;
        
    //     // Build query
    //     const query = Book.find();
        
    //     // Apply filter dynamically if provided
    //     if (filter) {
    //         query.where('genre', filter);
    //     }
        
    //     // Apply dynamic sorting - can handle any valid field
    //     const sortDirection = sort === 'desc' ? -1 : 1;
    //     query.sort({ [sortBy as string]: sortDirection });
        
    //     // Apply pagination limit
    //     const limitValue = parseInt(limit as string) || 10;
    //     query.limit(limitValue);
        
    //     // Execute query
    //     const data = await query.exec();
    const data = await Book.find();
        
        res.status(200).json({
            success : true,
            message: "Books got successfully",
            data
        });
})


booksRouter.get("/:id", async(req : Request, res: Response) => {


    const id = req.params.id;
    const data = await Book.findById(id);

    res.status(200).json({
        success : true,
        message: "Book got successfully",
        data
    });
})


booksRouter.put('/:bookId', async(req : Request, res: Response) => {
    const id = req.params.bookId;
    const updatableData = req.body;
    const data = await Book.findByIdAndUpdate(id, updatableData, {
       new : true
    });
    res.status(200).json({
        success : true,
        message: "Book updated successfully",
        data
    });
})


booksRouter.delete('/:bookId', async(req : Request, res: Response) => {
    const id = req.params.bookId;
    const data = await Book.findByIdAndDelete(id);
    res.status(200).json({
        success : true,
        message: "Book deleted successfully",
        data
    });
})