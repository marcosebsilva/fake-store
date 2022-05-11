import chai, { expect, use } from 'chai';
import User from '../../src/models/user.model';
import chaiHttp from 'chai-http';
import app from '../../src/api/app';
import statusCodes from '../../src/utils/dict/statusCodes.json';
import IBaseUser from '../../interfaces/BaseUser';

use(chaiHttp);

describe("User services", () => {
  before(async () => {
    // clears test db
    await User.deleteMany({});
  });

  afterEach(async () => {
    // clears test db
    await User.deleteMany({});
  });

  describe("1.When registering user with proper data:", () => {
    it("- returns a jwt access token.", async () => {
      const response = await chai.request(app)
        .post('/register')
        .send({
          email: "test@email.com",
          password: "@12345678",
          name: "John Doe"
        });
      

      expect(response).to.have.status(statusCodes.CREATED);
      expect(response.body).to.have.key('token');
    });
    it("- returns conflict status if user is already registered.", async () => {
      const data: IBaseUser = {
        email: "email@email.com",
        password: "@12345678",
        name: "john.doe@gmail.com"
      }

      const newUser = new User(data);

      await newUser.save();

      const response = await chai.request(app)
        .post('/register')
        .send(data);

      expect(response).to.have.status(statusCodes.CONFLICT);
    });
  });

  describe("2.When loggin with malformed/invalid data:", () => {
    it("- return not found status if user does not exists.", async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: "joaodasneves@gmail.com",
          password: "dontknownothing",
        })

      expect(response).to.have.status(statusCodes.NOT_FOUND);
    });
    it("- return unauthorized status if password is wrong.", async () => {
      const data: IBaseUser = {
        name: "John Doe",
        password: "dontknownothing",
        email:"johndoe@gmail.com"
      }

      const newUser = new User(data);

      await newUser.save();

      const response = await chai.request(app)
        .post('/login')
        .send({
          email: data.email,
          password: "awholedifferentpassword",
        });

      expect(response).to.have.status(statusCodes.UNAUTHORIZED);
    })
  });

  describe("3.When loggin with proper data:", () => {
    it("- returns a access token", async () => { 
       const data: IBaseUser = {
        email: "email@email.com",
        password: "@12345678",
        name: "john.doe@gmail.com"
      }
      const newUser = new User(data);

      await newUser.save();

      const response = await chai.request(app)
        .post('/login')
        .send({
          email: data.email,
          password: data.password,
      });

      expect(response).to.have.status(statusCodes.OK);
      expect(response.body).to.have.key('token');
    });
  });

  describe("4.When trying to retrieve info about users", () => {
    it("- you can retrieve all as admin", async () => {
      const data: IBaseUser = {
        email: "admin@email.com",
        name: "Jonathan Doe",
        password: "@adminsecret",
        role: "admin"
      }

      const newAdmin = new User(data);

      await newAdmin.save();
      const { body: { token: adminToken } } = await chai.request(app)
        .post('/login')
        .send({
          email: data.email,
          password: data.password
        });

      const response = await chai.request(app)
        .get('/users')
        .auth(adminToken, {type: 'bearer'});

      expect(response).to.have.status(statusCodes.OK);
      expect(response.body).to.not.be.empty;
    });
    it("- you cant retrieve all users as a normal user", async () => {
      const data: IBaseUser = {
        email: "user@email.com",
        name: "Dave Doe",
        password: "@usersecret",
      }

      const newUser = new User(data);

      await newUser.save();
      const { body: { token: userToken } } = await chai.request(app)
        .post('/login')
        .send({
          email: data.email,
          password: data.password
        });

      const response = await chai.request(app)
        .get('/users')
        .auth(userToken, {type: 'bearer'});

      expect(response).to.have.status(statusCodes.UNAUTHORIZED);
    });
    it("- can retrieve user with proper token", async () => {
      const data: IBaseUser = {
        email: "user@email.com",
        name: "Dave Doe",
        password: "@usersecret",
      }

      const newUser = new User(data);

      await newUser.save();

      const { body: { token: userToken } } = await chai.request(app)
        .post('/login')
        .send({
          email: data.email,
          password: data.password
        });


      const response = await chai.request(app)
        .get('/user')
        .auth(userToken, {type: 'bearer'});

      expect(response).to.have.status(statusCodes.OK);
    });
    it("- it can't retrieve user with wrong token", async () => {
      const response = await chai.request(app)
        .get('/user')
        .auth("very_cool_token", {type: 'bearer'});

      expect(response).to.have.status(statusCodes.BAD_REQUEST);
    });
  });

  describe("5.When trying to update a user", () => {
    it("- is possible to edit as a admin", async () => {
      const data: IBaseUser = {
        email: "admin@email.com",
        name: "Jonathan Doe",
        password: "@adminsecret",
        role: "admin"
      }

      const newAdmin = new User(data);

      await newAdmin.save();

      const { body: { token: adminToken } } = await chai.request(app)
        .post('/login')
        .send({
          email: data.email,
          password: data.password
        });
  
      const response = await chai.request(app)
        .put('/user')
        .auth(adminToken, {type: 'bearer'})
        .send({
          amount: 2250
        });

      expect(response).to.have.status(statusCodes.OK)
    });
    it("- is not possible to update as a normal user", async () => {
     const data: IBaseUser = {
        email: "user@email.com",
        name: "Dave Doe",
        password: "@usersecret",
      }

      const newUser = new User(data);

      await newUser.save();
      const { body: { token: userToken } } = await chai.request(app)
        .post('/login')
        .send({
          email: data.email,
          password: data.password
        });

      const response = await chai.request(app)
        .put('/user')
        .auth(userToken, {type: 'bearer'})
        .send({
          amount: 2250,
        })

      expect(response).to.have.status(statusCodes.UNAUTHORIZED);
    });
  });
});
