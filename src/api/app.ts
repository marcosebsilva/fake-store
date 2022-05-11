import express, { Express } from "express";
import userController from '../controllers/user.controller';
import errorMiddleware from '../middlewares/error.middleware';
import productRouter from "../routes/product.routes";
import userRouter from "../routes/user.routes";

const app: Express = express();

app.use(express.json());

app.post('/register', userController.register);
app.post('/login', userController.login);

app.use('/user', userRouter)
app.use('/product', productRouter);

app.use(errorMiddleware);

export default app;