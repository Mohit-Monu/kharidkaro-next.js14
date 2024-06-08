"use client";
import GradiantButton from "@/components/Button/GradiantButton";
import { CategoryType } from "@/interfaces/form";
import { IProduct } from "@/interfaces/product";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DialogWindow from "../DialogWindow/DialogWindow";
import { MdSmsFailed } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { notFound, useRouter } from "next/navigation";
import useStore from "@/lib/store";

const EditProducts = ({ params }: { params: { slug: string } }) => {
  const [formDetails, setFormDetails] = useState<IProduct>();
  const [dialog, setDialog] = useState(false);
  const router = useRouter();
  const [dialogData, setDialogData] = useState(<></>);
  const toggleLoading = useStore((state) => state.changeLoading);
  const [error, setError] = useState("");

  useEffect(() => {
  
    async function fetchData() {
      toggleLoading();
      try{
        const response = await axios.get(`/api/seller/addProduct`, {
          params: {
            slug: params.slug,
          },
        });
        setFormDetails(response.data.data);
      toggleLoading();
        
      }catch{
      toggleLoading();
        router.push("/seller/edit-products")
      }
    }
    fetchData();
  }, [params.slug,router,toggleLoading]);

  async function submitForm() {
    if (!formDetails) {
      setError("No data found");
      return;
    }
    if (!formDetails.title) {
      setError("Title is required");
      return;
    }
    if (!formDetails.description) {
      setError("Description is required");
      return;
    }
    if (!formDetails.categories) {
      setError("Category is required");
      return;
    }
    if (!formDetails.mainImage) {
      setError("Image is required");
      return;
    }
    if (!formDetails.price) {
      setError("Price is required");
      return;
    }
    if (!formDetails.oriPrice) {
      setError("Original Price is required");
      return;
    }
    if (!formDetails.quantity) {
      setError("Quantity is required");
      return;
    }
    toggleLoading();
    const response = await axios.put(`/api/seller/addProduct`, formDetails, {
      params: {
        Product_Id: params.slug,
      },
    });
    if (response.status === 200) {
      toggleLoading();
      setDialog(true);
      setDialogData(
        <DialogWindow
          Image={
            <SiTicktick className="w-16 h-16 flex items-center text-green-500 mx-auto" />
          }
          head="Product Edited"
          title="Your prouct have been Edited successfully."
        >
          <button
            onClick={() => {
              router.push("/seller");
            }}
            className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
          >
            Home
          </button>
        </DialogWindow>
      );
    } else {
      toggleLoading();

      setDialog(true);
      setDialogData(
        <DialogWindow
          Image={
            <MdSmsFailed className="w-16 h-16 flex items-center text-red-500 mx-auto" />
          }
          head="Editing failed"
          title="Failed to Edit the product try again later."
        >
          <button
            onClick={() => {
              router.push("/seller");
            }}
            className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
          >
            Home
          </button>
        </DialogWindow>
      );
    }
  }

  return dialog ? (
    dialogData
  ) : (
    <div className="m-4 mt-7">
      {formDetails && (
        <>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Product Title
            </label>
            <input
              value={formDetails?.title}
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Product Name"
              onChange={(e) =>
                setFormDetails({ ...formDetails, title: e.target.value })
              }
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
              value={formDetails?.description}
              onChange={(e) =>
                setFormDetails({ ...formDetails, description: e.target.value })
              }
              id="description"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Product Description in detail"
            ></textarea>
          </div>
          <div className="mb-5">
            <label
              htmlFor="categories"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Category
            </label>
            <select
              onChange={(e) =>
                setFormDetails({
                  ...formDetails,
                  categories: e.target.value as CategoryType,
                })
              }
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="formDetails?.categories">
                {formDetails?.categories}
              </option>
              <option value="Digital services">Digital services</option>
              <option value="Cosmetics and body care">
                Cosmetics and body care
              </option>
              <option value="Food and beverages">Food and beverages</option>
              <option value="Furniture and decor">Furniture and decor</option>
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Household items">Household items</option>
              <option value="Jewelry and accessories">
                Jewelry and accessories
              </option>
              <option value="Pet supplies">Pet supplies</option>
              <option value="Sports and leisure">Sports and leisure</option>
              <option value="Toys and games">Toys and games</option>
              <option value="Other">Other</option>
            </select>
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
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    price: Number(e.target.value),
                  })
                }
                value={formDetails?.price}
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
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    oriPrice: Number(e.target.value),
                  })
                }
                value={formDetails?.oriPrice}
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
              onChange={(e) =>
                setFormDetails({
                  ...formDetails,
                  quantity: Number(e.target.value),
                })
              }
              value={formDetails?.quantity}
              type="number"
              id="quantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Piece"
            />
          </div>
          <p className="block mb-2 text-sm font-medium text-gray-900">
            Product primary image
          </p>
          <div className="p-2">
            <div
              key={formDetails?.mainImage}
              className=" bg-gray-100 rounded-lg shadow-md mt-2 flex justify-center "
            >
              <Image
                width={140}
                height={140}
                src={formDetails?.mainImage}
                alt={formDetails?.mainImage}
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
                key={img}
                className=" bg-gray-100 rounded-lg shadow-md mt-2 flex justify-center cursor-pointer"
                onClick={() =>
                  setFormDetails({ ...formDetails, mainImage: img })
                }
              >
                <Image
                  width={140}
                  height={140}
                  src={img}
                  alt={img}
                  className={`bg-gray-100 rounded-lg shadow-inner p-2 mt-2`}
                />
              </div>
            ))}
          </div>
          {error && (
            <p className="text-red-600 block mb-2 text-sm font-medium">
              {error}
            </p>
          )}

          <GradiantButton
            className="w-full mt-1"
            type="submit"
            OnClick={submitForm}
          >
            Confirm
          </GradiantButton>
        </>
      )}
    </div>
  );
};

export default EditProducts;
