import mongoose, { InferSchemaType, Schema } from "mongoose";

const ReviewSchema: Schema = new Schema({
  product_Id: { type: Schema.Types.ObjectId, required: true,ref:"products" },
  seller_Id: { type: Schema.Types.ObjectId, required: true,ref:"users" },
  reviews: [
    {
      user_Id: { type: Schema.Types.ObjectId, required: true,ref:"users" },
      rating: { type: Number, required: true },
      comment: { type: String },
      reviewerName: { type: String, required: true },
      dateOfReview: { type: Date, required: true, default: Date.now },
    }
  ],
}, { timestamps: true });
type IReview = InferSchemaType<typeof ReviewSchema>;
const Reviews =
  mongoose.models.reviews || mongoose.model<IReview>("reviews", ReviewSchema);
export default Reviews;
