import mongoose, { InferSchemaType, Schema } from "mongoose";
const cartSchema: Schema = new Schema({
  Product_id: { type: Schema.Types.ObjectId, required: true,ref:"products" },
  user_Id: { type: Schema.Types.ObjectId, required: true,ref:"users" },
  quantity: { type: Number, required: true },
}, { timestamps: true });
type ICart = InferSchemaType<typeof cartSchema>;
const Cart =
  mongoose.models.carts||
  mongoose.model<ICart>("carts", cartSchema);
export default Cart;
