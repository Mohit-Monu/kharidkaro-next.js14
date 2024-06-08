import Link from "next/link";
import React, { useState } from "react";
import GradiantButton from "../Button/GradiantButton";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
const SimpleHeader = () => {
  const router = useRouter();
  const [nav, setNav] = useState(false);
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

    <GradiantButton
        OnClick={() => router.push("/authenticate")}
        className="hidden md:flex"
      >
        Login
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
                router.push("/authenticate");

                setNav(!nav);
              }}
            >
              Login
            </GradiantButton>

            </div>
        </div>
      )}
    </div>
  );
};

export default SimpleHeader;
