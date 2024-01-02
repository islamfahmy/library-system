import { AddBookSchema, DeleteBookSchema } from "../controller/book/schema";
import { addBook, deleteBook, getBookById } from "../data/book";

export const HandleAddBook = async (
  data: AddBookSchema
): Promise<{ message: string; code: number }> => {
  try {
    const { title, ISBN, author, location } = data;

    const book = await addBook({ title, ISBN, author, Location: location });

    return { message: "book created", code: 200 };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};

export const HandleDeleteBook = async (data: DeleteBookSchema) => {
  try {
    const { id } = data;

    const book = await getBookById(id);

    if (!book) {
      return { message: "book not found", code: 404 };
    }

    await deleteBook(book.id);

    return { message: "book deleted", code: 200 };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};

export const HandleGetBook = async (data: DeleteBookSchema) => {
  try {
    const { id } = data;

    const book = await getBookById(id);

    if (!book) {
      return { message: "book not found", code: 404 };
    }

    return { message: "book found", code: 200, data: book };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};
