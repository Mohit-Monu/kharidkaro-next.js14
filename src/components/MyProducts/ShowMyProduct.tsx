import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import React, { useEffect } from "react";

const ShowMyProduct = ({
  product,
  deleteProductHandler,
  editProductHandler,
  seeReviewsHandler,
}: {
  product: IProduct;
  deleteProductHandler: (id: string) => void;
  editProductHandler: (id: string) => void;
  seeReviewsHandler: (id: string) => void;
}) => {
  const [totalRating, setTotalRating] = React.useState(0);
  const ratingColor = [
    "bg-black",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-green-600",
  ];

  useEffect(() => {
    setTotalRating(Math.ceil(product.rating.total));
  }, [product.rating.total]);

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 md:flex relative m-3">
      <div className="md:w-2/5 md:pr-4">
        <div className="relative w-full h-40 mb-4 md:mb-0">
          <Image
            src={product.mainImage}
            alt="product"
            className="w-full h-full rounded-lg"
            fill
          />
        </div>
      </div>
      <div className="md:w-1/2 md:pl-4">
        <p className="text-xl font-semibold text-gray-800 mb-2">
          {product.title}
        </p>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg text-gray-700">Price: Rs.{product.price}</p>
          <p className="text-sm text-gray-500 line-through">
            Original Price: Rs.{product.oriPrice}
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-1">
          Available Quantity: {product.quantity}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          Order Placed: {product.quantity - product.quantityLeft}
        </p>
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
          </div>
          <div className="flex flex-wrap md:flex-nowrap">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl mr-2 mb-2 md:mb-0"
              onClick={() => deleteProductHandler(product._id)}
            >
              Delete
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl mr-2 mb-2 md:mb-0"
              onClick={() => editProductHandler(product._id)}
            >
              Edit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl mb-2 md:mb-0"
              onClick={() => seeReviewsHandler(product._id)}
            >
              See Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMyProduct;
