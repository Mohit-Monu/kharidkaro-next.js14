"use client";
import React, { useState } from "react";
import StepOne from "./StepOne";
import SideBar from "./SideBar";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import {
  IPartFormSubmitDataStepOne,
  IPartFormSubmitDataStepTwo,
  formDetailsType,
} from "@/interfaces/form";
import DialogWindow from "@/components/DialogWindow/DialogWindow";
import { SiTicktick } from "react-icons/si";
import { MdSmsFailed } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import useStore from "@/lib/store";
const AddProductForm = () => {
  const [step, setStep] = useState(1);
  const [formDetails, setFormDetails] = useState<formDetailsType>({
    title: "",
    description: "",
    categories: "",
    mainImage: { localPath: "", serverPath: "" },
    price: 0,
    oriPrice: 0,
    quantity: 0,
    image: [],
  });
  const [dialog, setDialog] = useState(false);
  const [dialogData, setDialogData] = useState(<></>);
  const router = useRouter();
  const toggleLoading = useStore((state) => state.changeLoading);
  function submitPartForm(
    fromStep: 1 | 2,
    formData: IPartFormSubmitDataStepOne | IPartFormSubmitDataStepTwo
  ) {
    if (fromStep === 1) {
      setFormDetails((prevData) => {
        return { ...prevData, ...formData };
      });
      setStep(2);
    }
    if (fromStep === 2) {
      setFormDetails((prevData) => {
        return { ...prevData, ...formData };
      });
      setStep(3);
    }
  }
  async function submitForm() {
    // toggleLoading();
    const mImage = formDetails.mainImage.serverPath;
    const AImage = formDetails.image.map((image) => image.serverPath);
    const response = await axios.post(
      "/api/seller/addProduct",
      { ...formDetails, mainImage: mImage, image: AImage }
    );
    // if (response.status === 200) {
    //   toggleLoading();
    //   setDialog(true);
    //   setDialogData(
    //     <DialogWindow
    //       Image={
    //         <SiTicktick className="w-16 h-16 flex items-center text-green-500 mx-auto" />
    //       }
    //       head="Product Added"
    //       title="Your prouct have been added successfully."
    //     >
    //       <button
    //         onClick={() => {
    //           router.push("/seller");
    //         }}
    //         className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
    //       >
    //         Home
    //       </button>
    //     </DialogWindow>
    //   );
    // } else {
    //   toggleLoading();
      
    //   setDialog(true);
    //   setDialogData(
    //     <DialogWindow
    //       Image={
    //         <MdSmsFailed className="w-16 h-16 flex items-center text-red-500 mx-auto" />
    //       }
    //       head="Added failed"
    //       title="Failed to add the product try again later."
    //     >
    //       <button
    //         onClick={() => {
    //           router.push("/seller");
    //         }}
    //         className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
    //       >
    //         Home
    //       </button>
    //     </DialogWindow>
    //   );
    // }
  }
  return dialog ? (
    dialogData
  ) : (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="md:w-2/5 pb-4 md:mb-0 border-b md:border-b-0 md:border-r border-gray-500 md:border-gray-500">
        <SideBar setStep={setStep} currentStep={step} />
      </div>
      <div className="md:w-3/5">
        {step === 1 && <StepOne submitPartForm={submitPartForm} />}
        {step === 2 && (
          <StepTwo submitPartForm={submitPartForm} images={formDetails.image} />
        )}
        {step === 3 && (
          <StepThree formDetails={formDetails} submitForm={submitForm} />
        )}
      </div>
    </div>
  );
};

export default AddProductForm;
