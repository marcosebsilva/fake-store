import auth from '../src/services/auth_service';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);


describe("Auth service", () => {
  describe("1.Hash and decode password.",() => {
    let hashed: string;
    const inputPassword = "secret";

    before( async () => {
      hashed = await auth.hashPassword(inputPassword);
    });

    it("- does not return the same input.", async () => {
      expect(hashed).to.not.be.equal(inputPassword);
    });


    it("- returns nothing if verification suceeds.", async () => {
      const actual = await auth.verifyPassword(hashed, inputPassword);
      expect(actual).to.be.equal(undefined);
    });


    it("- throws if verification fails.", async () => {
      await expect(auth.verifyPassword(hashed, "foo")).to.eventually.be.rejected;
    });
  });

  describe("2.Token generation and verification.", () => {
    let token: string;

    const data = {
      email: "test@email.com",
      role: "123456"
    };

    it("- it is possible to generate a token.", () => {
      token = auth.generateToken(data);
      expect(token).to.not.be.null;
    });
    it("- verification returns the data if token is valid.", () => {
      const actual = auth.verifyToken(token);
      expect(actual.data).to.be.eql(data);
    });
    it("- verification throws error in token is invalid.", async () => {
      const RANDOM_STRING = "@jjj";
      const badFn = () => auth.verifyToken(RANDOM_STRING);

      expect(badFn).to.throw();
    });
  });
});