import mongoose, { InferSchemaType, Schema } from "mongoose";
const totalSchema = new Schema({
  originalPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  payingAmount: { type: Number, required: true },
},{
  _id: false
});
const addressSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
  alternatePhone: { type: Number, required: true },
},{
  _id: false
});
const orderSchema: Schema = new Schema(
  {
    user_Id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    orderProduct_Ids: [
      { type: Schema.Types.ObjectId, required: true, ref: "orderProducts" },
    ],
    total: { type: totalSchema, required: true },
    address: { type: addressSchema, required: true },
    paymentStatus: { type: String, required: true },
    shippingStatus: { type: String, required: true },
    payment_Id: { type: String },
    order_Id: { type: String },
  },
  { timestamps: true }
);
type IOrder = InferSchemaType<typeof orderSchema>;
const Order =
  mongoose.models.orders || mongoose.model<IOrder>("orders", orderSchema);
export default Order;
