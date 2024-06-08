import Link from "next/link";
import React, { useEffect, useState } from "react";
import GradiantButton from "../Button/GradiantButton";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "next-auth/react";
import axios from "axios";
import useStore from "@/lib/store";

const BuyerHeader = () => {
  const [nav, setNav] = useState(false);
  const links: { id: string; link: string }[] = [
    {
      id: "/buyer/my-cart",
      link: "My Cart",
    },
    {
      id: "/buyer/my-wishlist",
      link: "My Wishlist",
    },
    {
      id: "/buyer/profile",
      link: "Profile",
    },
    {
      id:"/buyer/my-order",
      link:"My Orders"
    }
  ];
  const loadWishList=useStore((state)=>state.loadWishList)
  useEffect(() => {
    loadWishList()
  },[loadWishList])
  return (
    <div
      style={{ height: "50px" }}
      className="flex justify-between items-center w-full px-2 text-white bg-black "
    >
      <div>
        <h1 className="text-2xl font-signature ml-2">
          <Link className="link-underline link-underline-black" href="/">
            Kharid Karo
          </Link>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={id}>{link}</Link>
          </li>
        ))}
      </ul>
      <GradiantButton OnClick={() => signOut()} className="hidden md:flex">
        Logout
      </GradiantButton>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={20} /> : <FaBars size={20} />}
      </div>

      {nav && (
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          <div className="text-center">
            <GradiantButton
              OnClick={() => {
                signOut();
                setNav(!nav);
              }}
            >
              Logout
            </GradiantButton>

            <ul>
              {links.map(({ id, link }) => (
                <li
                  key={id}
                  className="cursor-pointer capitalize py-4 text-2xl"
                >
                  <Link onClick={() => setNav(!nav)} href={id}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default BuyerHeader;
