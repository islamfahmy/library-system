import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type CreateUserInput = Pick<User, "name" | "email" | "passwordHash">;
export const createUser = async (
  user: CreateUserInput
): Promise<User | Error> => {
  return prisma.user.create({
    data: { ...user, deletedAt: null },
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

type UpdateUserInput = Pick<User, "name">;
export const updateUser = async (
  id: number,
  userData: UpdateUserInput
): Promise<User | null> => {
  return prisma.user.update({
    where: { id },
    data: userData,
  });
};

export const deleteUser = async (id: number): Promise<User | null> => {
  return prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};
