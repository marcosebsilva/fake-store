import { model, Schema } from "mongoose";
import IProductInDb from "../../interfaces/ProductInDb";

const productSchema = new Schema<IProductInDb>({
  _id: {
    type: Schema.Types.ObjectId,
    select: false,
    auto: true,
  },
  name: {
    type: String,
    required: [true, 'Your product must have a name.'],
    minlength: [4, 'Product name is too short.'],
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Your product must have a price.'],
    trim: true,
  },
}, { versionKey: false });

const Product = model<IProductInDb>('Product', productSchema);

export default Product;