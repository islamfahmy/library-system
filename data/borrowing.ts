import { UserBookBorrowing, PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

type CreateBorrowingInput = Pick<
  UserBookBorrowing,
  "bookId" | "userId" | "borrowed_at" | "status" | "dueDate" | "returnedAt"
>;
export const createBorrowing = async (
  borrowing: CreateBorrowingInput
): Promise<UserBookBorrowing> => {
  return prisma.userBookBorrowing.create({
    data: {
      ...borrowing,
    },
  });
};

export const getLastBorrowingByUserId = async (
  userId: number
): Promise<UserBookBorrowing | null> => {
  return prisma.userBookBorrowing.findFirst({
    where: { userId },
    orderBy: {
      borrowed_at: "desc",
    },
  });
};

export const getLastBorrowingByBookId = async (
  bookId: number
): Promise<UserBookBorrowing | null> => {
  return prisma.userBookBorrowing.findFirst({
    where: { bookId },
    orderBy: {
      borrowed_at: "desc",
    },
  });
};

type UpdateBorrowingInput = { returnedAt: Date; status: Status } & {
  status?: Status;
  dueDate?: Date;
};

export const UpdateBorrowing = async (
  id: number,
  borrowingData: UpdateBorrowingInput
) => {
  await prisma.userBookBorrowing.updateMany({
    where: { id },
    data: borrowingData,
  });
};

export const GetOverDueBooks = async (startDate: Date, endDate?: Date) => {
  return prisma.userBookBorrowing.findMany({
    where: {
      borrowed_at: {
        gte: startDate,
        ...(endDate ? { lte: endDate } : {}),
      },
      dueDate: {
        lt: new Date(),
      },
      status: "BORROWED",
    },
    include: {
      book: true,
      user: true,
    },
  });
};

export const GetBorrowingsBetweenDates = async (
  startDate: Date,
  endDate?: Date
) => {
  return prisma.userBookBorrowing.findMany({
    where: {
      borrowed_at: {
        gte: startDate,
        ...(endDate ? { lte: endDate } : {}),
      },
    },
    include: {
      book: true,
      user: true,
    },
  });
};
