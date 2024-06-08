import dbConnect from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import ORDER from "@/models/orders";
import PRODUCTS from "@/models/product";
import ORDERPRODUCT from "@/models/orderProducts";
import CART from "@/models/cart";
import Razorpay from "razorpay";
export const POST = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user || user.role !== "buyer") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const body: {
    products: { id: string; quantity: number }[];
    shippingOrderAddress: {
      phone: number;
      alternateNo: number;
      pincode: number;
      name: string;
      address: string;
      state: string;
      city: string;
    };
  } = await req.json();
  const method = req.nextUrl.searchParams.get("method");
  let paymentStatus;
  if (method === "COD") {
    paymentStatus = "Pay on delivery";
  } else if (method === "PREPAID") {
    paymentStatus = "pending";
  } else {
    return NextResponse.json(
      { msg: "Invalid payment method" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const dbProducts = [];
    for (const product of body.products) {
      const dbProduct = await PRODUCTS.findById(product.id);
      if (!dbProduct || dbProduct.quantityLeft < product.quantity) {
        return NextResponse.json(
          { msg: "Product not available in sufficient quantity" },
          { status: 400 }
        );
      }
      dbProduct.quantityLeft -= product.quantity;
      await dbProduct.save();
      dbProducts.push({
        ...dbProduct.toObject(),
        quantityOrder: product.quantity,
      });
    }

    let totalPrice = 0;
    let originalPrice = 0;
    dbProducts.forEach((product) => {
      totalPrice += product.price * product.quantityOrder;
      originalPrice += product.oriPrice * product.quantityOrder;
    });
    const newOrder = await new ORDER({
      user_Id: user.id,
      total: {
        originalPrice,
        price: totalPrice,
        shippingCost: totalPrice >= 500 ? 0 : 100,
        payingAmount: totalPrice + (totalPrice >= 500 ? 0 : 100),
      },
      address: {
        ...body.shippingOrderAddress,
        name: user.name,
        alternatePhone: body.shippingOrderAddress.alternateNo
          ? body.shippingOrderAddress.alternateNo
          : 0,
      },
      paymentStatus,
      shippingStatus: "pending",
    });

    const orderIDS = [];
    for (const product of dbProducts) {
      const newOrderProduct = await new ORDERPRODUCT({
        user_Id: user.id,
        order_Id: newOrder._id,
        Product_Id: product._id,
        quantity: product.quantityOrder,
        price: product.price,
        seller_Id: product.seller_Id,
        shippingStatus: "pending",
        paymentStatus,
      });
      orderIDS.push(newOrderProduct._id);
      await newOrderProduct.save();
      const cart = await CART.findOne({
        user_Id: user.id,
        Product_id: product._id,
      });
      if (cart) {
        await CART.findByIdAndDelete(cart._id);
      }
    }
    newOrder.orderProduct_Ids = orderIDS;
    if (method === "PREPAID") {
      const options = await paymentGateway(
        totalPrice + (totalPrice >= 500 ? 0 : 100)
      );
      newOrder.order_Id = options.order.id;
      await newOrder.save();
      return NextResponse.json({ options });
    }
    await newOrder.save();
    return NextResponse.json({ msg: "Order placed successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user || user.role !== "buyer") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const orders = await ORDER.find({ user_Id: user.id }).populate({
      path: "orderProduct_Ids",
      populate: { path: "Product_Id" },
    });
    return NextResponse.json({ data: orders });
  } catch {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};
async function paymentGateway(amount: number) {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const order = await rzp.orders.create({
      amount: amount * 100,
      currency: "INR",
    });
    return { order, key_id: process.env.RAZORPAY_KEY_ID! };
}
