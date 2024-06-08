import mongoose, { InferSchemaType, Schema } from "mongoose";

const orderProductSchema = new Schema({
  user_Id: { type: Schema.Types.ObjectId, required: true,ref:"users" },
  order_Id: { type: Schema.Types.ObjectId, required: true,ref:"orders" },
  Product_Id: { type: Schema.Types.ObjectId, required: true,ref:"products" },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  seller_Id: { type: Schema.Types.ObjectId, required: true,ref:"users" },
  shippingStatus: { type: String, required: true },
  paymentStatus: { type: String, required: true },
}, { timestamps: true });

type IOrderProduct = InferSchemaType<typeof orderProductSchema>;
const OrderProduct =
mongoose.models.orderProducts||
mongoose.model<IOrderProduct>("orderProducts", orderProductSchema);
export default OrderProduct