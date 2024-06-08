"use client";
import { IMyOrdersResponse } from "@/interfaces/order";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MyAllOrders from "../MyAllOrders/MyAllOrders";
const MyOrders = () => {
  const [myOrders, setMyOrders] = useState<IMyOrdersResponse[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response=await axios.get("/api/buyer/order")
      setMyOrders(response.data.data)
    }

    fetchData();
  }, []);
  console.log(myOrders)
  return myOrders.length>0?(
    <div>
      <MyAllOrders myOrders={myOrders}/>
    </div>
  ):(
    <div className="flex h-screen items-center justify-center">
      <p className="text-center text-xl font-bold text-red-700">
        Your Cart is empty
      </p>
    </div>
  )
  
};

export default MyOrders;
