import { z } from "zod";

export const addBookSchemaValidator = z.object({
  title: z.string().min(3),
  ISBN: z.string().min(3),
  author: z.string().min(3),
  location: z.string().min(3),
});
export const deleteBookSchemaValidator = z.object({
  id: z.number(),
});
export const getBookSchemaValidator = z.object({
  id: z.number(),
});

export const borrowBookSchemaValidator = z.object({
  bookId: z.number(),
  userId: z.number(),
  dueDate: z.coerce.date(),
  borrowDate: z.coerce.date(),
});

export const returnBookSchemaValidator = z.object({
  bookId: z.number(),
  userId: z.number(),
  returnDate: z.coerce.date(),
});

export const getOverDueSchemaValidator = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
});

export const getBorrowingBetweenDatesSchemaValidator = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
});

export type AddBookSchema = z.infer<typeof addBookSchemaValidator>;
export type DeleteBookSchema = z.infer<typeof deleteBookSchemaValidator>;
export type GetBookSchema = z.infer<typeof getBookSchemaValidator>;
export type BorrowBookSchema = z.infer<typeof borrowBookSchemaValidator>;
export type ReturnBookSchema = z.infer<typeof returnBookSchemaValidator>;
export type GetOverDueSchema = z.infer<typeof getOverDueSchemaValidator>;
export type GetBorrowingBetweenDatesSchema = z.infer<
  typeof getBorrowingBetweenDatesSchemaValidator
>;
