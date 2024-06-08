"use client";
import { IPagination, IProduct } from "@/interfaces/product";
import useStore from "@/lib/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBarDropdown from "../SearchBar/SearchBarDropdown";
import Pagination from "../Pagination/Pagination";
import ShowProduct from "../ShowProduct/ShowProduct";

const CategoryProducts = ({ params }: { params: string }) => {
  const [category_Id, setCategory_Id] = useState(decodeURIComponent(params));
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const toggleLoading = useStore((state) => state.changeLoading);
  const wishlist=useStore((state)=>state.wishlist)
  useEffect(() => {
    async function fetchData() {
      toggleLoading();
      const response = await axios.get(`/api/buyer/product`, {
        params: {
          category_Id: decodeURIComponent(params),
        },
      });
      setProducts(response.data.data);
      setPagination(response.data.pagination);
      toggleLoading();
    }
    fetchData();
  }, [toggleLoading, params]);
  async function setPageHandler(
    page?: number,
    category?: string,
    title?: string
  ) {
    toggleLoading();
    if (category) {
      setCategory_Id(category);
    }
    const { data } = await axios.get(`/api/buyer/product`, {
      params: {
        page,
        category_Id:category,
        title,
      },
    });
    setProducts(data.data);
    setPagination(data.pagination);
    toggleLoading();
  }
  return (
    <div>
      <p>Showing results for {category_Id}</p>
      <SearchBarDropdown setPage={setPageHandler} />
      {products.length > 0 ? (
        <>
          <Pagination pagination={pagination} setPage={setPageHandler} />
          {products.map((product) => (
            <ShowProduct key={product._id} product={product} wishlist={wishlist}/>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-center text-3xl font-bold italic text-red-500">
            No Products Yet
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
