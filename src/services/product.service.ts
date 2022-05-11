import  { Error, Types } from "mongoose";
import ICustomRequest from "../../interfaces/CustomRequest";
import Product from "../models/product.model";
import exceptions from "../utils/dict/exceptions";
import getValidationMessages from "../utils/functions/getValidationMessages";
const ADMIN_ROLE = 'admin';

const getOne = async (id: string) => {
  const idStringConvertedToId = new Types.ObjectId(id)
  const product = await Product.findById(idStringConvertedToId);

  if (!product) throw exceptions.PRODUCT_NOT_FOUND;

  return product;
};

const getAll = async () => {
  const product = await Product.find({});
  return product;
};

const addOne = async (request: ICustomRequest) => {
  if (request.role !== ADMIN_ROLE) throw exceptions.UNAUTHORIZED_USER;

  const { body: product } = request;

  try {
    const newProduct = new Product(product);
    await newProduct.save();
  } catch (error: any) {
    const DUPLICATE_KEY_ERROR_CODE = 11000;
    if (error instanceof Error.ValidationError) {
      const messages = getValidationMessages(error);
      throw exceptions.VALIDATION_ERROR(messages);
    }

        
    if (error.code === DUPLICATE_KEY_ERROR_CODE) {
      throw exceptions.PRODUCT_ALREADY_REGISTERED
    }

    throw exceptions.INTERNAL_ERROR;
  }
};

export default {
  getOne,
  getAll,
  addOne
}