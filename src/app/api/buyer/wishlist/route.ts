import dbConnect from "@/lib/db";
import WISHLIST from "@/models/wishlist";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user || user.role !== "buyer") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const data = await req.json();
  const product_Id = data.product_Id;
  if (!product_Id) {
    return NextResponse.json({ msg: "product_Id not found" }, { status: 400 });
  }
  try {
    await dbConnect();
    const product = await WISHLIST.findOne({
      user_Id: user.id,
      Product_id: product_Id,
    });
    if (!product) {
      const result = await new WISHLIST({
        user_Id: user.id,
        Product_id: product_Id,
      });
      await result.save();
      return NextResponse.json(
        { msg: "Added to wishlist", result },
        { status: 200 }
      );
    } else {
      await WISHLIST.findOneAndDelete({
        user_Id: user.id,
        Product_id: product_Id,
      });
      return NextResponse.json(
        { msg: "Removed from wishlist" },
        { status: 202 }
      );
    }
  } catch {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user || user.role !== "buyer") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const AllWishlist = req.nextUrl.searchParams.get("AllWishlist");
  await dbConnect();
  try {
  if (AllWishlist) {
    const products=await WISHLIST.find({ user_Id: user.id }).populate("Product_id")
    return NextResponse.json({ products: products }, { status: 200 });
  }
    const products = await WISHLIST.find({ user_Id: user.id });
    return NextResponse.json({ products }, { status: 200 });
  } catch (err){
    console.log(err)
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};
