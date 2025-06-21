import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Default status code
  let statusCode = 500;
  
  // For validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    return res.status(statusCode).json({
      message: "Validation failed",
      success: false,
      error: err
    });
  }
  
  // For 404 errors (Not Found)
  if (err.name === 'NotFoundError' || err.message.includes('not found')) {
    statusCode = 404;
  }
  
  // For other errors
  return res.status(statusCode).json({
    message: err.message || "Something went wrong",
    success: false,
    error: err
  });
};
