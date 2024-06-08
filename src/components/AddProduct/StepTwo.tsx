import React, { useState } from "react";
import GradiantButton from "../Button/GradiantButton";
import {
  IPartFormSubmitDataStepOne,
  IPartFormSubmitDataStepTwo,
  imageType,
} from "@/interfaces/form";
import Image from "next/image";

const StepTwo = ({
  submitPartForm,
  images,
}: {
  submitPartForm: (
    fromStep: 1|2,
    formData: IPartFormSubmitDataStepOne | IPartFormSubmitDataStepTwo
  ) => void;
  images: imageType;
}) => {
  const [selectedImage, setSelectedImage] = useState<{localPath: string, serverPath: string}|null>();
  const [error, setError] = useState<string>("");
  const priceRef = React.useRef<HTMLInputElement>(null);
  const oriPriceRef = React.useRef<HTMLInputElement>(null);
  const quantityRef = React.useRef<HTMLInputElement>(null);
  function changePrimaryImageHandler(
    e: React.MouseEvent<HTMLDivElement>,
    image: {localPath: string, serverPath: string}
  ) {
    e.preventDefault();
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  }
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const price=Number(priceRef.current?.value)
    const oriPrice=Number(oriPriceRef.current?.value)
    const quantity=Number(quantityRef.current?.value)
    if (!priceRef.current?.value) {
      setError("Price is required");
      return;
    }
    if (!oriPriceRef.current?.value) {
      setError("Original Price is required");
      return;
    }
    if (!quantityRef.current?.value) {
      setError("Quantity is required");
      return;
    }
    if (!selectedImage) {
      setError("Select Primary image");
      return;
    }
    if(price>oriPrice){
      setError("original price should be greater than Price")
      return
    }
    const formData: IPartFormSubmitDataStepTwo = {
      mainImage: selectedImage,
      price: price,
      oriPrice: oriPrice,
      quantity: quantity
    };
    submitPartForm(2,formData)
  }
  return (
    <div className="mt-7">
      <form className="m-4" onSubmit={submitHandler}>
        <div className="mb-5 flex justify-between flex-col md:flex-row">
          <div style={{ flex: "1" }} className="md:mr-2">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Price
            </label>
            <input
              ref={priceRef}
              type="number"
              id="price"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Rs."
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
              ref={oriPriceRef}
              type="number"
              id="oriPrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Rs."
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
            ref={quantityRef}
            type="number"
            id="quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Piece"
          />
        </div>
        <p className="block mb-2 text-sm font-medium text-gray-900">
          Select one primary image
        </p>
        <div className="p-2">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={(e) => {
                changePrimaryImageHandler(e, image);
              }}
              className="cursor-pointer bg-gray-100 rounded-lg shadow-md mt-2 flex justify-center "
            >
              <Image
                width={140}
                height={140}
                src={image.localPath}
                alt={image.localPath}
                className={`bg-gray-100 rounded-lg shadow-inner p-2 mt-2 ${
                  selectedImage?.serverPath === image.serverPath && "ring-2 ring-blue-400"
                }`}
              />
            </div>
          ))}
        </div>
        {error && <p className="text-red-600 block mb-2 text-sm font-medium">{error}</p>}
        <GradiantButton className="w-full mt-1" type="submit">
          Next
        </GradiantButton>
      </form>
    </div>
  );
};

export default StepTwo;
