import dbConnect from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import ORDERPRODUCT from "@/models/orderProducts";

export const GET = async (req: NextRequest) => {
  try {
    const user = await getToken({ req });
    if (!user || user.role !== "seller") {
      return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
    }
    await dbConnect();
    const orderProductDb = await ORDERPRODUCT.find({ seller_Id: user.id }).populate("order_Id").populate("Product_Id");
    return NextResponse.json({ orders: orderProductDb }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};
export const PUT = async (req: NextRequest) => {
  try {
    const user = await getToken({ req });
    if (!user || user.role !== "seller") {
      return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
    }
    const { id, status } = await req.json();
    await dbConnect();
    const orderProductDb = await ORDERPRODUCT.findByIdAndUpdate(
      id,
      { shippingStatus: status },
      { new: true }
    );
    return NextResponse.json({ order: orderProductDb }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}