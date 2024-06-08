import dbConnect from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import REVIEWS from "@/models/review";
import PRODUCT from "@/models/product";
import { IRating, IReviewedByUser } from "@/interfaces/product";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  const { rating, review, review_id } = data;
  if (!rating || !review_id || isNaN(rating)) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }
  try {
    await dbConnect();
    const ratingdb = await REVIEWS.findById(review_id);
    if (!ratingdb) {
      return NextResponse.json(
        { message: "Rating not found" },
        { status: 404 }
      );
    }
    const productdb = await PRODUCT.findById(ratingdb.product_Id);
    const productdbRating = productdb.rating;

    if (!ratingdb.reviews) {
      ratingdb.reviews = [];
    }
    const userReview = ratingdb.reviews.find(
      (review: IReviewedByUser) => review.user_Id.toString() === token.id
    );
    if (userReview) {
      if (userReview.rating === 1) {
        productdbRating.oneStar = productdb.rating.oneStar - 1;
      } else if (userReview.rating === 2) {
        productdbRating.twoStar = productdb.rating.twoStar - 1;
      } else if (userReview.rating === 3) {
        productdbRating.threeStar = productdb.rating.threeStar - 1;
      } else if (userReview.rating === 4) {
        productdbRating.fourStar = productdb.rating.fourStar - 1;
      } else if (userReview.rating === 5) {
        productdbRating.fiveStar = productdb.rating.fiveStar - 1;
      }
      userReview.rating = rating;
      userReview.comment = review;
    } else {
      ratingdb.reviews.push({
        user_Id: token.id,
        rating,
        comment: review,
        reviewerName: token.name,
      });
    }
    if (rating === 1) {
      productdbRating.oneStar = productdb.rating.oneStar + 1;
    } else if (rating === 2) {
      productdbRating.twoStar = productdb.rating.twoStar + 1;
    } else if (rating === 3) {
      productdbRating.threeStar = productdb.rating.threeStar + 1;
    } else if (rating === 4) {
      productdbRating.fourStar = productdb.rating.fourStar + 1;
    } else if (rating === 5) {
      productdbRating.fiveStar = productdb.rating.fiveStar + 1;
    }
    productdbRating.total =
      (productdbRating.fiveStar * 5 +
        productdbRating.fourStar * 4 +
        productdbRating.threeStar * 3 +
        productdbRating.twoStar * 2 +
        productdbRating.oneStar * 1) /
      (productdbRating.fiveStar +
        productdbRating.fourStar +
        productdbRating.threeStar +
        productdbRating.twoStar +
        productdbRating.oneStar);

    await productdb.save()
    await ratingdb.save();

    return NextResponse.json({ message: "Review submitted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 400 }
    );
  }
}
