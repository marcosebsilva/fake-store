import userService from '../src/services/user';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import CustomError from '../src/utils/modules/CustomError';
import User from '../src/models/user';
import sinon, { SinonSandbox } from 'sinon';
import helpers from '../src/services/user/helpers';

describe("When passing malformed data to the register in userService", () => {
  // this only checks if the service layers throws the spected error object
  // major validations are done in the models, as the project uses mongoose
  it('Throws CustomError if a field is missing or malformed', async () => {
    const bodyWithoutEmail = {
      "email": "",
      "name": "Jhon Doe",
      "password": "jhonsecret"
    }
    const bodyWithMalformedEmail = {
      "email": "jotajota",
      "name": "Jhon Doe",
      "password": "jhonsecret"
    }

    await expect(userService.register(bodyWithoutEmail)).to.eventually.rejected
      .and.be.an.instanceOf(CustomError);

    await expect(userService.register(bodyWithMalformedEmail)).to.eventually.rejected
      .and.be.an.instanceOf(CustomError);
  });
});

describe("When passing the correct data to the register in userService", () => {
  it("Returns a jwt access token", async () => {
    const body = {
      "email": "john@gmail.com",
      "name": "Jhon Doe",
      "password": "jhonsecret"
    }

    const { token } = await userService.register(body);
    const decoded = jwt.decode(token);
    expect(decoded).to.not.be.null
  });
});

describe("When passing wrong data to the login in userService", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("Throws a CustomError if the user does not exists.", async () => {
    sinon.stub(User, 'findOne').resolves(null);

    const userThatIsNotRegistered = {
      "email": "john@gmail.com",
      "name": "Jhon Doe",
      "password": "jhonsecret"
    }
    
    await expect(userService.login(userThatIsNotRegistered)).eventually.be.rejected
      .and.be.an.instanceOf(CustomError);
  });
  it("Throws a CustomError if password is wrong.", async () => {
    const registeredUser = {
      email: "john@gmail.com",
      name: "Jhon Doe",
      password: "secret-hash",
      role: "admin"
    }

    sinon.stub(User, 'findOne').resolves(registeredUser);
    sinon.stub(helpers, 'verifyPassword').returns(false);
    
    await expect(userService.login(registeredUser)).eventually.be.rejected
      .and.be.an.instanceOf(CustomError);
  
  })
});

describe("When passing the correct data to the login in userService", () => {
  it("Returns a jwt access token", async () => { 
    const registeredUser = {
      email: "john@gmail.com",
      name: "Jhon Doe",
      password: "secret-hash",
      role: "admin"
    }

    sinon.stub(User, 'findOne').resolves(registeredUser);
    sinon.stub(helpers, 'verifyPassword').returns(true);

    const { token } = await userService.login(registeredUser);
    const decoded = jwt.decode(token);

    expect(decoded).to.not.be.null
  });
});
