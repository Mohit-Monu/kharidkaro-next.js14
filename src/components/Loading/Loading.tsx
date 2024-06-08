import React from "react";
import { FaHandPaper } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-white z-50">
      <div className="animate-waving-hand opacity-100 transform translate-y-0 duration-300">
        <FaHandPaper className="w-24 h-24" />
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
        <p className="text-sm text-gray-500">We are preparing your content.</p>
      </div>
    </div>
  );
};

export default Loading;
