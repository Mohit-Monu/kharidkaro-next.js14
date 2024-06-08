"use client";
import React, { useEffect, useState } from "react";
import RatingsAndReview from "../RatingsAndReview/RatingsAndReview";
import axios from "axios";
import { IProductWithReviews } from "@/interfaces/product";
import useStore from "@/lib/store";

const SellerReviews = ({ productId }: { productId: string }) => {
  const [data, setData] = useState<IProductWithReviews>();
  const toggleLoading = useStore((state) => state.changeLoading);
  useEffect(() => {
    async function fetchdata() {
      toggleLoading();
      const response = await axios.get("/api/buyer/product", {
        params: {
          productId,
        },
      });
      setData(response.data.data);
      toggleLoading();
    }

    fetchdata();
  }, [productId,toggleLoading]);
  if(!data)return null
  return (
    <div>
      <RatingsAndReview rating={data.rating} review={data.review_id} />
    </div>
  );
};

export default SellerReviews;
