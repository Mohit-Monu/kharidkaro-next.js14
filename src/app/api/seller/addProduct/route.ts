import { IPostFormDetails } from "@/interfaces/form";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import PRODUCT from "@/models/product";
import REVIEWS from "@/models/review";
import { existsSync } from "fs";

export const POST = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (user && user.role === "seller") {
    try {
      const body = await req.json();
      if (!body) {
        return NextResponse.json(
          { msg: "Missing request body" },
          { status: 400 }
        );
      }
      const {
        title,
        description,
        categories,
        mainImage,
        price,
        oriPrice,
        quantity,
        image,
      }: IPostFormDetails = body;
      if (
        !title ||
        !description ||
        !categories ||
        !mainImage ||
        !price ||
        !oriPrice ||
        !quantity ||
        !image
      ) {
        return NextResponse.json(
          { msg: "Missing required fields" },
          { status: 400 }
        );
      }
      const imagePath = `/images/${user.id}/`;
      if (!existsSync(`./public/images/${user.id}/`)) {
        return NextResponse.json(
          { msg: "Image path not found" },
          { status: 404 }
        );
      }
      const mImage = imagePath + mainImage;
      if (!mImage) {
        return NextResponse.json(
          { msg: "Main image not found" },
          { status: 404 }
        );
      }
      const AImage = image.map((image) => imagePath + image);
      if (!AImage.length) {
        return NextResponse.json(
          { msg: "Image array is empty" },
          { status: 400 }
        );
      }
      await dbConnect();
      const newProduct = await new PRODUCT({
        title,
        description,
        categories,
        price,
        oriPrice,
        quantity,
        quantityLeft: quantity,
        mainImage: mImage,
        image: AImage,
        seller_Id: user.id,
      }).save();
      if (!newProduct) {
        return NextResponse.json(
          { msg: "Failed to save product" },
          { status: 500 }
        );
      }
      const newReview = await new REVIEWS({
        product_Id: newProduct._id,
        seller_Id: user.id,
      }).save();
      if (!newReview) {
        return NextResponse.json(
          { msg: "Failed to save review" },
          { status: 500 }
        );
      }
      newProduct.review_id = newReview._id;
      await newProduct.save();
      return NextResponse.json(
        { msg: "Product added successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { msg: "Something went wrong" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
};

export const GET = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user || user.role !== "seller") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const page = parseInt(req.nextUrl.searchParams.get("page") as string) || 1;
  const selectCategory = req.nextUrl.searchParams.get("category");
  const selectTitle = req.nextUrl.searchParams.get("title");
  const slug = req.nextUrl.searchParams.get("slug");
  await dbConnect();

  if (slug) {
    try{
      const product = await PRODUCT.findById(slug);
      return NextResponse.json(
        { msg: "success", data: product },
        { status: 200 }
      );
    }catch{
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }
  }
  const limit = 5;
  const startIndex = (page - 1) * limit;
  try {
    let query: {
      seller_Id?: string;
      categories?: string;
      title?: { $regex: string; $options: string };
    } = {
      seller_Id: user.id as string,
    };
    if (selectCategory && selectCategory !== "All Categories") {
      query.categories = selectCategory;
    }
    if (selectTitle && selectTitle !== "") {
      query.title = {
        $regex: selectTitle,
        $options: "i",
      };
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
  } catch (err) {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user || user.role !== "seller") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const Product_Id = req.nextUrl.searchParams.get("Product_Id");
  if (!Product_Id) {
    return NextResponse.json({ msg: "Product_Id not found" }, { status: 400 });
  }
  try {
    await dbConnect();
    const product = await PRODUCT.findById(Product_Id);
    if (!product) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }
    if (product.seller_Id.toString() !== user.id) {
      return NextResponse.json(
        { msg: "You are not authorized to delete this product" },
        { status: 401 }
      );
    }
    await REVIEWS.findByIdAndDelete(product.review_id);
    await PRODUCT.findByIdAndDelete(Product_Id);
    return NextResponse.json(
      { msg: "Product deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const user = await getToken({ req });
  if (!user || user.role !== "seller") {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
  const Product_Id = req.nextUrl.searchParams.get("Product_Id");
  if (!Product_Id) {
    return NextResponse.json({ msg: "Product_Id not found" }, { status: 400 });
  }
  try {
    await dbConnect();
    const product = await PRODUCT.findById(Product_Id);
    if (!product) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }
    if (product.seller_Id.toString() !== user.id) {
      return NextResponse.json(
        { msg: "You are not authorized to edit this product" },
        { status: 401 }
      );
    }
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { msg: "Missing request body" },
        { status: 400 }
      );
    }
    const {
      title,
      description,
      categories,
      mainImage,
      price,
      oriPrice,
      quantity,
      image,
    }: IPostFormDetails = body;
    if (
      !title ||
      !description ||
      !categories ||
      !mainImage ||
      !price ||
      !oriPrice ||
      !quantity ||
      !image
    ) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );
    }
    await PRODUCT.findByIdAndUpdate(Product_Id, {
      title,
      description,
      categories,
      mainImage,
      price,
      oriPrice,
      quantity,
      image,
    });
    return NextResponse.json(
      { msg: "Product updated successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};
