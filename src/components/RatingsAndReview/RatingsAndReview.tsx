import React from 'react'
import Rating from './Rating'
import Review from './Review'
import { IRating, IReview } from '@/interfaces/product'

const RatingsAndReview = ({ rating, review }:{
  rating:IRating,
  review:IReview
}) => {
  return (
    <div>
      <Rating rating={rating} review={review}/>
      <Review review={review}  />
    </div>
  )
}

export default RatingsAndReview