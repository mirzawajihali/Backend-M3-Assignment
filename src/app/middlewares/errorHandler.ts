import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  
  let statusCode = 500;

  if (err.name === 'ValidationError') {
  statusCode = 400;
  return res.status(statusCode).json({
    message: "Validation failed",
    success: false,
    error: {
      name: err.name,
      errors: err.errors
    }
  });
}
  
  
  if (err.name === 'NotFoundError' || err.message.includes('not found')) {
    statusCode = 404;
  }
  
 
  return res.status(statusCode).json({
    message: err.message || "Something went wrong",
    success: false,
    error: err
  });
};
