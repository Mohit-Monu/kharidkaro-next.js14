import { IReview } from "@/interfaces/product";
import React, { useState } from "react";

const Review = ({ review }: { review: IReview }) => {

  const userReviews = review.reviews;
  const [showAllReviews, setShowAllReviews] = useState(false);

  const getRatingColor = (rating: number) => {
    if (rating === 5) return "bg-green-700";
    if (rating === 4) return "bg-green-500";
    if (rating === 3) return "bg-blue-500";
    if (rating === 2) return "bg-yellow-500";
    return "bg-red-500";
  };

  const displayedReviews = showAllReviews ? userReviews : userReviews.slice(0, 3);

  return (
    <div className="mt-4">
      {userReviews.length ? (
        displayedReviews.map((review) => (
          <div key={review.user_Id} className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <p
                  className={`p-2 text-white rounded-xl ${getRatingColor(
                    Number(review.rating)
                  )}`}
                >
                  {review.rating}*
                </p>
                <p className="font-semibold text-gray-600 ml-2">
                  {review.reviewerName}
                </p>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(review.dateOfReview).toLocaleDateString()}
              </p>
            </div>
            <p className="text-gray-600 mt-2">{review.comment}</p>
          </div>
        ))
      ) : (
        <div className="border rounded-lg p-4 mb-4">
          <p className="text-4xl font-bold text-gray-900">No reviews</p>
        </div>
      )}
      {userReviews.length > 3 && (
        <p
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-4 p-2 text-blue-500 font-semibold rounded cursor-pointer"
        >
          {showAllReviews ? "Show Less" : `All ${userReviews.length} Reviews`}
        </p>
      )}
    </div>
  );
};

export default Review;
