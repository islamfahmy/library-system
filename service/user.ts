import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  UpdateUserSchema,
} from "../controller/user/schema";
import bcrypt from "bcryptjs";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  updateUser,
} from "../data/user";

export const HandleCreateUser = async (
  data: CreateUserSchema
): Promise<{ message: string; code: number }> => {
  try {
    const { name, email, password } = data;
    const passwordHash = bcrypt.hashSync(password, 10);

    const emailExists = await getUserByEmail(email);

    if (emailExists) {
      return { message: "email already exists", code: 400 };
    }

    const user = await createUser({ name, email, passwordHash });

    if (user instanceof Error) {
      console.error(user);
      return { message: "internal server error", code: 500 };
    }

    return { message: "user created", code: 201 };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};

export const handleDeleteUser = async (
  data: DeleteUserSchema
): Promise<{ message: string; code: number }> => {
  try {
    const { email } = data;

    const user = await getUserByEmail(email);

    if (!user) {
      return { message: "user not found", code: 404 };
    }

    await deleteUser(user.id);

    return { message: "user deleted", code: 200 };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};

export const handleUpdateUser = async (
  data: UpdateUserSchema
): Promise<{ message: string; code: number }> => {
  try {
    const { email, name } = data;

    const user = await getUserByEmail(email);

    if (!user) {
      return { message: "user not found", code: 404 };
    }

    await updateUser(user.id, { name });

    return { message: "user updated", code: 200 };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500 };
  }
};

export const handleGetUser = async (
  data: GetUserSchema
): Promise<{ message: string; code: number; data: any }> => {
  try {
    const { email } = data;

    const user = await getUserByEmail(email);

    if (!user) {
      return { message: "user not found", code: 404, data: null };
    }

    return { message: "user found", code: 200, data: user };
  } catch (error) {
    console.error(error);
    return { message: "internal server error", code: 500, data: null };
  }
};
