"use client"

import { useRouter } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";
const GoBackButton = ({
  className,
}: {
  className?: string;
}) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className={` text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${className}`}
      onClick={() => {
        router.back();
      }}
    >
      <div className="flex items-center">
        <MdOutlineArrowBack className="mr-2" />
        <span>Go Back</span>
      </div>
    </button>
  );
};

export default GoBackButton;
