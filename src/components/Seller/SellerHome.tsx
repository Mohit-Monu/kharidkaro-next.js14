"use client";
import React from "react";
import { useSession } from "next-auth/react";
const SellerHome = () => {
  const { status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
  <div>
    <div>SellerHome</div>
  </div>
  
  );
};

export default SellerHome;
