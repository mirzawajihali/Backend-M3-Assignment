import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/books.interface";



const bookSchema =new Schema<IBook> ({
    title : {type: String, required: true},
    author : {type: String, required: true},
    genre : {type: String, enum: ["FICTION", "NON-FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], required: true},
    isbn : {type: String, required: true, unique: true},
    description :{ type: String},
    copies : {type: Number, required: true, min: 0},
    available: {type: Boolean, required: true, default: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

},{
    versionKey: false,
})


export const Book = model("Book", bookSchema);