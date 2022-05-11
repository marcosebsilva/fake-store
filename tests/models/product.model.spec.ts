import chaiAsPromised from 'chai-as-promised';
import Product from '../../src/models/product.model';
import { expect, use } from 'chai';

use(chaiAsPromised);


describe("Product Model", () => {
  after(async () => {
    await Product.deleteMany({});
  });

  describe("1. When registering a product with the proper data:", () => {
    after(async () => {
      await Product.deleteMany({});
    });
    const newProduct = new Product({
      name: "Cerveja em lata",
      price: 225
    });
    it("- is possible to create a produtct", async () => {
      await newProduct.save();
      const result = Product.findOne({name: newProduct.name});

      expect(result).to.not.be.null;
    });
    it("- is possible to update the product", async () => {
      newProduct.price = 500;
      await newProduct.save();

      const updatedProduct = await Product.findOne({name: newProduct.name});
      expect(updatedProduct).to.have.property('price', 500);
    });
    it("- is possible to delete the product", async () => {
      await newProduct.remove();
      const result = await Product.find({});

      expect(result).to.be.empty;
    });
  });

  describe("2. When registering a product with wrong data", () => {
    it("- throws if the name is missing", async () => {
      const productWithoutName = new Product({
        price: 555
      });

      await expect(productWithoutName.validate()).to.eventually.be.rejected;
    });
    it("- throws if the price is missing", async () => {
      const productWithoutPrice = new Product({
        name: "Carro usado"
      });

      await expect(productWithoutPrice.validate()).to.eventually.be.rejected;
    });
  });
});