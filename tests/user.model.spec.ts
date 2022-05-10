import { HydratedDocument } from 'mongoose';
import chaiAsPromised from 'chai-as-promised';
import User from '../src/models/user';
import { expect, use } from 'chai';
import IBaseUser from '../interfaces/BaseUser';

use(chaiAsPromised);


describe("User model", () => {
  after(async () => {
    await User.deleteMany({});
  });
  describe("1.With the proper body props:", () => {
    before(async () => {
      await User.deleteMany({});
    });
    after(async () => {
      await User.deleteMany({});
    });
    const newUser: HydratedDocument<IBaseUser> = new User({
      name: "John Doe",
      password: "@12345678",
      email: "john@gmail.com"
    });
    it("- allows to create the user.", async () => {
      await newUser.save();
      const result = await User.findOne({email: newUser.email});
      expect(result).to.not.be.null;
    });
    it("- stores all the expected properties.", async () => {
      const registeredUser = await User.findOne({email: newUser.email});

      expect(registeredUser).to.have.property('password');
      expect(registeredUser).to.have.property('name');
      expect(registeredUser).to.have.property('email');
      expect(registeredUser).to.have.property('_id');
      expect(registeredUser).to.have.property('coins');
      expect(registeredUser).to.have.property('role');
    });
    it("- stores a hash and not the actual password.", async () => {
      const registeredUser = await User.findOne({email: newUser.email});
      let passwordIsHashed = false;
      
      if (registeredUser){
        passwordIsHashed = (registeredUser.password !== '@12345678')
      }

      expect(passwordIsHashed).to.be.true
    });
    it("- allows to update a user.", async () => {
      newUser.name = "Joazinho"
      await newUser.save();

      const result = await User.findOne({email: newUser.email});
      expect(result).to.have.property('name', 'Joazinho');
    });
    it("- allows to delete a user.", async () => {
      await newUser.remove();

      const result = await User.find({});

      expect(result).to.be.empty;
    });
  });
  describe('2.With malformed or invalid data:', () => {
    before(async () => {
      await User.deleteMany({});
    });
    after(async () => {
      await User.deleteMany({});
    });

    it("- throws error if some field is missing", async () => {
      const userWithoutPassword: HydratedDocument<IBaseUser> = new User({
        name: "John Doe",
        email: "john@gmail.com"
      });

      const userWithoutName: HydratedDocument<IBaseUser> = new User({
        password: "@12345678",
        email: "john@gmail.com"
      });

      const userWithoutEmail: HydratedDocument<IBaseUser> = new User({
        name: "John Doe",
        password: "@12345678"
      });

      await expect(userWithoutPassword.validate()).to.eventually.be.rejected;
      await expect(userWithoutName.validate()).to.eventually.be.rejected;
      await expect(userWithoutEmail.validate()).to.eventually.be.rejected;
    });
    it('- throws error if the password is too short.', async () => {
      const userWithShortPassword: HydratedDocument<IBaseUser> = new User({
        name: "John Doe",
        password: "@1234",
        email: "john@gmail.com"
      });

      await expect(userWithShortPassword.validate()).to.eventually.be.rejected;
    
    });
    it('- throws error if the name is too short.', async () => {
    const userWithShortName: HydratedDocument<IBaseUser> = new User({
        name: "Jho",
        password: "@12345678",
        email: "john@gmail.com"
      });

      await expect(userWithShortName.validate()).to.eventually.be.rejected;
    });
    it('- throws error if the email is malformed.', async () => {
    const userWithBadEmail: HydratedDocument<IBaseUser> = new User({
        name: "Jhon Doe",
        password: "@12345678",
        email: "john.com"
      });

      await expect(userWithBadEmail.validate()).to.eventually.be.rejected;
    });
  });
})
