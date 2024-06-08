"use client";
import { IOrderSeller } from "@/interfaces/order";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { MdOutlineEmojiEmotions } from "react-icons/md";
const SellerMyOrders = () => {
  const [orders, setOrders] = React.useState<IOrderSeller[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const fetchOrders = async () => {
    const res = await axios.get("/api/seller/orders");
    setOrders(res.data.orders);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  console.log(orders);

  async function changeStatusHandler(id:string,status:string) {
    const res=await axios.put("/api/seller/orders",{id,status})
    console.log(res)
    fetchOrders()
  }
  return (
    <div className="p-4">
      {orders.map((order) => (
        <div key={order._id} className="bg-white shadow-xl rounded-lg p-4 m-3">
          <div className="mb-2">
            <p className="font-semibold">Order ID: {order._id}</p>
          </div>
          <div className="flex items-center mb-4 md:mb-2">
            <div className="flex-shrink-0">
              <Image
                src={order.Product_Id.mainImage}
                alt={order.Product_Id.title}
                width={100}
                height={100}
                className="rounded-lg cursor-pointer"
              />
            </div>
            <div className="ml-4 w-full sm:w-auto">
              <h3 className="font-medium text-lg">{order.Product_Id.title}</h3>
              <div className="mt-2 sm:flex sm:space-x-4">
                <p className="text-gray-600">Price: Rs.{order.price}</p>
                <p className="text-gray-600">Quantity: {order.quantity}</p>
                <p className="font-semibold">
                  Total: Rs.{order.quantity * order.price}
                </p>
              </div>
            </div>
          </div>
          <p
            className="text-blue-500 cursor-pointer text-center flex items-center justify-center"
            onClick={() => toggleOrderDetails(order._id)}
          >
            View Details{" "}
            <FaAngleDown
              className={`ml-2 transform transition-transform ${
                expandedOrder === order._id ? "rotate-180" : ""
              }`}
            />
          </p>
          {expandedOrder === order._id && (
            <div>
              <div className="mt-4 p-4 border-t border-gray-200">
                <p className="text-gray-700">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  Shipping Address:{" "}
                  {order.order_Id.address.address +
                    ", " +
                    order.order_Id.address.city +
                    ", " +
                    order.order_Id.address.state +
                    ", " +
                    order.order_Id.address.pincode +
                    ", " +
                    order.order_Id.address.name}
                </p>
                <p className="text-gray-700">
                  Buyer Name: {order.order_Id.address.name}
                </p>
                <p className="text-gray-700">
                  Buyer Contact Number: {order.order_Id.address.phone}
                </p>
                {order.order_Id.address.alternatePhone != 0 && (
                  <p className="text-gray-700">
                    Alternate Number: {order.order_Id.address.alternatePhone}
                  </p>
                )}
                <p className="text-gray-700">
                  Payment Method: {order.order_Id.paymentStatus}
                </p>
                <p className="text-gray-700">
                  Shipping Status: {order.order_Id.shippingStatus}
                </p>
              </div>
              {order.paymentStatus === "Failed" ? (
                <div className="pl-4 flex items-center">
                  <p className="text-red-500 text-xl mr-2">Payment Failed</p>
                  <ImCross className="text-red-500 w-8 h-8" />
                </div>
              ) : (
                <div className=" pl-4">
                  {order.shippingStatus === "pending" && (
                    <div>
                      <div className="flex items-center">
                        <p className="text-gray-900 text-xl mr-2 mb-2">
                          Confirm Order
                        </p>
                        <IoIosCheckmarkCircleOutline className="mb-2 text-grey-500 w-12 h-12 cursor-pointer" onClick={()=>{changeStatusHandler(order._id,"confirmed")}}/>
                      </div>
                      <div className="flex items-center">
                        <p className="text-gray-900 text-xl mr-2">
                          Cancel Order
                        </p>
                        <ImCross className="text-grey-500 w-8 h-8 cursor-pointer" onClick={()=>{changeStatusHandler(order._id,"cancelled")}} />
                      </div>
                    </div>
                  )}
                  {order.shippingStatus === "cancelled" && (
                    <div className="flex items-center">
                      <p className="text-gray-900 text-xl mr-2">
                        Order Already Cancelled
                      </p>
                      <ImCross className="text-red-500 w-8 h-8" />
                    </div>
                  )}
                  {order.shippingStatus === "confirmed" && (
                    <div>
                      <div className="flex items-center">
                        <p className="text-gray-900 text-xl mr-2">
                          Order Already Confirmed
                        </p>
                        <MdOutlineEmojiEmotions className="text-green-500 w-12 h-12" />
                      </div>
                      <div className="flex items-center">
                        <p className="text-gray-900 text-xl mr-2">
                          Order Shipped?
                        </p>
                        <IoIosCheckmarkCircleOutline className="text-grey-500 w-12 h-12 cursor-pointer" onClick={()=>{changeStatusHandler(order._id,"shipped")}}/>
                      </div>
                    </div>
                  )}
                  {order.shippingStatus === "shipped" && (
                    <div>
                      <div className="flex items-center">
                        <p className="text-gray-900 text-xl mr-2">
                          Order Already Confirmed
                        </p>
                        <MdOutlineEmojiEmotions className="text-green-500 w-12 h-12" />
                      </div>
                      <div className="flex items-center">
                        <p className="text-gray-900 text-xl mr-2">
                          Order Already Shipped
                        </p>
                        <MdOutlineEmojiEmotions className="text-green-500 w-12 h-12" />
                      </div>
                    </div>
                  )}
                  {order.shippingStatus === "delivered" && (
                    <div>
                      <div className="flex items-center">
                        <p className="text-gray-900 text-xl mr-2">
                          Order Already Confirmed
                        </p>
                        <MdOutlineEmojiEmotions className="text-green-500 w-12 h-12" />
                      </div>
                      <div className="flex items-center">
                        <p className="text-gray-900 text-xl mr-2">
                          Order Already Shipped
                        </p>
                        <MdOutlineEmojiEmotions className="text-green-500 w-12 h-12" />
                      </div>
                      <div className="flex items-center">
                        <p className="text-gray-900 text-xl mr-2">
                          Order Already Delivered
                        </p>
                        <MdOutlineEmojiEmotions className="text-green-500 w-12 h-12" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SellerMyOrders;
