import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const URI = `mongodb://localhost:27017/voll-store`;

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || URI);
    console.log('Mongoose connected!');
  } catch (error) {
    console.log('Mongoose connection failed!')
  }
}