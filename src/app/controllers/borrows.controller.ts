import express from 'express';
import { Request, Response } from 'express';
import { Borrow } from '../models/borrows.model';


export const borrowsRouter = express.Router();


borrowsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const borrowData = req.body;
        
        // Used the static method to handle both operations
        const data = await Borrow.createBorrowAndUpdateBook(borrowData);
        
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to borrow book",
            error
        });
    }
});


borrowsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const data = await Borrow.aggregate([
            {
                $group :{
                    _id : "$book",
                    totalQuantity: { $sum: "$quantity" },
                }
            },

            {
                $lookup : {
                    from : "books",
                    localField : "_id",
                    foreignField : "_id",
                    as : "book"
                }
            },
            {
                $unwind: "$book"
            },

            {
                $project : {
                     _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    },
                    totalQuantity: 1
                }
            }

        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data
        });

        
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrowed books summary",
            error: error.message || error
        });

    }
});