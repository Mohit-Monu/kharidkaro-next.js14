import { IMyCart } from "@/interfaces/product";
import useStore from "@/lib/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const MyCartProducts = ({
  products,
  setProducts,
}: {
  products: IMyCart[];
  setProducts: React.Dispatch<React.SetStateAction<IMyCart[]>>;
}) => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalOriPrice, setTotalOriPrice] = React.useState(0);
  const [shipping, setShipping] = React.useState(100);
  const toggleLoading = useStore((state) => state.changeLoading);
  useEffect(() => {
    const price = products.reduce(
      (acc, product) => acc + product.quantity * product.Product_id.price,
      0
    );
    if (price > 500) {
      setShipping(0);
    }
    setTotalPrice(price);
    setTotalOriPrice(
      products.reduce(
        (acc, product) => acc + product.quantity * product.Product_id.oriPrice,
        0
      )
    );
  }, [products]);
  async function reduceQuantityHandler(id: string) {
    toggleLoading();
    const result = await axios.patch("/api/buyer/cart", {
      inc: false,
      dec: true,
      cart_id: id,
    });
    if (result.status === 200) {
      const updatedProducts = products
        .map((product) => {
          if (product._id === id) {
            if (product.quantity === 1) {
              return null;
            } else {
              return { ...product, quantity: product.quantity - 1 };
            }
          }
          return product;
        })
        .filter((product): product is IMyCart => product !== null);
      setProducts(updatedProducts);
    }
    toggleLoading();
  }

  async function increaseQuantityHandler(id: string) {
    toggleLoading();
    const result = await axios.patch("/api/buyer/cart", {
      inc: true,
      dec: false,
      cart_id: id,
    });
    if (result.status === 200) {
      const updatedProducts = products.map((product) => {
        if (product._id === id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProducts(updatedProducts);
    }
    toggleLoading();
  }
  function handleCheckout(){
    let idstring=""
    products.forEach((product)=>{
      idstring+=`/${product.Product_id._id}/${product.quantity}`
    })
    router.push(`/buyer/order${idstring}`)
  }
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product._id}
                        className="border-b border-gray-200   "
                      >
                        <td className="py-4 flex items-center">
                          <div
                            className="mr-4 cursor-pointer"
                            style={{ minWidth: "64px", minHeight: "64px" }}
                            onClick={() => {
                              router.push(
                                `/buyer/product/${product.Product_id._id}`
                              );
                            }}
                          >
                            <Image
                              src={product.Product_id.mainImage}
                              alt="Product image"
                              width={64}
                              height={64}
                            />
                          </div>
                          <span
                            className="font-semibold cursor-pointer"
                            onClick={() => {
                              router.push(
                                `/buyer/product/${product.Product_id._id}`
                              );
                            }}
                          >
                            {product.Product_id.title}
                          </span>
                        </td>
                        <td className="py-4">Rs.{product.Product_id.price}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border rounded-md py-2 px-4 mr-2"
                              onClick={() => {
                                reduceQuantityHandler(product._id);
                              }}
                            >
                              -
                            </button>
                            <span className="text-center w-8">
                              {product.quantity}
                            </span>
                            <button
                              className="border rounded-md py-2 px-4 ml-2"
                              onClick={() => {
                                increaseQuantityHandler(product._id);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">
                          Rs.{product.Product_id.price * product.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>Rs.{totalOriPrice}</span>
              </div>
              <div className="flex justify-between mb-2 text-green-600">
                <span>Discount</span>
                <span>Rs.{totalOriPrice - totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2 text-red-500">
                <span>Shipping</span>
                <span>Rs.{shipping}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  Rs.{totalPrice + shipping}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Items</span>
                <span className="font-semibold">
                  {products.reduce(
                    (total, product) => total + product.quantity,
                    0
                  )}
                </span>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCartProducts;
