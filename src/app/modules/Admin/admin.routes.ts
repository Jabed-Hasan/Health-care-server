import { PrismaClient } from '../../../generated/prisma/client';
import express, { Request, Response } from 'express';
import { AdminController } from './admin.controller';


const router = express.Router();
const prisma = new PrismaClient();

router.get ('/', AdminController.getAllAdminsfromDB);


export const AminRouters = router;