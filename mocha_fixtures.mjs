/* eslint-disable */ 

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const memoryServer = await MongoMemoryServer.create();
const URI = memoryServer.getUri();

export async function mochaGlobalSetup() {
  try {
    await mongoose.connect(URI);
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