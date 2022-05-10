import express, { Express } from "express";
import userController from '../controllers/user_controller';
import errorMiddleware from '../middlewares/errorMiddleware';

const app: Express = express();

app.use(express.json());
app.post('/register', userController.register);
app.post('/login', userController.login);

app.use(errorMiddleware);

export default app;