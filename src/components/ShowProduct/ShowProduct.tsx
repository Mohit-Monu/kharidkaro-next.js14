import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import axios from "axios";
import useStore from "@/lib/store";
import DialogWindow from "../DialogWindow/DialogWindow";
import { MdError } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
const ShowProduct = ({
  product,
  wishlist,
}: {
  product: IProduct;
  wishlist?: string[];
}) => {
  const router = useRouter();
  const [totalRating, setTotalRating] = React.useState(0);
  const [alreadyWishListed, setAlreadyWishListed] = React.useState(false);
  const addWishList = useStore((state) => state.addWishList);
  const removeWishList = useStore((state) => state.removeWishList);
  const [dialog, setDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(<></>);
  const ratingColor = [
    "bg-black",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-green-600",
  ];
  const isDisabled = product.quantityLeft < 1;
  useEffect(() => {
    setTotalRating(Math.ceil(product.rating.total));
  }, [product.rating.total]);
  useEffect(() => {
    if (wishlist) {
      setAlreadyWishListed(wishlist.includes(product._id));
    }
  }, [product._id, wishlist]);
  async function addToCartHandler(id: string) {
    const response = await axios.post(`/api/buyer/cart`, {
      product_Id: id,
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
  async function buyNowHandler(id: string) {
    router.push(`/buyer/order/${product?._id}/1`);
  }
  async function wishListHandler(id: string) {
    const response = await axios.post(`/api/buyer/wishlist`, {
      product_Id: id,
    });
    setDialog(true);
    if (response.status === 200) {
      addWishList(id);
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
      removeWishList(id);
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

  return dialog ? (
    dialogData
  ) : (
    <div className="bg-white shadow-xl rounded-lg md:p-4 md:flex relative m-3">
      <div className="md:w-2/5 relative">
        <div className="relative">
          <div className="w-full h-40 mb-4 md:mb-0 relative">
            <Image
              src={product.mainImage}
              alt="product"
              className="w-full h-full rounded-lg cursor-pointer"
              fill
              onClick={() => {
                router.push(`/buyer/product/${product._id}`);
              }}
            />
            {wishlist && (
              <div
                className="absolute top-2 left-2 z-10 cursor-pointer"
                onClick={() => wishListHandler(product._id)}
              >
                <div
                  className={`rounded-full w-10 h-10 flex items-center ${
                    alreadyWishListed ? "bg-red-300" : "bg-black"
                  } justify-center bg-opacity-50 hover:bg-opacity-75 transition duration-300 ease-in-out transform hover:scale-110`}
                >
                  {alreadyWishListed ? (
                    <IoIosHeart className="text-red-500 w-5 h-5 " />
                  ) : (
                    <FaRegHeart className="text-red-500 w-5 h-5 " />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:w-1/2 md:pl-4">
        <p
          className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer"
          onClick={() => {
            router.push(`/buyer/product/${product._id}`);
          }}
        >
          {product.title}
        </p>
        <div className="mb-2">
          <p className="text-xl text-gray-700">Rs.{product.price}</p>
          <p className="text-sm text-gray-500 line-through">
            Rs.{product.oriPrice}
          </p>
          <p className="text-sm text-green-500 font-bold">
            {(100 - (product.price / product.oriPrice) * 100).toFixed(0)}% off
          </p>
        </div>
        <div
          className={`inline-block rounded-xl mb-2 p-1 pl-2 pr-2 ${ratingColor[totalRating]}`}
        >
          <p
            className={`text-sm ${
              totalRating < 3 ? "text-white" : "text-black"
            }`}
          >
            Rating: {product.rating.total}
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap mb-4 md:mb-0">
            <span className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1 mr-2 mb-2">
              {product.categories}
            </span>
            {isDisabled && <span className=" text-red-500 bg-gray-100 p-1 rounded-md" >Out of stock</span>}
          </div>
          <div className="flex">
            <button
              className={`${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-4 py-2 rounded-xl mr-2 mb-2 md:mb-0 flex items-center`}
              disabled={isDisabled}
              onClick={() => {
                addToCartHandler(product._id);
              }}
            >
              Add to cart <FaShoppingCart className="ml-1" />
            </button>
            <button
              className={`${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } text-white px-4 py-2 rounded-xl mr-2 mb-2 md:mb-0 flex items-center`}
              disabled={isDisabled}
              onClick={() => {
                buyNowHandler(product._id);
              }}
            >
              Buy now <FaBoltLightning className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
