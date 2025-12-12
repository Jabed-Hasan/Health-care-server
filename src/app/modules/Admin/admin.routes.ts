import { PrismaClient } from '../../../generated/prisma/client';
import express, { Request, Response } from 'express';
import { AdminController } from './admin.controller';


const router = express.Router();
const prisma = new PrismaClient();

router.get ('/', AdminController.getAllAdminsfromDB);
router.get('/:id',AdminController.getByIdFromDB);
router.patch('/:id',AdminController.updateIntoDB);
router.delete('/:id',AdminController.DeleteFromDB);
router.delete('/soft/:id',AdminController.SoftDeleteFromDB);

export const AdminRouters = router;