import { Admin, Prisma, UserStatus } from '../../../generated/prisma/client';
import { adminSearchableFields } from './admin.constant';
import { paginationHelper } from '../../../helper/paginationHelper';
import prisma from '../../../shared/prisma';
import { IAdminFilterRequest } from './admin.interface';
import { IPaginationOptions } from '../../interfaces/pagination';





const getAllAdminsfromDB = async (params: IAdminFilterRequest, options: IPaginationOptions)=> {
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
                equals: (filterData as any)[key],
            }
        }))
    });

}
 
andConditions.push({ isDeleted: false });

const whereCondition: Prisma.AdminWhereInput =  {AND: andConditions} ;
const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },

   

});

const total = await prisma.admin.count({
    where: whereCondition,
    });

return {
    meta:{
         page,
         limit,
         total,
    },
    data: result
};
}


const getByIdFromDB = async(id: string) :Promise<Admin | null>  => {
   const result = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false,
    },
    
   });
    return result!;
}


const updateIntoDB = async(id: string, data: Partial<Admin>):Promise<Admin | null> => {
   
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
    },
   })


    const result = await prisma.admin.update({
        where: {
            id,
},
        data,
    });
    return result;
}


const DeleteFromDB = async(id: string):Promise<Admin | null>   => {

  await prisma.admin.findUniqueOrThrow({
    where: {
        id,
    },
 });

   const result = await prisma.$transaction(async(transactionClient)=>{
      const admindeletedData = await transactionClient.admin.delete({
        where: {
            id,
        },
      });

      await transactionClient.user.delete({
        where: {
            email:admindeletedData.email,
        },
      });
        return admindeletedData;
   })
   return result;
}


const SoftDeleteFromDB = async(id: string):Promise<Admin | null> => {

  await prisma.admin.findUniqueOrThrow({
    where: {
        id,
        isDeleted: false,
    },
 });

   const result = await prisma.$transaction(async(transactionClient)=>{
      const admindeletedData = await transactionClient.admin.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
      });

       await transactionClient.user.update({
        where: {
            email:admindeletedData.email,
        },
        data: {
            status: UserStatus.DELETED,
        },
      });
        return admindeletedData;
   })
   return result;
}

export const AdminService = {
    getAllAdminsfromDB,
    getByIdFromDB,
    updateIntoDB,
    DeleteFromDB,
    SoftDeleteFromDB,
}