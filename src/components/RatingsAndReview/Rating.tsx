import { IRating, IReview } from "@/interfaces/product";
import React, { useEffect, useState } from "react";

const Rating = ({ rating, review }: { rating: IRating; review: IReview }) => {
  const [totalRatingCount, setTotalRatingCount] = useState<number>(0);
  const [totalReviewCount, setTotalReviewCount] = useState<number>(0);
  const [totalRating, setTotalRating] = useState<number | string>("No Rating");

  useEffect(() => {
    setTotalRatingCount(
      rating.oneStar +
        rating.twoStar +
        rating.threeStar +
        rating.fourStar +
        rating.fiveStar
    );
    const noOfRating=review.reviews.filter((review)=>review.comment!="")
    setTotalReviewCount(noOfRating.length);
    if (rating.total) setTotalRating(rating.total);
  }, [rating, review]);
  const getRatingColor = (rating: number) => {
    if (isNaN(rating)) return "text-gray-500";
    if (rating === 5) return "text-green-700";
    if (rating >= 4) return "text-green-500";
    if (rating >= 3) return "text-blue-500";
    if (rating >= 2) return "text-yellow-500";
    return "text-red-500";
  };
  return (
    <div className="border rounded-lg p-4 mb-4 ">
      <h2 className="text-lg font-semibold text-gray-800">Ratings & Reviews</h2>
      <div className="flex items-center mt-4">
        <p
          className={`text-4xl font-bold text-gray-900 ${getRatingColor(
            Number(totalRating)
          )}`}
        >
          {totalRating}★
        </p>
        <div className="ml-4">
          <p className="text-gray-600">
            {totalRatingCount} Ratings & {totalReviewCount} Reviews
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center mt-1">
          <span className="text-gray-800">1★</span>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mx-2 relative">
            <div
              className={`h-2.5 rounded-full bg-red-500`}
              style={{
                width: `${
                  rating.oneStar ? (rating.oneStar / totalRatingCount) * 100 : 0
                }%`,
              }}
            ></div>
          </div>
          <span className="text-gray-800">{rating.oneStar}</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-gray-800">2★</span>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mx-2 relative">
            <div
              className={`h-2.5 rounded-full bg-yellow-500`}
              style={{
                width: `${
                  rating.twoStar ? (rating.twoStar / totalRatingCount) * 100 : 0
                }%`,
              }}
            ></div>
          </div>
          <span className="text-gray-800">{rating.twoStar}</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-gray-800">3★</span>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mx-2 relative">
            <div
              className={`h-2.5 rounded-full bg-blue-500`}
              style={{
                width: `${
                  rating.threeStar
                    ? (rating.threeStar / totalRatingCount) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
          <span className="text-gray-800">{rating.threeStar}</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-gray-800">4★</span>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mx-2 relative">
            <div
              className={`h-2.5 rounded-full bg-green-500`}
              style={{
                width: `${
                  rating.fourStar
                    ? (rating.fourStar / totalRatingCount) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
          <span className="text-gray-800">{rating.fourStar}</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-gray-800">5★</span>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mx-2 relative">
            <div
              className={`h-2.5 rounded-full bg-green-700`}
              style={{
                width: `${
                  rating.fiveStar
                    ? (rating.fiveStar / totalRatingCount) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
          <span className="text-gray-800">{rating.fiveStar}</span>
        </div>
      </div>
    </div>
  );
};

export default Rating;
