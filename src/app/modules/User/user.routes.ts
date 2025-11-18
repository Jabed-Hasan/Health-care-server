import express, { Request, Response } from 'express';
import { UserController } from './user.controller';
const router = express.Router();

// Define user-related routes here
router.get('/',UserController.CreateAdmin);
router.post('/',UserController.CreateAdmin);
export const UserRouter = router;