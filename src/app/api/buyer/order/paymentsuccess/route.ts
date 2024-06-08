import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import ORDER from "@/models/orders";
import PRODUCT from "@/models/product";
export const POST = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user || user.role !== "buyer") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const body = await req.json();
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    body.result;

  try {
    const order = await ORDER.findOneAndUpdate(
      { order_Id: razorpay_order_id, user_Id: user.id },
      {
        $set: {
          payment_Id: razorpay_payment_id,
          paymentStatus: "PREPAID",
        },
      }
    ).populate("orderProduct_Ids");
    if (order && order.orderProduct_Ids) {
      for (const orderProduct of order.orderProduct_Ids) {
        orderProduct.paymentStatus = "PREPAID";
        await orderProduct.save()
      }
    }
    return NextResponse.json({ msg: "Payment Success" }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};
