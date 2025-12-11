

import { Prisma } from '../../../generated/prisma/client';
import { adminSearchableFields } from './admin.constant';
import { paginationHelper } from '../../../helper/paginationHelper';
import prisma from '../../../shared/prisma';





const getAllAdminsfromDB = async (params: any, options: any) => {
    const {limit, page, sortBy, sortOrder,skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData} = params;
    const andConditions : Prisma.AdminWhereInput[] = [];
    
if(params.searchTerm){
    andConditions.push({
        OR: adminSearchableFields.map((field) => ({
            [field]: {
                contains: params.searchTerm,
                mode: 'insensitive'
            }
        }))
    });
}

if(Object.keys(filterData).length>0){
    andConditions.push({
        AND: Object.keys(filterData).map((key) => ({
            [key]: {
                equals: filterData[key],
            }
        }))
    });
}

const whereCondition: Prisma.AdminWhereInput =  {AND: andConditions} ;
const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
});
return  result;
}



export const AdminService = {
    getAllAdminsfromDB
}