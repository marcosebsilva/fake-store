import app from './app';
import connect from './connection';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Started at port ${ PORT }`));

const URI = `mongodb://${process.env.MONGO_HOST}:27017/${process.env.DATABASE_NAME}`;

connect(URI);