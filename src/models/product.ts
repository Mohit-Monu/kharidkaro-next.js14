import mongoose, { InferSchemaType, Schema } from "mongoose";
const ProductsSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: String, required: true },
  mainImage: { type: String, required: true },
  price: { type: Number, required: true },
  oriPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  quantityLeft: { type: Number, required: true },
  image: [{ type: String, required: true }],
  seller_Id: { type: Schema.Types.ObjectId, required: true,ref:"users" },
  rating: {
    total: { type: Number, default: 0 },
    oneStar: { type: Number, default: 0 },
    twoStar: { type: Number, default: 0 },
    threeStar: { type: Number, default: 0 },
    fourStar: { type: Number, default: 0 },
    fiveStar: { type: Number, default: 0 },
  },
  review_id: { type: Schema.Types.ObjectId, ref: "reviews" },
}, { timestamps: true });
export type IProduct = InferSchemaType<typeof ProductsSchema>;
const Products =
  mongoose.models.products||
  mongoose.model<IProduct>("products", ProductsSchema);
export default Products;
