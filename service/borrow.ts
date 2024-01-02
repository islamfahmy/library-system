import {
  BorrowBookSchema,
  GetBorrowingBetweenDatesSchema,
  GetOverDueSchema,
  ReturnBookSchema,
} from "../controller/book/schema";
import { getBookById } from "../data/book";
import {
  GetBorrowingsBetweenDates,
  GetOverDueBooks as GetOverDueBorrowings,
  UpdateBorrowing,
  createBorrowing,
  getLastBorrowingByBookId,
} from "../data/borrowing";
import { getUserById, updateUser } from "../data/user";
import { createObjectCsvWriter } from "csv-writer";
import { unparse } from "papaparse";

export const HandleBorrowBook = async (data: BorrowBookSchema) => {
  try {
    const { bookId, userId, dueDate, borrowDate } = data;

    const book = await getBookById(bookId);

    if (!book) {
      return { message: "book not found", code: 404 };
    }

    const user = await getUserById(userId);

    if (!user) {
      return { message: "user not found", code: 404 };
    }

    const lastBookBorrowing = await getLastBorrowingByBookId(bookId);

    if (lastBookBorrowing && lastBookBorrowing.status === "BORROWED") {
      return { message: "book already borrowed", code: 400 };
    }

    await createBorrowing({
      bookId,
      userId,
      dueDate,
      borrowed_at: borrowDate,
      status: "BORROWED",
      returnedAt: null,
    });

    return { message: "book borrowed", code: 200 };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};

export const HandleReturnBook = async (data: ReturnBookSchema) => {
  try {
    const lastBookBorrowing = await getLastBorrowingByBookId(data.bookId);
    if (!lastBookBorrowing) {
      return { message: "borrowing not found", code: 404 };
    }

    if (lastBookBorrowing.status === "RETURNED") {
      return { message: "book already returned", code: 400 };
    }

    if (lastBookBorrowing.userId !== data.userId) {
      return { message: "user not authorized", code: 401 };
    }

    await UpdateBorrowing(lastBookBorrowing.id, {
      status: "RETURNED",
      returnedAt: data.returnDate,
    });
    return { message: "book returned", code: 200 };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};

export const HandleGetOverDue = async (data: GetOverDueSchema) => {
  try {
    const { startDate, endDate } = data;

    const overDueBorrowings = await GetOverDueBorrowings(startDate, endDate);

    const dataTowrite = overDueBorrowings.map((borrowing) => ({
      userName: borrowing.user.name,
      bookTitle: borrowing.book.title,
      dueDate: borrowing.dueDate.toUTCString(),
      ISBN: borrowing.book.ISBN,
      userEmail: borrowing.user.email,
      borrowDate: borrowing.borrowed_at.toUTCString(),
      bookId: borrowing.bookId,
      status: borrowing.status,
    }));

    const csvData = unparse(dataTowrite);

    return {
      message: "overdue books found",
      code: 200,
      data: csvData,
    };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};

export const HandleGetBorrowingBetweenDates = async (
  data: GetBorrowingBetweenDatesSchema
) => {
  try {
    const { startDate, endDate } = data;

    const borrowings = await GetBorrowingsBetweenDates(startDate, endDate);

    const dataToWrite = borrowings.map((borrowing) => ({
      userName: borrowing.user.name,
      bookTitle: borrowing.book.title,
      dueDate: borrowing.dueDate,
      ISBN: borrowing.book.ISBN,
      userEmail: borrowing.user.email,
      borrowDate: borrowing.borrowed_at,
      bookId: borrowing.bookId,
      status: borrowing.status,
    }));

    const csvData = unparse(dataToWrite);

    return {
      message: "borrowings found",
      code: 200,
      data: csvData,
    };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};
