import mongoose, { Schema } from 'mongoose';
import User from '../../src/models/user';
import { expect } from 'chai';

const TEST_ENVIRONMENT = `mongodb://${process.env.MONGO_HOST}:27017/${process.env.TEST_ENVIRONMENT}`;
mongoose.connect(TEST_ENVIRONMENT);

describe('User model', () => {
  before(async () => {
    await User.deleteMany({});
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterEach(async ()=> {
    await User.deleteMany({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it('Has a model', () => {
    expect(User).to.exist
  });
});