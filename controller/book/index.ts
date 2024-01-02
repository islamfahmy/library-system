import express, { Request, Response } from "express";
import {
  addBookSchemaValidator,
  borrowBookSchemaValidator,
  deleteBookSchemaValidator,
  getBookSchemaValidator,
  returnBookSchemaValidator,
} from "./schema";
import {
  HandleAddBook,
  HandleDeleteBook,
  HandleGetBook,
} from "../../service/book";
import { HandleBorrowBook, HandleReturnBook } from "../../service/borrow";
export const bookRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 *
 * components:
 *   schemas:
 *     AddBookSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *         ISBN:
 *           type: string
 *           minLength: 3
 *         author:
 *           type: string
 *           minLength: 3
 *         location:
 *           type: string
 *           minLength: 3
 *       required:
 *         - title
 *         - ISBN
 *         - author
 *         - location
 *
 * /books:
 *   post:
 *     summary: Add a book
 *     tags: [Books]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddBookSchema'
 *     responses:
 *       '200':
 *         description: Book added successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const validateDate = addBookSchemaValidator.safeParse(req.body);

    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await HandleAddBook(validateDate.data);
    return res.status(result.code).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});

/**
 * @swagger
 * /books:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteBookSchema'
 *     responses:
 *       '200':
 *         description: Book deleted successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *
 *   get:
 *     summary: Get book details
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve details
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Book details retrieved successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

bookRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const validateDate = deleteBookSchemaValidator.safeParse(req.body);

    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await HandleDeleteBook(validateDate.data);
    return res.status(result.code).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get book details
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve details
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Book details retrieved successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const validateDate = getBookSchemaValidator.safeParse(req.body);

    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await HandleGetBook(validateDate.data);
    return res.status(result.code).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});

/**
 * @swagger
 * /books/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Books]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BorrowBookSchema'
 *     responses:
 *       '200':
 *         description: Book borrowed successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
bookRouter.post("/borrow", async (req: Request, res: Response) => {
  try {
    const validateDate = borrowBookSchemaValidator.safeParse(req.body);

    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await HandleBorrowBook(validateDate.data);

    return res.status(result.code).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});

/**
 * @swagger
 * /books/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Books]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReturnBookSchema'
 *     responses:
 *       '200':
 *         description: Book returned successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

bookRouter.post("/return", async (req: Request, res: Response) => {
  try {
    const validateDate = returnBookSchemaValidator.safeParse(req.body);

    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await HandleReturnBook(validateDate.data);

    return res.status(result.code).json(result.message);
  } catch (error) {}
});
