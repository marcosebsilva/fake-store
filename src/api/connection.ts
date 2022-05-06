import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const URI = `mongodb://${process.env.MONGO_HOST}:27017/${process.env.DATABASE_NAME}`;

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || URI);
    console.log('Mongoose connected!');
  } catch (error) {
    console.log('Mongoose connection failed!')
  }
}