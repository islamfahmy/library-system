import { z } from "zod";

export const createUserSchemaValidator = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateUserSchemaValidator = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export const getUserSchemaValidator = z.object({
  email: z.string().email(),
});

export const deleteUserSchemaValidator = getUserSchemaValidator;

export type GetUserSchema = z.infer<typeof getUserSchemaValidator>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchemaValidator>;
export type UpdateUserSchema = z.infer<typeof updateUserSchemaValidator>;
export type CreateUserSchema = z.infer<typeof createUserSchemaValidator>;
