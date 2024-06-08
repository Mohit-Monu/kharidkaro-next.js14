import { CategoryType } from "./form";

export interface IProduct {
  title: string;
  description: string;
  categories: CategoryType;
  image: string[];
  mainImage: string;
  price: number;
  oriPrice: number;
  quantity: number;
  quantityLeft: number;
  rating: IRating;
  review_id: string;
  seller_Id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
export interface IProductWithReviews {
  title: string;
  description: string;
  categories: CategoryType;
  image: string[];
  mainImage: string;
  price: number;
  oriPrice: number;
  quantity: number;
  quantityLeft: number;
  rating: IRating;
  review_id: IReview;
  seller_Id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
export interface IRating {
  fiveStar: number;
  fourStar: number;
  oneStar: number;
  threeStar: number;
  total: number;
  twoStar: number;
  createdAt: string;
  updatedAt: string;
}
export interface IReview {
  _id: string;
  _v: number;
  createdAt: string;
  updatedAt: string;
  seller_Id: string;
  product_Id: string;
  reviews:IReviewedByUser[]
}
export interface IReviewedByUser {
  user_Id: string;
  rating: number;
  comment: string;
  reviewerName: string;
  dateOfReview: string;
}
export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface IWishlistStore {
  Product_id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  user_Id: string;
}
export interface IMyCart {
  Product_id:IProduct
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  user_Id: string;
  quantity: number;
}