"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SimpleHeader from "./SimpleHeader";
import SellerHeader from "./SellerHeader";
import BuyerHeader from "./BuyerHeader";
import Loading from "../Loading/Loading";
import useStore from "@/lib/store";
const Header = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession();
  const loadingStatus = useStore((state) => state.loading);
  const HeaderToShow =
    status === "loading" ? (
      <Loading />
    ) : status === "unauthenticated" ? (
      <SimpleHeader />
    ) : data?.user?.role === "seller" ? (
      <SellerHeader />
    ) : (
      <BuyerHeader />
    );
  return (
    <>
      {
        <>
          {loadingStatus && <Loading />}
          {HeaderToShow}
        </>
      }
      {children}
    </>
  );
};

export default Header;
