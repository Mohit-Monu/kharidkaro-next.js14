import dbConnect from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import PRODUCT from "@/models/product";
import mongoose from "mongoose";
export const GET = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user) {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const productId=req.nextUrl.searchParams.get("productId")
  const productCategory = req.nextUrl.searchParams.get("category_Id");
  const page = parseInt(req.nextUrl.searchParams.get("page") as string) || 1;
  const selectTitle = req.nextUrl.searchParams.get("title");
  if(productId){
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ msg: "Invalid product ID" }, { status: 400 });
    }
    const product = await PRODUCT.findById(productId).populate("review_id");
    if(!product) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(
      { msg: "success", data: product },
      { status: 200 }
    );
  }
  if(user.role !== "buyer"){
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const limit = 5;
    const startIndex = (page - 1) * limit;
    let query: {
      title?: { $regex: string; $options: string };
      categories?: string;
    } = {};
    if (selectTitle && selectTitle !== "") {
      query.title = {
        $regex: selectTitle,
        $options: "i",
      };
    }
    if (productCategory && productCategory !== "" && productCategory !== "All Categories") {
      query.categories = productCategory;
    }
    const products = await PRODUCT.find(query)
      .populate("review_id")
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: -1 });
    const totalProductsCount = await PRODUCT.countDocuments(query);
    const totalPages = Math.ceil(totalProductsCount / limit);
    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalProductsCount,
      limit: limit,
    };
    return NextResponse.json(
      { msg: "success", data: products, pagination },
      { status: 200 }
    );
  } catch (err){
    console.log(err)
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};

