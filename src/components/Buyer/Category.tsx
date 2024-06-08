"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Category = () => {
  const router = useRouter();
  const allCategory = [
    "Digital services",
    "Cosmetics and body care",
    "Food and beverages",
    "Furniture and decor",
    "Health and Wellness",
    "Household items",
    "Jewelry and accessories",
    "Pet supplies",
    "Sports and leisure",
    "Toys and games",
    "Others",
  ];

  return (
    <div className="overflow-x-auto min-w-full">
      <div className="flex flex-nowrap justify-start">
        {allCategory.map((category) => (
          <div
            key={category}
            className="m-1 border rounded-lg shadow-md flex flex-col items-center p-1 cursor-pointer"
            onClick={() =>
              router.push(`/buyer/category/${encodeURIComponent(category)}`)
            }
          >
            <div style={{ width: "6rem" }} className="h-20 relative">
              <Image src={`/images/category/${category}.jpg`} alt={category} fill  sizes="(max-width: 640px) 100vw, 50vw" priority/>
            </div>
            <p className="text-sm mt-1 text-center overflow-hidden" style={{ maxWidth: "6rem" }}>
              {category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
