import React from "react";
import GradiantButton from "@/components/Button/GradiantButton";
import UploadImgae from "./UploadImgae";
import {
  CategoryType,
  IPartFormSubmitDataStepOne,
  IPartFormSubmitDataStepTwo,
  imageType,
} from "@/interfaces/form";
const StepOne = ({
  submitPartForm,
}: {
  submitPartForm: (
    fromStep: 1|2,
    formData: IPartFormSubmitDataStepOne | IPartFormSubmitDataStepTwo
  ) => void;
}) => {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const [categories, setCategories] = React.useState<CategoryType | "">("");
  const [images, setImages] = React.useState<imageType>([]);
  const [error, setError] = React.useState<string>("");
  const [imageProcessing, setImageProcessing] = React.useState<boolean>(false);
  function formSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!description) {
      setError("Description is required");
      return;
    }
    if (categories?.length === 0) {
      setError("Category is required");
      return;
    }
    if (images.length === 0) {
      setError("Image is required");
      return;
    }
    const formData: IPartFormSubmitDataStepOne = {
      title,
      description,
      categories,
      image: images,
    };
    submitPartForm(1, formData);
  }
  return (
    <div className="mt-7">
      <form className="m-4 " onSubmit={formSubmitHandler}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Product Title
          </label>
          <input
            ref={titleRef}
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product Name"
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
            ref={descriptionRef}
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
            Select product category
          </label>
          <select
            onChange={(e) => setCategories(e.target.value as CategoryType)}
            id="categories"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select</option>
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
        {/* <CaptureImage /> */}
        <UploadImgae sendImageLink={setImages} underProgress={setImageProcessing}/>
        {error && <p className="text-red-600 block mb-2 text-sm font-medium">{error}</p>}
        <GradiantButton className="w-full mt-1" type="submit" disabled={imageProcessing}>
          {imageProcessing ? 'Processing...' : 'Next'}
        </GradiantButton>
      </form>
    </div>
  );
};

export default StepOne;
