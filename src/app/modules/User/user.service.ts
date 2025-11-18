import { Request, Response } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import { PrismaClient } from "../../../generated/prisma/client";
import bcrypt from 'bcrypt';    

const prisma = new PrismaClient();



const CreateAdmin = async (data: any) => {
     const hashedpassword: string = await bcrypt.hash(data.password, 10);
    const userData = {
    email: data.admin.email,
    password: hashedpassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // 1️⃣ Create user first
    const createdUser = await transactionClient.user.create({
      data: userData,
    });

    // 2️⃣ Create admin linked to the user (linked by email)
    const createdAdmin = await transactionClient.admin.create({
      data: data.admin
    });

    return createdAdmin;
  });

  return result;
};

export const userService = {
  CreateAdmin,
};
