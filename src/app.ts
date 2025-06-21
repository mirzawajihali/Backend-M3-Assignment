import express, { Request, Response, Application    } from 'express';   
import { model, Schema } from 'mongoose';
import { booksRouter } from './app/controllers/books.controller';


const app : Application = express();

app.use(express.json());


app.use("/api/books", booksRouter)



app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Library app");  });

export default app;