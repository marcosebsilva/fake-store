import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_TEST_ENVIRONMENT, MONGO_HOST } = process.env;
const TEST_URI = `mongodb://${MONGO_HOST}:27017/${MONGO_TEST_ENVIRONMENT}`;

export async function mochaGlobalSetup() {
  try {
    await mongoose.connect(TEST_URI);
    console.log('Mongoose test environment connected!');
  } catch (error) {
    console.log('Mongoose test environtment connection failed!');
  }
};

export async function mochaGlobalTeardown() {
  try {
    await mongoose.disconnect();
    console.log("Mongoose test environment connection finished!");
  } catch (error) {
    console.log("Mocha teardown failed.")
  }
}