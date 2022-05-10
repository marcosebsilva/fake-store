import express, { Express } from "express";
import userController from '../controllers/user_controller';
import errorMiddleware from '../middlewares/error_middleware';
import authMiddleware from "../middlewares/auth_middleware";

const app: Express = express();

app.use(express.json());
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/users', authMiddleware, userController.getAll)
app.get('/user', authMiddleware, userController.getOne)

app.use(errorMiddleware);

export default app;