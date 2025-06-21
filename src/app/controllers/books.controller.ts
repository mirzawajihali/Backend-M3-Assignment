import express, { Request, Response, NextFunction } from 'express';
import { Book } from '../models/books.model';
import NotFoundError from '../utils/NotFoundError';


export const booksRouter = express.Router();


booksRouter.post("/" , async(req : Request, res: Response, next: NextFunction) =>{
   try{
     const body = req.body;

    const data = await Book.create(body);

    res.status(201).json({
        success : true,
        message: "Book created successfully",
        data
    });
   }
   catch (error: any) {
        next(error); // Passig the error to the error handling middleware
    }
})


booksRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const { 
        filter, 
        sortBy = 'createdAt', 
        sort = 'asc', 
        limit = '10' 
    } = req.query;

    try {
        // aggregation pipeline
        const pipeline: any[] = [];

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
                [sortBy as string]: sortDirection
            }
        });

       
        const limitValue = parseInt(limit as string) || 10;
        pipeline.push({
            $limit: limitValue
        });

        
        const data = await Book.aggregate(pipeline);

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    } catch (error) {
        next(error);
    }
});


booksRouter.get("/:bookId", async(req : Request, res: Response, next: NextFunction) => {

try{
    
    const id = req.params.bookId;
    const data = await Book.findById(id);
    
    if (!data) {
        throw new NotFoundError('Book', id);
    }

    res.status(200).json({
        success : true,
        message: "Book retrieved successfully",
        data
    });
}
catch (error) {
        next(error);
    }
})


booksRouter.put('/:bookId', async(req : Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.bookId;
        const updatableData = req.body;
        const data = await Book.findByIdAndUpdate(id, updatableData, {
            new: true,
            runValidators: true 
        });
        
        if (!data) {
            throw new NotFoundError('Book', id);
        }
        
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data
        });
    } catch (error) {
        next(error);
    }
})


booksRouter.delete('/:bookId', async(req : Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.bookId;
        const data = await Book.findByIdAndDelete(id);
        
        if (!data) {
            throw new NotFoundError('Book', id);
        }
        
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data
        });
    } catch (error) {
        next(error);
    }
})