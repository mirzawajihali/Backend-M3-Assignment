
import express, { Request, Response, Application, NextFunction } from 'express';   
import cors from 'cors';
import { booksRouter } from './app/controllers/books.controller';
import { borrowsRouter } from './app/controllers/borrows.controller';
import { errorHandler } from './app/middlewares/errorHandler';


const app : Application = express();
app.use(cors({origin: 'http://localhost:5173'}))

app.use(express.json());


app.use("/api/books", booksRouter)

app.use("/api/borrow", borrowsRouter )


app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Library app");  });

// Error handling middleware (must be after all routes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

export default app;