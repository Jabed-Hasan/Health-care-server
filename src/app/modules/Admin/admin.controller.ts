
import { Request, Response } from 'express';
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";




const getAllAdminsfromDB =async (req: Request, res: Response) => {

    try{
        
        const filter = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
        const result = await AdminService.getAllAdminsfromDB(filter, options);
        res.status(200).json({
        success: true,
        message: "Admins fetched successfully",
        data: result,
    });
}catch(err: any){
    res.status(500).json({
        success: false,
        message: err?.name || "Failed to fetch admins",
        error: err.message,
    });
}
};
export const AdminController = {
    getAllAdminsfromDB
}