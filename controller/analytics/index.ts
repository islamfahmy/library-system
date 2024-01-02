import express, { Request, Response } from "express";
import {
  getBorrowingBetweenDatesSchemaValidator,
  getOverDueSchemaValidator,
} from "../book/schema";
import {
  HandleGetBorrowingBetweenDates,
  HandleGetOverDue,
} from "../../service/borrow";

export const analyticsRouter = express.Router();

/**
 * @swagger
 * /analytics/overdue:
 *   get:
 *     summary: Get overdue books analytics
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: Start date for overdue analytics
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: End date for overdue analytics (optional)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: Overdue books analytics retrieved successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

analyticsRouter.get("/overdue", async (req: Request, res: Response) => {
  try {
    const validateDate = getOverDueSchemaValidator.safeParse(req.query);
    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await HandleGetOverDue(validateDate.data);

    if (result.code !== 200) {
      return res.status(result.code).json(result.message);
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");
    res.status(200).send(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});

/**
 * @swagger
 * /analytics/borrowings:
 *   get:
 *     summary: Get borrowing analytics between dates
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: Start date for borrowing analytics
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: End date for borrowing analytics (optional)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: Borrowing analytics between dates retrieved successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
analyticsRouter.get("/borrowings", async (req: Request, res: Response) => {
  try {
    const validateDate = getBorrowingBetweenDatesSchemaValidator.safeParse(
      req.query
    );
    if (!validateDate.success) {
      return res.status(400).json(validateDate.error);
    }

    const result = await HandleGetBorrowingBetweenDates(validateDate.data);

    if (result.code !== 200) {
      return res.status(result.code).json(result.message);
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");
    res.status(200).send(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
});
