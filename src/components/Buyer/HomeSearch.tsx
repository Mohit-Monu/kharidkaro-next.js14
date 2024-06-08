"use client";
import { IProduct } from "@/interfaces/product";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent } from "react";

const HomeSearch = () => {
  const router=useRouter()
  const [value, setValue] = useState<string>("");
  const [suggestionsList, setSuggestionsList] = useState<IProduct[]>([]);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios(`/api/buyer/search?query=${query}`);
      const data = response.data.data;
      setSuggestionsList(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;
    setValue(newValue);
    if (newValue.length === 0) {
      setSuggestionsList([]);
      return;
    }
    fetchSuggestions(newValue);
  };

  const setProductHandler = (product: IProduct) => {
    setValue(product.title);
    setSuggestionsList([]);
    router.push(`/buyer/product/${product._id}`)
  }
  return (
    <div className="flex flex-col w-full mx-auto mt-1 p-3" >
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
    <ul className="mt-2">
      {suggestionsList.map((suggestion: IProduct, index: number) => (
        <li
          key={index}
          className="flex items-center px-4 py-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
          onClick={() =>{ setProductHandler(suggestion)}}
        >
          <Image
            src={suggestion.mainImage}
            alt={suggestion.title}
            className="mr-4"
            width={22}
            height={22}
          />
          <span className="flex-grow">{suggestion.title}</span>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default HomeSearch;
