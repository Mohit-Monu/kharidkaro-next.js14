"use client";
import { IProductWithReviews } from "@/interfaces/product";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ShippingAddress from "./ShippingAddress";
import GradiantButton from "../Button/GradiantButton";
import { IOrderState } from "@/interfaces/order";
import SlideToConfirmDialog from "../DialogWindow/SlideToConfirmDialog";
import useStore from "@/lib/store";
import DialogWindow from "../DialogWindow/DialogWindow";
import { MdError } from "react-icons/md";
import { SiTruenas } from "react-icons/si";
const PlaceOrderProduct = ({ product }: { product: string[] }) => {
  const [products, setProducts] = useState<IProductWithReviews[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [shippingOrderAddress, setShippingOrderAddress] =
    useState<IOrderState>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dialog, setDialog] = useState(false);
  const [dialogData, setDialogData] = useState(<></>);
  const toggleLoading = useStore((state) => state.changeLoading);
  const convertArrayToObjects = (array: string[]) => {
    const result = [];
    for (let i = 0; i < array.length; i += 2) {
      result.push({ id: array[i], quantity: Number(array[i + 1]) });
    }
    return result;
  };

  useEffect(() => {
    const productObjects = convertArrayToObjects(product);
    const fetchProducts = async () => {
      try {
        const productData = await Promise.all(
          productObjects.map(async (productObj) => {
            const response = await axios.get(`/api/buyer/product`, {
              params: {
                productId: productObj.id,
              },
            });
            if (response.status === 200) {
              return { ...response.data.data, quantity: productObj.quantity };
            } else {
              throw new Error("Error fetching product data");
            }
          })
        );
        setProducts(productData);
      } catch (error) {
        router.push("/buyer/unknown");
      }
    };

    fetchProducts();
  }, [product, router]);

  useEffect(() => {
    setTotal(
      products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    );
  }, [products]);
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  function validateShippingAddress() {
    setErrorMessage(null);
    if (!shippingOrderAddress?.name) {
      setErrorMessage("Please enter your name");
      return false;
    } else if (!shippingOrderAddress?.phone) {
      setErrorMessage("Please enter your phone number");
      return false;
    } else if (!shippingOrderAddress?.address) {
      setErrorMessage("Please enter your address");
      return false;
    } else if (!shippingOrderAddress?.city) {
      setErrorMessage("Please enter your city");
      return false;
    } else if (!shippingOrderAddress?.state) {
      setErrorMessage("Please enter your state");
      return false;
    } else if (!shippingOrderAddress?.pincode) {
      setErrorMessage("Please enter your pincode");
      return false;
    }
    setErrorMessage(null);
    return true;
  }

  const PayNowHandler = async () => {
    if (validateShippingAddress()) {
      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const productToSend = products.map((product) => ({
        id: product._id,
        quantity: product.quantity,
      }));
      const response = await axios.post(
        "/api/buyer/order",
        {
          products: productToSend,
          shippingOrderAddress,
        },
        {
          params: {
            method: "PREPAID",
          },
        }
      );
      var options = {
        key_id: response.data.options.key_id,
        order_id: response.data.options.order.id,
        handler: async function (result: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          console.log(result);
          await axios.post("/api/buyer/order/paymentsuccess", {
            result,
          });
          alert("Order Placed Success");
        },
      };
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      paymentObject.on(
        "payment.failed",
        function (response: {
          error: {
            code: string;
            description: string;
            source: string;
            reason: string;
            metadata: {
              order_id: string;
              payment_id: string;
            };
            step: "string";
          };
        }) {
          axios.post("/api/buyer/order/paymentfailed", {
            response,
          });
          alert("Payment Failed");
        }
      );
    }
  };

  const CODHandler = () => {
    if (validateShippingAddress()) {
      setDialog(!dialog);
      setDialogData(
        <SlideToConfirmDialog
          onConfirm={confirmOrderHandler}
          onCancel={() => {
            setDialog(false);
            setDialogData(<></>);
          }}
        >
          Swipe right to confirm your order
        </SlideToConfirmDialog>
      );
    }
  };
  const confirmOrderHandler = async () => {
    setDialog(!dialog);
    setDialogData(<></>);
    toggleLoading();
    const productToSend = products.map((product) => ({
      id: product._id,
      quantity: product.quantity,
    }));
    const response = await axios.post(
      "/api/buyer/order",
      {
        products: productToSend,
        shippingOrderAddress,
      },
      {
        params: {
          method: "COD",
        },
      }
    );
    toggleLoading();
    if (response.status === 200) {
      setDialog(!dialog);
      setDialogData(
        <DialogWindow
          Image={
            <SiTruenas className="w-16 h-16 flex items-center text-green-500 mx-auto" />
          }
          head="Success"
          title="Order placed successfully"
        >
          <button
            onClick={() => {
              router.push("/buyer");
            }}
            className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
          >
            Home
          </button>
        </DialogWindow>
      );
    } else {
      setDialog(!dialog);
      setDialogData(
        <DialogWindow
          Image={
            <MdError className="w-16 h-16 flex items-center text-red-500 mx-auto" />
          }
          head="Failed to order"
          title="failed to place order"
        >
          <button
            onClick={() => {
              router.push("/buyer");
            }}
            className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
          >
            Home
          </button>
        </DialogWindow>
      );
    }
  };

  return dialog ? (
    dialogData
  ) : (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="px-2 mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

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
                  <tr key={product._id} className="border-b border-gray-200">
                    <td className="py-4 flex items-center">
                      <div
                        className="mr-4"
                        style={{ minWidth: "64px", minHeight: "64px" }}
                      >
                        <Image
                          src={product.mainImage}
                          alt="Product image"
                          width={64}
                          height={64}
                        />
                      </div>
                      <span className="font-semibold">{product.title}</span>
                    </td>
                    <td className="py-4">Rs.{product.price}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <span className="text-center w-8">
                          {product.quantity}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      Rs.{product.price * product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-2">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>
              Rs.
              {products.reduce(
                (total, product) => total + product.oriPrice * product.quantity,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between mb-2 text-green-600">
            <span>Discount</span>
            <span>
              Rs.
              {products.reduce(
                (total, product) =>
                  total + (product.oriPrice - product.price) * product.quantity,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between mb-2 text-red-500">
            <span>Shipping</span>
            <span>Rs.{total > 500 ? 0 : 100}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">
              Rs.{total > 500 ? total : total + 100}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Items</span>
            <span className="font-semibold">
              {products.reduce((total, product) => total + product.quantity, 0)}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-2 mx-2">
        <ShippingAddress
          setShippingOrderAddress={setShippingOrderAddress}
          initialValue={shippingOrderAddress}
        />
        <span className="text-red-500">{errorMessage}</span>
        <div className="sm:flex w-full mt-4">
          <div className="sm:mr-4 mb-4 flex-1 ">
            <GradiantButton className="w-full" OnClick={PayNowHandler}>
              Pay Now Rs.{total > 200 ? total : total + 100}
            </GradiantButton>
          </div>
          <div className="mb-4 flex-1">
            <GradiantButton className="w-full" OnClick={CODHandler}>
              COD Rs.{total > 200 ? total : total + 100}
            </GradiantButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderProduct;
