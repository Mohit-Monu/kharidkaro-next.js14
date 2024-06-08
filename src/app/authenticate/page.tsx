"use client";
import SellerLogin from "@/components/Login/SellerLogin";
import UserLogin from "@/components/Login/BuyerLogin";
import SellerSignup from "@/components/SignUp/SellerSignup";
import UserSignup from "@/components/SignUp/BuyerSignup";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Login = () => {
  const { data } = useSession();
  const [pageTypeNo, setPageTypeNo] = useState(0);

  useEffect(() => {
    if (data) {
      redirect("/");
    }
  }, [data]);
  function togglePageType(num: number) {
    setPageTypeNo(num);
  }
  const arr = [
    <UserLogin key={0} togglePageType={togglePageType} />,
    <UserSignup key={1} togglePageType={togglePageType} />,
    <SellerLogin key={2} togglePageType={togglePageType} />,
    <SellerSignup key={3} togglePageType={togglePageType} />,
  ];
  return arr[pageTypeNo];
};

export default Login;
