import dbConnect from "@/lib/db";
import Cart from "@/models/cart";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getToken({ req });
  if (!user || user.role !== "buyer") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const data = await req.json();
  const { product_Id } = data;

  try {
    await dbConnect();
    const product = await Cart.findOne({
      user_Id: user.id,
      Product_id: product_Id,
    });
    if (product) {
      const filter = { user_Id: user.id, Product_id: product_Id };
      const update = { $inc: { quantity: 1 } };
      const options = { new: true, upsert: true };
      const result = await Cart.findOneAndUpdate(filter, update, options);
      return NextResponse.json(
        { msg: "Added to cart", result },
        { status: 200 }
      );
    }
    const result = await new Cart({
      user_Id: user.id,
      Product_id: product_Id,
      quantity: 1,
    });
    await result.save();
    return NextResponse.json({ msg: "Added to cart", result }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const user = await getToken({ req });
  if (!user || user.role !== "buyer") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  await dbConnect();
  try {
    const products = await Cart.find({ user_Id: user.id }).populate(
      "Product_id"
    );
    return NextResponse.json({ products: products }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
export async function PATCH(req: NextRequest) {
  const user = await getToken({ req });
  if (!user || user.role !== "buyer") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const data = await req.json();
  const { inc, dec, cart_id } = data;
  try {
    await dbConnect();
    if (inc) {
      const result = await Cart.findOneAndUpdate(
        { _id: cart_id },
        { $inc: { quantity: 1 } },
        { new: true }
      );
      return NextResponse.json(
        { msg: "Added to cart", result },
        { status: 200 }
      );
    }
    if (dec) {
      const result = await Cart.findOneAndUpdate(
        { _id: cart_id },
        { $inc: { quantity: -1 } },
        { new: true }
      );
      if (result.quantity === 0) {
        await Cart.findByIdAndDelete(cart_id);
        return NextResponse.json(
          { msg: "Cart deleted", result },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { msg: "removed to cart", result },
        { status: 200 }
      );
    }
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  } catch {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
