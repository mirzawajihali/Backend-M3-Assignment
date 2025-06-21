import express, { Request, Response, Application    } from 'express';   
import { model, Schema } from 'mongoose';
import { booksRouter } from './app/controllers/books.controller';
import { borrowsRouter } from './app/controllers/borrows.controller';


const app : Application = express();

app.use(express.json());


app.use("/api/books", booksRouter)

app.use("/api/borrow", borrowsRouter )



app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Library app");  });

export default app;