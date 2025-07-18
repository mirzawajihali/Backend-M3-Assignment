# Library Management System API

A simple RESTful API for managing books and book borrowing in a library.

## Overview

This project is a backend API built with Express.js and MongoDB that allows you to:
- Manage books (add, view, update, delete)
- Track book borrowing
- Generate reports on borrowed books

## Running Locally

### Prerequisites
- Node.js installed on your machine
- MongoDB database (local or Atlas)

### Steps to Run
1. Clone this repository
   ```
   git clone https://github.com/yourusername/library-management-api.git
   cd library-management-api
   ```

2. Install dependencies: 
   ```
   npm install
   ```
   
3. Create a `.env` file in the root folder with:
   ```
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   ```
   
4. Start the development server: 
   ```
   npm run dev
   ```
   
5. Your API is now running at `http://localhost:5000`

## Deployment

1. Build the project:
   ```
   npm run build
   ```
   
2. To deploy on Vercel:
   ```
   vercel --prod
   ```

## API Endpoints

### Books API

- **POST /api/books** - Create a new book
- **GET /api/books** - Get all books (with optional filtering)
  - Example: `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`
  (given)
- **GET /api/books/:bookId** - Get a book by ID
- **PUT /api/books/:bookId** - Update a book
- **DELETE /api/books/:bookId** - Delete a book

### Borrow API

- **POST /api/borrow** - Borrow a book (automatically updates book copies)
- **GET /api/borrow** - Get summary of all borrowed books

## Error Handling

The API returns consistent error responses in the following format:

```json
{
  "message": "Error message",
  "success": false,
  "error": {
    "name": "ErrorType",
    "errors": { /* Error details */ }
  }
}
```

## Technologies Used

- Express.js: Web framework
- MongoDB/Mongoose: Database and ODM
- TypeScript: Programming language
- Vercel: Deployment platform
