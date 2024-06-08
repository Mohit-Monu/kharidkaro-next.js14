import React, { useState } from "react";
import { IMyOrdersResponse } from "@/interfaces/order";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";

const MyAllOrders = ({ myOrders }: { myOrders: IMyOrdersResponse[] }) => {
  const router = useRouter();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="p-4">
      {myOrders.map((order) => (
        <div key={order._id} className="bg-white shadow-xl rounded-lg p-4 m-3">
          <div className="mb-2">
            {order.paymentStatus === "Failed" ? (
              <p className="text-red-500">Payment Failed</p>
            ) : (
              <p className="text-green-500">{order.paymentStatus}</p>
            )}
            <p className="font-semibold">Order ID: {order._id}</p>
          </div>
          <div>
            {order.orderProduct_Ids.map((orderProduct) => (
              <div
                key={orderProduct._id}
                className="flex items-center mb-4 md:mb-2"
              >
                <div className="flex-shrink-0">
                  <Image
                    onClick={() =>
                      router.push(
                        `/buyer/product/${orderProduct.Product_Id._id}`
                      )
                    }
                    src={orderProduct.Product_Id.mainImage}
                    alt={orderProduct.Product_Id.title}
                    width={100}
                    height={100}
                    className="rounded-lg cursor-pointer"
                  />
                </div>
                <div className="ml-4 w-full sm:w-auto">
                  <h3 className="font-medium text-lg">
                    {orderProduct.Product_Id.title}
                  </h3>
                  <div className="mt-2 sm:flex sm:space-x-4">
                    <p className="text-gray-600">
                      Price: Rs.{orderProduct.price}
                    </p>
                    <p className="text-gray-600">
                      Quantity: {orderProduct.quantity}
                    </p>
                    <p className="font-semibold">
                      Total: Rs.{orderProduct.quantity * orderProduct.price}
                    </p>
                  </div>
                  <div className="mt-2 sm:flex sm:space-x-4">
                    {orderProduct.shippingStatus === "Delivered" && (
                      <p className="text-green-600">
                        {orderProduct.shippingStatus}
                      </p>
                    )}
                    {orderProduct.shippingStatus === "pending" && (
                      <p className="text-yellow-600">
                        {orderProduct.shippingStatus}
                      </p>
                    )}
                    {orderProduct.shippingStatus === "cancelled" && (
                      <p className="text-red-600">
                        {orderProduct.shippingStatus}
                      </p>
                    )}
                    {orderProduct.shippingStatus === "shipped" && (
                      <p className="text-blue-600">
                        {orderProduct.shippingStatus}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
            <div className="mt-4 p-4 border-t border-gray-200">
              <p className="text-gray-700">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                Shipping Address:{" "}
                {order.address.address +
                  ", " +
                  order.address.city +
                  ", " +
                  order.address.state +
                  ", " +
                  order.address.pincode +
                  ", " +
                  order.address.name}
              </p>
              <p className="text-gray-700">
                Payment Method: {order.paymentStatus}
              </p>
              <p className="text-gray-700">
                Shipping charges Rs.{order.total.shippingCost}
              </p>

              <p className="text-gray-700">
                Total Amount Paid: Rs.{order.total.payingAmount}
              </p>

              <p className="text-gray-700">
                Shipping Status: {order.shippingStatus}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyAllOrders;
