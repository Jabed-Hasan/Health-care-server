
import { UserRole } from "../../../generated/prisma/enums";
import bcrypt from 'bcrypt';    
import prisma from "../../../shared/prisma";



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


const getUserfromDB = async() => {
    const result = await prisma.user.findMany();
    return result;
}

export const userService = {
  CreateAdmin,
  getUserfromDB,
  
};
