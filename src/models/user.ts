import mongoose, { InferSchemaType, Schema } from "mongoose";
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: Number, default: null },
    address: { type: String, default: null },
    image: { type: String, default: null },
  },
  { timestamps: true }
);
type IUser = InferSchemaType<typeof UserSchema>;

const User =
  mongoose.models.users || mongoose.model<IUser>("users", UserSchema);
export default User;
