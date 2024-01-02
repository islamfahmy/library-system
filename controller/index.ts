import express from "express";
import { userRouter } from "./user";
import { bookRouter } from "./book";
import { analyticsRouter } from "./analytics";
export const router = express.Router();

// Combine  routes
router.use("/user", userRouter);
router.use("/books", bookRouter);
router.use("/analytics", analyticsRouter);
