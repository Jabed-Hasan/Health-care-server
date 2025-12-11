import express, { Application, Request, Response, } from 'express';
import cors from "cors";
import { UserRouter } from './app/modules/User/user.routes';
import { AminRouters } from './app/modules/Admin/admin.routes';


export const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req:Request, res:Response) => {
  res.send({
    message: 'Server is running successfully',
  });
});

app.use('/api/v1/user',UserRouter);
app.use('/api/v1/admin',AminRouters);
export default app;