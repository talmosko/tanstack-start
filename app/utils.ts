import { queryOptions } from "@tanstack/react-query";
import { z } from "vinxi";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma client
const prisma = new PrismaClient();

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  username: z.string(),
});

export const inputUserSchema = userSchema.omit({ id: true });

export type User = z.infer<typeof userSchema>;
export type InputUser = z.infer<typeof inputUserSchema>;

export const createUser = async (user: InputUser) => {
  try {
    return await prisma.user.create({
      data: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Fetcher for all users
export const fetchUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    console.log("Users", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetcher for single user by ID
export const fetchUser = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  return user;
};

export const fetchUserDeferred = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return fetchUser(id);
};

// Query options for fetching a single user
export const getUserQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["user", id] as const,
    queryFn: () => fetchUser(id),
  });

export const getUserDeferredQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["user-deferred", id] as const,
    queryFn: () => fetchUserDeferred(id),
  });
