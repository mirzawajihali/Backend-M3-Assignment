import express, { Request, Response } from 'express';
import { Book } from '../models/books.model';


export const booksRouter = express.Router();


booksRouter.post("/" , async(req : Request, res: Response) =>{
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
        res.status(error.name === 'ValidationError' ? 400 : 500).json({
            success: false,
            message: error.name === 'ValidationError' ? 'Validation failed' : 'Failed to create book',
            error
        });
    }
})


booksRouter.get("/", async (req: Request, res: Response) => {
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
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: "Error retrieving books",
            error: error.message
        });
    }
});


booksRouter.get("/:bookId", async(req : Request, res: Response) => {

try{
    
    const id = req.params.bookId;
    const data = await Book.findById(id);
   

    res.status(200).json({
        success : true,
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
    try{
        const id = req.params.bookId;
    const data = await Book.findByIdAndDelete(id);
    res.status(200).json({
        success : true,
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
})