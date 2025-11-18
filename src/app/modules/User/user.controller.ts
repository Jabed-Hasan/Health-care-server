import { request, Request, Response } from "express";
import { userService } from "./user.service";

const CreateAdmin =async (req:Request,res: Response) => {
  //console.log(req.body);
  const result = await userService.CreateAdmin(req.body);
  res.send(result);
}

export const UserController = {
    CreateAdmin
}