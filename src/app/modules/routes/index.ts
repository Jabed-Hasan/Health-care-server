import express from "express";
import { UserRouter } from "../User/user.routes";
import { AdminRouters } from "../Admin/admin.routes";
const router = express.Router();

const moduleRoutes = [
    {  
        path: '/users',
        route: UserRouter,
    },
    {
        path: '/admin',
        route: AdminRouters
        
    }
];


moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;