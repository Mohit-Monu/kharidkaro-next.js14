import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBarDropdown = ({
  setPage,
}: {
  setPage: (page?: number, category?: string, title?: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState("All Categories");
  const allCategories = [
    "All Categories",
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
    "Other",
  ];
  const handleCategoryChange = (category: string) => {
    setQuery("");
    setCategory(category);
    setPage(undefined, category, undefined);
    setDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(undefined, category, query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row relative p-2"
    >
      <div className="relative mb-1 sm:mb-0 sm:mr-1 flex-grow ">
        <button
          type="button"
          onClick={() => setDropdown(!dropdown)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl w-full md:w-auto "
        >
          {category}
        </button>
        {dropdown && (
          <ul
            className="absolute bg-white border border-gray-300 rounded-xl mt-1 py-1 w-full max-h-60 overflow-y-auto shadow-lg z-20"
            style={{ maxHeight: "200px" }}
          >
            {allCategories.map((cate) => (
              <li
                key={cate}
                onClick={() => handleCategoryChange(cate)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer w-full"
              >
                {cate}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-grow w-full ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="py-2 w-full px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent border border-gray-300 mb-0 mr-1"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl"
        >
          <IoSearch className="w-8 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBarDropdown;
