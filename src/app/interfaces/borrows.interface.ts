import { Model } from "mongoose";
import { Types } from "mongoose";

export interface IBorrow {
    book :Types.ObjectId,
    quantity: number,
    dueDate: Date,
    createdAt: Date,
    updatedAt: Date
   
}


export interface BorrowStaticMethods extends Model<IBorrow> {
     createBorrowAndUpdateBook(borrowData: {
        book: Types.ObjectId;
        quantity: number;
        dueDate: Date;
    }): Promise<IBorrow>;

    //this is an asynchronous method thats why it returns a promise.
    
}