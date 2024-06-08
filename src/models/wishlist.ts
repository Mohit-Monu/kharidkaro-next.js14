import mongoose, { InferSchemaType, Schema } from "mongoose";
const wishListSchema: Schema = new Schema(
  {
    Product_id: { type: Schema.Types.ObjectId, required: true,ref:"products" },
    user_Id: { type: Schema.Types.ObjectId, required: true,ref:"users" },
  },
  { timestamps: true }
);
type IWishlist = InferSchemaType<typeof wishListSchema>;
const Wishlist =
  mongoose.models.wishlists ||
  mongoose.model<IWishlist>("wishlists", wishListSchema);
export default Wishlist;
