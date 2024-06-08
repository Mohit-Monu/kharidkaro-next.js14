import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import ORDER from "@/models/orders";
import { IOrderProduct } from "@/interfaces/order";
import PRODUCT from "@/models/product";
interface RequestBody {
  response: {
    error: {
      code: string;
      description: string;
      source: string;
      reason: string;
      metadata: {
        order_id: string;
        payment_id: string;
      };
      step: string;
    };
  };
}
export const POST = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user || user.role !== "buyer") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const body: RequestBody = await req.json();
  const { order_id, payment_id } = body.response.error.metadata;
  try {
    const order = await ORDER.findOneAndUpdate(
      { order_Id: order_id, user_Id: user.id },
      {
        $set: {
          payment_Id: payment_id,
          paymentStatus: "Failed",
        },
      }
    ).populate("orderProduct_Ids");
    if (order && order.orderProduct_Ids) {
      for (const orderProduct of order.orderProduct_Ids) {
        orderProduct.paymentStatus = "Failed";
        await orderProduct.save()
        await PRODUCT.findOneAndUpdate(
          { _id: orderProduct.Product_Id },
          { $inc: { quantityLeft: orderProduct.quantity } }
        );
      }
    }

    return NextResponse.json({ msg: "Payment Success" }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};
