import app from './app';
import userController from '../controllers/userController';
import errorMiddleware from '../middlewares/errorMiddleware';
import connect from './connection';

const PORT = 3000;

app.listen(PORT, () => console.log(`Started at port ${ PORT }`));


connect();
app.post('/register', userController.register);
app.post('/login', userController.login);

app.use(errorMiddleware);