"use client";
import React, { useEffect, useState } from "react";
import ShowProduct from "../ShowProduct/ShowProduct";
import { IProduct, IWishlistStore } from "@/interfaces/product";
import axios from "axios";
import useStore from "@/lib/store";

const MyWishList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const wishlist = useStore((state) => state.wishlist);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/buyer/wishlist`, {
        params: {
          AllWishlist: true,
        },
      });
      setProducts(
        response.data.products.map((item: IWishlistStore) => item.Product_id)
      );
    }
    fetchData();
  }, []);
  return products.length > 0 ? (
    products.map((product) => (
      <ShowProduct key={product._id} product={product} wishlist={wishlist} />
    ))
  ) : (
    <div className="flex h-screen items-center justify-center">
      <p className="text-center text-xl font-bold text-red-700">
        Your wishlist is empty
      </p>
    </div>
  );
};

export default MyWishList;
