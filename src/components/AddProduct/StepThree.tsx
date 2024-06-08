import { formDetailsType } from "@/interfaces/form";
import Image from "next/image";
import React from "react";
import GradiantButton from "../Button/GradiantButton";

interface StepThreeProps {
  formDetails: formDetailsType;
  submitForm: () => Promise<void>;
}
const StepThree: React.FC<StepThreeProps> = ({ formDetails, submitForm }) => {
  return (
    <div className="m-4 mt-7">
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Product Title
        </label>
        <input
          value={formDetails.title}
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Product Name"
          disabled
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Product Description
        </label>
        <textarea
          value={formDetails.description}
          id="description"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Product Description in detail"
          disabled
        ></textarea>
      </div>
      <div className="mb-5">
        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Product Category
        </label>
        <input
          value={formDetails.categories}
          id="categories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled
        />
      </div>
      <div className="mb-5 flex justify-between flex-col md:flex-row">
        <div style={{ flex: "1" }} className="md:mr-2">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Product Price
          </label>
          <input
            value={formDetails.price}
            type="number"
            id="price"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Rs."
            disabled
          />
        </div>
        <div style={{ flex: "1" }} className="md:ml-2">
          <label
            htmlFor="oriPrice"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Original Price
          </label>
          <input
            value={formDetails.oriPrice}
            type="number"
            id="oriPrice"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Rs."
            disabled
          />
        </div>
      </div>
      <div className="mb-5">
        <label
          htmlFor="quantity"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Total quantity
        </label>
        <input
          value={formDetails.quantity}
          type="number"
          id="quantity"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Piece"
          disabled
        />
      </div>
      <p className="block mb-2 text-sm font-medium text-gray-900">
        Product primary image
      </p>
      <div className="p-2">
        <div
          key={formDetails.mainImage.serverPath}
          className=" bg-gray-100 rounded-lg shadow-md mt-2 flex justify-center "
        >
          <Image
            width={140}
            height={140}
            src={formDetails.mainImage.localPath}
            alt={formDetails.mainImage.localPath}
            className={`bg-gray-100 rounded-lg shadow-inner p-2 mt-2 ring-2 ring-blue-400`}
          />
        </div>
      </div>
      <p className="block mb-2 text-sm font-medium text-gray-900">
        Product image
      </p>
      <div className="p-2">
        {formDetails.image.map((img) => (
          <div
            key={img.serverPath}
            className=" bg-gray-100 rounded-lg shadow-md mt-2 flex justify-center "
          >
            <Image
              width={140}
              height={140}
              src={img.localPath}
              alt={img.localPath}
              className={`bg-gray-100 rounded-lg shadow-inner p-2 mt-2`}
            />
          </div>
        ))}
      </div>
      <GradiantButton className="w-full mt-1" type="submit" OnClick={submitForm}>
        Confirm
      </GradiantButton>
    </div>
  );
};

export default StepThree;
