
import { NextFunction, Request, Response } from 'express';
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from '../../../shared/sendResponse';
import { STATUS_CODES } from 'http';
import { StatusCodes } from 'http-status-codes';


const getAllAdminsfromDB =async (req: Request, res: Response, next:NextFunction) => {

    try{
        
        const filter = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
        const result = await AdminService.getAllAdminsfromDB(filter, options);
        sendResponse(res,{
            statusCode: 200,
            success: true,  
            message: "Admins fetched successfully",
            meta: result.meta,
            data: result.data,
        });


    }catch(err){
        next(err)
           
    };


}

        
    const getByIdFromDB = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const {id} = req.params;
            const result = await AdminService.getByIdFromDB(id);
            sendResponse(res,{
                statusCode: StatusCodes.OK,
                success: true,
                message: "Admin fetched successfully",
                data: result,
            });
           
        }catch(err: any){
            next(err);
        }
    }


    const updateIntoDB = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const {id} = req.params;
            const result = await AdminService.updateIntoDB(id ,req.body);
            sendResponse(res,{
                statusCode: StatusCodes.OK,
                success: true,
                message: "Admin updated successfully",
                data: result,
            });

        }catch(err: any){
            next(err);
        }
    }

     const DeleteFromDB = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const {id} = req.params;
            const result = await AdminService.DeleteFromDB(id);
           sendResponse(res,{
                statusCode: StatusCodes.OK,
                success: true,
                message: "Admin Deleted successfully",
                data: result,
            });

        }catch(err: any){
            next(err);
        }
    }

const SoftDeleteFromDB = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const {id} = req.params;
            const result = await AdminService.SoftDeleteFromDB(id);
            sendResponse(res,{
                statusCode: StatusCodes.OK,
                success: true,
                message: "Admin Deleted successfully",
                data: result,
            });

        }catch(err: any){
            next(err);
        }
    }
    


export const AdminController = {
    getAllAdminsfromDB,
    getByIdFromDB,
    updateIntoDB,
    DeleteFromDB,  
    SoftDeleteFromDB,
}