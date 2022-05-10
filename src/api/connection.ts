import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async (URI: string) => {
  try {
    await mongoose.connect(URI);
    console.log('Mongoose connected!');
  } catch (error) {
    console.log('Mongoose connection failed!')
  }
}