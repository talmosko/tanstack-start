import { queryOptions } from '@tanstack/react-query';
import { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'vinxi';
const prisma = new PrismaClient();

export type User = Prisma.UserGetPayload<{}>;

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
});

export const createUser = async (user: Prisma.UserCreateInput) => {
  try {
    return await prisma.user.create({
      data: user,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Fetcher for all users
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    console.log('Users', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetcher for single user by ID
export const getUserById = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  return user;
};
