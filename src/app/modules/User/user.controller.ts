import { Request, Response } from "express";
import { userService } from "./user.service";

const CreateAdmin =async (req:Request,res: Response) => {

  try{
    const result = await userService.CreateAdmin(req.body);
    res.status(201).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
  }catch(err){
    res.status(500).json({
      success: false,
      message: err?.name || "Failed to create admin",
      error: err,
    });
  }
};

export const UserController = {
    CreateAdmin
}