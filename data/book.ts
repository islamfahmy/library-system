import { Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CreateBookInput = Pick<Book, "ISBN" | "Location" | "author" | "title">;
export const addBook = (book: CreateBookInput): Promise<Book> => {
  return prisma.book.create({
    data: {
      ...book,
      deletedAt: null,
    },
  });
};

export const getBookById = (id: number): Promise<Book | null> => {
  return prisma.book.findUnique({
    where: { id, deletedAt: null },
  });
};

export const getBookByTitle = (title: string): Promise<Book | null> => {
  return prisma.book.findFirst({
    where: { title, deletedAt: null },
  });
};

export const deleteBook = (id: number): Promise<Book | null> => {
  return prisma.book.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};

export default {
  createBook: addBook,
  getBookById,
  getBookByTitle,
};
