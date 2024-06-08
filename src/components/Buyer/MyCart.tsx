"use client";
import React, { useEffect, useState } from "react";
import { IMyCart } from "@/interfaces/product";
import axios from "axios";
import MyCartProducts from "../MyCartProducts/MyCartProducts";
import useStore from "@/lib/store";
const MyCart = () => {
  const [products, setProducts] = useState<IMyCart[]>([]);
  const toggleLoading=useStore((state)=>state.changeLoading)
  useEffect(() => {
    async function fetchData() {
      toggleLoading();
      const response = await axios.get(`/api/buyer/cart`);
      setProducts(response.data.products)
      toggleLoading();
    }
    fetchData();
  }, [toggleLoading]);
  return products.length > 0 ? (
    <MyCartProducts products={products} setProducts={setProducts} />
  ) : (
    <div className="flex h-screen items-center justify-center">
      <p className="text-center text-xl font-bold text-red-700">
        Your Cart is empty
      </p>
    </div>
  );
};

export default MyCart;
