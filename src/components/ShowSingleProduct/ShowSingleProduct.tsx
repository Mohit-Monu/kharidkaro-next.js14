"use client";
import { IProductWithReviews } from "@/interfaces/product";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowImageLayout from "./ShowImageLayout";
import ShowDetailsLayout from "./ShowDetailsLayout";
import useStore from "@/lib/store";
import DialogWindow from "../DialogWindow/DialogWindow";
import { FaCartPlus } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { useRouter } from "next/navigation";
const ShowSingleProduct = ({ params }: { params: string }) => {
  const router = useRouter();
  const [product, setProduct] = useState<IProductWithReviews>();
  const toggleLoading = useStore((state) => state.changeLoading);
  const [dialog, setDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(<></>);
  const [alreadyWishListed, setAlreadyWishListed] = React.useState(false);
  const wishlist = useStore((state) => state.wishlist);
  const addWishList = useStore((state) => state.addWishList);
  const removeWishList = useStore((state) => state.removeWishList);
  useEffect(() => {
    const fetchData = async () => {
      try {
        toggleLoading();
        const response = await axios.get(`/api/buyer/product`, {
          params: {
            productId: params,
          },
        });
        setProduct(response.data.data);
        toggleLoading();
      } catch {
        toggleLoading();
        router.push("/buyer/unknown");
      }
    };
    fetchData();
  }, [params, toggleLoading, router]);
  useEffect(() => {
    if (wishlist && product) {
      setAlreadyWishListed(wishlist.includes(product?._id));
    }
  }, [product, wishlist]);
  async function addToCartHandler() {
    const response = await axios.post(`/api/buyer/cart`, {
      product_Id: product?._id,
    });
    if (response.status === 200) {
      setDialog(true);
      setDialogData(
        <DialogWindow
          Image={
            <FaCartPlus className="w-16 h-16 flex items-center text-red-500 mx-auto" />
          }
          head="Added to cart"
          title={`Product successfully added to cart total quantity is ${response.data.result.quantity}`}
        >
          <button
            onClick={() => {
              setDialog(false);
            }}
            className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
          >
            Ok
          </button>
        </DialogWindow>
      );
    }
  }
  async function wishListHandler() {
    if (!product) return;
    const response = await axios.post(`/api/buyer/wishlist`, {
      product_Id: product._id,
    });
    setDialog(true);
    if (response.status === 200) {
      addWishList(product._id);
      setDialogData(
        <DialogWindow
          Image={
            <IoMdHeart className="w-16 h-16 flex items-center text-red-500 mx-auto" />
          }
          head="Added to wishlist"
          title="Product Added to wishlist"
        >
          <button
            onClick={() => {
              setDialog(false);
            }}
            className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
          >
            Ok
          </button>
        </DialogWindow>
      );
    } else if (response.status === 202) {
      removeWishList(product._id);
      setDialogData(
        <DialogWindow
          Image={
            <FaHeartbeat className="w-16 h-16 flex items-center text-black mx-auto" />
          }
          head="Removed from wishlist"
          title="Product removed from wishlist"
        >
          <button
            onClick={() => {
              setDialog(false);
            }}
            className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
          >
            Ok
          </button>
        </DialogWindow>
      );
    } else {
      setDialogData(
        <DialogWindow
          Image={
            <MdError className="w-16 h-16 flex items-center text-red-500 mx-auto" />
          }
          head="Failed to add"
          title="Failed to add product to wishlist please try again"
        >
          <button
            onClick={() => {
              setDialog(false);
            }}
            className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
          >
            Ok
          </button>
        </DialogWindow>
      );
    }
  }

  function buyNowHandler() {
    router.push(`/buyer/order/${product?._id}/1`);
  }
  return dialog ? (
    dialogData
  ) : (
    <div className="flex flex-col xl:flex-row">
      <div className="xl:w-2/5 xl:order-1 xl:h-screen xl:overflow-y-auto">
        <ShowImageLayout
          product={product}
          addToCartHandler={addToCartHandler}
          buyNowHandler={buyNowHandler}
          alreadyWishListed={alreadyWishListed}
          wishListHandler={wishListHandler}
        />
      </div>
      <div className="xl:w-3/5 xl:order-2 xl:h-screen xl:overflow-y-auto">
        <ShowDetailsLayout product={product}/>
      </div>
    </div>
  );
};

export default ShowSingleProduct;
