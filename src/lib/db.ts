import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URL as string);
  connection.isConnected = db.connections[0].readyState;
  require("../models/user");
  require("../models/product");
  require("../models/review");
  require("../models/cart");
  require("../models/wishlist");
  require("../models/orders");
  require("../models/orderProducts");
}
export default dbConnect;
