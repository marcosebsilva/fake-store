import express, { Express } from "express";
import userController from '../controllers/user.controller';
import errorMiddleware from '../middlewares/error.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const app: Express = express();

app.use(express.json());
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/user', authMiddleware, userController.find);
app.put('/user', authMiddleware, userController.updateCoinAmount);

app.use(errorMiddleware);

export default app;