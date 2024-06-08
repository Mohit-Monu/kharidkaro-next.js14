import { IProductWithReviews } from "@/interfaces/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
const ShowImageLayout = ({
  product,
  addToCartHandler,
  buyNowHandler,
  alreadyWishListed,
  wishListHandler,
}: {
  product: IProductWithReviews | undefined;
  addToCartHandler: () => void;
  buyNowHandler: () => void;
  alreadyWishListed: boolean;
  wishListHandler: () => void;
}) => {
  const [mainImage, setMainImage] = useState<string>();

  useEffect(() => {
    setMainImage(product?.mainImage);
  }, [product]);
  function changeMainImageHandler(image: string) {
    setMainImage(image);
  }

  if (!product || !mainImage) return null;
  const isDisabled = product.quantityLeft <1;
  console.log(isDisabled);
  return (
    <div>
      <div className="hidden sm:block">
        <div className="flex justify-center items-start pt-2">
          <div className="flex flex-col items-center ">
            <div
              className="overflow-y-auto "
              style={{ height: "565px", width: "100px" }}
            >
              {product.image.map((image, index) => (
                <div
                  key={index}
                  className="mb-2 relative cursor-pointer  hover:border-blue-500 hover:border-2"
                  onClick={() => changeMainImageHandler(image)}
                >
                  <Image
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="rounded-lg"
                    height={100}
                    width={100}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              className="flex justify-center relative"
              style={{ minHeight: "520px" }}
            >
              <Image
                src={mainImage}
                alt={product.title}
                className="rounded-lg"
                height={520}
                width={500}
              />
              <div
                className="absolute top-2 right-2 z-10 cursor-pointer"
                onClick={wishListHandler}
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
            </div>
            {isDisabled && <span className=" text-red-500 bg-gray-100 p-1 rounded-md" >Out of stock</span>}

            <div className="flex justify-between mt-2">
              <button
                className={`${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white px-4 py-2 rounded-xl flex items-center justify-center`}
                disabled={isDisabled}
                style={{ width: "48%" }}
                onClick={addToCartHandler}
              >
                Add to Cart <FaShoppingCart className="ml-1" />
              </button>
              <button
                className={`${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                } text-white px-4 py-2 rounded-xl flex items-center justify-center`}
                disabled={isDisabled}
                style={{ width: "48%" }}
                onClick={buyNowHandler}
              >
                Buy Now <FaBolt className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div className=" items-center">
          <div
            className="overflow-x-auto flex"
            style={{ height: "100px", width: "100%", overflowX: "scroll" }}
          >
            {product.image.map((image, index) => (
              <div
                key={index}
                className="mb-2 flex-shrink-0 cursor-pointer  hover:border-blue-500 hover:border-2"
                onClick={() => changeMainImageHandler(image)}
              >
                <Image
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="rounded-lg "
                  height={60}
                  width={60}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            className="flex justify-center relative"
            style={{ minHeight: "400px" }}
          >
            <Image
              src={mainImage}
              alt={product.title}
              className="rounded-lg"
              height={400}
              width={500}
            />
            <div
              className="absolute top-2 right-2 z-10 cursor-pointer"
              onClick={wishListHandler}
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
          </div>
          {isDisabled && <span className=" text-red-500 bg-gray-100 p-1 rounded-md" >Out of stock</span>}

          <div className="flex justify-between mt-2">
            <button
              className={`${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white px-4 py-2 rounded-xl flex items-center justify-center`}
              disabled={isDisabled}
              style={{ width: "48%" }}
              onClick={addToCartHandler}
            >
              Add to Cart <FaShoppingCart className="ml-1" />
            </button>
            <button
              className={`${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } text-white px-4 py-2 rounded-xl flex items-center justify-center`}
              disabled={isDisabled}
              style={{ width: "48%" }}
              onClick={buyNowHandler}
            >
              Buy Now <FaBolt className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowImageLayout;
