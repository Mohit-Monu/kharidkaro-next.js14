import { IReview } from "@/interfaces/product";
import useStore from "@/lib/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface ReviewPayload {
  rating: number;
  review: string;
  review_id:string
}

const GiveRatingAndReview = ({ AllReviews }: {AllReviews:IReview }) => {
  const [userPurchased, setUserPurchased] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const { data } = useSession();
  const toggleLoading=useStore((state)=>state.changeLoading)
  useEffect(() => {
    if(AllReviews.reviews.length>0){
      const userReview = AllReviews.reviews.find((review) => review.user_Id === data?.user.id);
      if(userReview){
        setRating(userReview.rating)
        setReview(userReview.comment)
      }
    }
  },[AllReviews,data])

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: ReviewPayload = {
      rating,
      review,
      review_id: AllReviews._id
    };
    try {
      toggleLoading()
      const response = await axios.post('/api/buyer/review', payload);
      toggleLoading()
    } catch (error) {
      toggleLoading()
      console.error("Error submitting review", error);
    }
  };

  return (
    userPurchased && (
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">Give Rating and Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="star-rating flex space-x-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`cursor-pointer text-3xl ${
                  index < rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleStarClick(index)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave your review here"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
    )
  );
};

export default GiveRatingAndReview;
