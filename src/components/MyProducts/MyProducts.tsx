"use client";
import { IPagination, IProduct } from "@/interfaces/product";
import useStore from "@/lib/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import ShowMyProduct from "./ShowMyProduct";
import SearchBarDropdown from "../SearchBar/SearchBarDropdown";
import DialogWindow from "../DialogWindow/DialogWindow";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useRouter } from "next/navigation";
const MyProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const toggleLoading = useStore((state) => state.changeLoading);
  const [dialog, setDialog] = useState(false);
  const [deleteSuccessDialog, setDeleteSuccessDialog] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      toggleLoading();
      const { data } = await axios.get("/api/seller/addProduct");
      setProducts(data.data);
      setPagination(data.pagination);
      toggleLoading();
    }
    fetchData();
  }, [toggleLoading]);
  async function setPageHandler(
    page?: number,
    category?: string,
    title?: string
  ) {
    toggleLoading();
    const { data } = await axios.get(`/api/seller/addProduct`, {
      params: {
        page,
        category,
        title,
      },
    });
    setProducts(data.data);
    setPagination(data.pagination);
    toggleLoading();
  }
  async function deleteProductHandler(id: string) {
    setDialog(true);
    setDeleteProductId(id);
  }
  async function deleteProduct(id: string) {
    toggleLoading();
    await axios.delete(`/api/seller/addProduct`, {
      params: {
        Product_Id: id,
      },
    });
    toggleLoading();
    setDeleteSuccessDialog(!deleteSuccessDialog);
    setProducts((prev) => prev.filter((product) => product._id !== id));
    setPagination((prev) => ({
      ...prev!,
      totalItems: prev!.totalItems - 1,
    }));
  }
  async function editProductHandler(id: string) {
    router.push(`/seller/edit-products/${id}`);
  }
  async function seeReviewsHandler(id: string) {
    router.push(`/seller/reviews/${id}`);
  }
  return (
    <div>
      {dialog && (
        <DialogWindow
          head="Are you sure?"
          title="Are You Sure? You want to delete this product"
          Image={
            <MdDelete className="w-16 h-16 flex items-center text-red-500 mx-auto" />
          }
        >
          <button
            onClick={() => {
              setDialog(!dialog);
              setDeleteProductId(null);
            }}
            className="mb-2 md:mb-0 bg-white-500 border border-white-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-black rounded-full hover:shadow-lg hover:bg-white-600"
          >
            cancel
          </button>
          <button
            onClick={() => {
              setDialog(!dialog);
              deleteProduct(deleteProductId!);
            }}
            className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
          >
            delete
          </button>
        </DialogWindow>
      )}
      {deleteSuccessDialog && (
        <DialogWindow
          head="Deleted Successfully"
          title="Your product has been deleted successfully"
          Image={
            <TiTick className="w-16 h-16 flex items-center text-green-500 mx-auto" />
          }
        >
          <button
            onClick={() => {
              setDeleteSuccessDialog(!deleteSuccessDialog);
            }}
            className="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"
          >
            Ok
          </button>
        </DialogWindow>
      )}
      <SearchBarDropdown setPage={setPageHandler} />
      {products.length > 0 ? (
        <>
          <Pagination pagination={pagination} setPage={setPageHandler} />
          {products.map((product) => (
            <ShowMyProduct
              key={product._id}
              product={product}
              deleteProductHandler={deleteProductHandler}
              editProductHandler={editProductHandler}
              seeReviewsHandler={seeReviewsHandler}
            />
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

export default MyProducts;
