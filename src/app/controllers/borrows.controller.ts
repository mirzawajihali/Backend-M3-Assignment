import express from 'express';
import { Request, Response } from 'express';
import { Borrow } from '../models/borrows.model';


export const borrowsRouter = express.Router();


borrowsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const borrowData = req.body;
        
        // Use the static method to handle both operations
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
