import { IProductWithReviews } from '@/interfaces/product'
import React, { useEffect, useState } from 'react'
import RatingsAndReview from '../RatingsAndReview/RatingsAndReview'
import GiveRatingAndReview from '../RatingsAndReview/GiveRatingAndReview'

const ShowDetailsLayout = ({ product }: { product: IProductWithReviews | undefined }) => {
  const [totalRatingCount, setTotalRatingCount] = useState<number | null>(null)
  const [totalReviewCount, setTotalReviewCount] = useState<number | null>(null)
  const [totalRating, setTotalRating] = useState<number | string>("No Rating")

  useEffect(() => {
    if (product) {
      setTotalRatingCount(product.rating.oneStar + product.rating.twoStar + product.rating.threeStar + product.rating.fourStar + product.rating.fiveStar)
      const noOfRating=product.review_id.reviews.filter((review)=>review.comment!="")
      setTotalReviewCount( noOfRating.length)
      if (product.rating.total) setTotalRating(product.rating.total)
    }
  }, [product])

  const getRatingColor = (rating: number) => {
    if(isNaN(rating)) return "bg-gray-500";
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-blue-500";
    if (rating >= 2) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (!product) return null

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-lg font-semibold text-gray-800">{product.categories}</h2>
      <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
      <div className="flex items-center mt-4">
        <p className={`font-bold p-2 text-white rounded-xl ${getRatingColor(Number(totalRating))}`}>{totalRating}*</p>
        <p className="text-gray-600 ml-2">{totalRatingCount} Ratings & {totalReviewCount} Reviews</p>
      </div>
      <div className="mt-4 flex flex-wrap justify-start items-center">
        <h1 className="text-2xl font-semibold text-gray-900 mr-4">Rs.{product.price}</h1>
        <p className="text-sm text-gray-500 line-through mr-4">Rs.{product.oriPrice}</p>
        <p className="text-sm text-green-500">{Math.ceil((product.oriPrice - product.price) / product.oriPrice * 100)}% off</p>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">Product Description</h2>
        <p className="text-gray-600 mt-2 shadow-md p-4">{product.description}</p>
      </div>
      <div className="mt-8">
      <GiveRatingAndReview AllReviews={product.review_id}/>
      </div>
      <div className="mt-8">
        <RatingsAndReview rating={product.rating} review={product.review_id}/>
      </div>
    </div>
  )
}

export default ShowDetailsLayout
