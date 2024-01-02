import { Request, Response } from "express";
import {
  HandleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
} from "../../service/user";
import {
  createUserSchemaValidator,
  deleteUserSchemaValidator,
  getUserSchemaValidator,
  updateUserSchemaValidator,
} from "./schema";

import express from "express";
export const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 *
 * components:
 *   schemas:
 *     CreateUserSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 *       required:
 *         - name
 *         - email
 *         - password
 *
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserSchema'
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const validateDate = createUserSchemaValidator.safeParse(req.body);

    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await HandleCreateUser(validateDate.data);
    return res.status(result.code).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: Email of the user to be deleted
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

userRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const validateDate = deleteUserSchemaValidator.safeParse(req.query);

    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await handleDeleteUser(validateDate.data);
    return res.status(result.code).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: Email of the user to retrieve details
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const validateDate = getUserSchemaValidator.safeParse(req.query);

    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await handleDeleteUser(validateDate.data);
    return res.status(result.code).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update user details
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserSchema'
 *     responses:
 *       '200':
 *         description: User details updated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
userRouter.patch("/", async (req: Request, res: Response) => {
  try {
    const validateDate = updateUserSchemaValidator.safeParse(req.body);

    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await handleUpdateUser(validateDate.data);
    return res.status(result.code).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});
