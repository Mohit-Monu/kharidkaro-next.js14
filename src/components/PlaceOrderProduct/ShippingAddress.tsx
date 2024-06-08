import { IOrderState } from "@/interfaces/order";
import React from "react";

const ShippingAddress = ({
  setShippingOrderAddress,
  initialValue,
}: {
  setShippingOrderAddress: Function;
  initialValue?: IOrderState;
}) => {
  const states = [
    "Andra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
  ];
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Name<label className="text-red-500">*</label>
        </label>
        <input
          type="text"
          onChange={(e) => {
            setShippingOrderAddress((prev: IOrderState) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
          value={initialValue?.name}
          id="name"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your Name"
        />
      </div>
      <div className="sm:flex w-full">
        <div className="sm:mr-4 mb-4 flex-1">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone no<label className="text-red-500">*</label>
          </label>
          <input
            id="phone"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setShippingOrderAddress((prev: IOrderState) => ({
                  ...prev,
                  phone: Number(e.target.value),
                }));
              }
            }}
            value={initialValue?.phone || ""}
            type="text"
            className="block p-2.5 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Phone no"
          />
        </div>
        <div className="mb-4 flex-1">
          <label
            htmlFor="AlternameNo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Altername No
          </label>
          <input
            id="AlternameNo"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setShippingOrderAddress((prev: IOrderState) => ({
                  ...prev,
                  alternateNo: Number(e.target.value),
                }));
              }
            }}
            value={initialValue?.alternateNo || ""}
            type="text"
            className="block p-2.5 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Altername No"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Shipping Address<label className="text-red-500">*</label>
        </label>
        <textarea
          id="address"
          onChange={(e) => {
            setShippingOrderAddress((prev: IOrderState) => ({
              ...prev,
              address: e.target.value,
            }));
          }}
          value={initialValue?.address}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your Shipping Address"
        ></textarea>
      </div>
      <div className="sm:flex w-full">
        <div className="sm:mr-4 mb-4 flex-1">
          <label
            htmlFor="PinCode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Pin<label className="text-red-500">*</label>
          </label>
          <input
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)&&value.length<=6) {
                setShippingOrderAddress((prev: IOrderState) => ({
                  ...prev,
                  pincode: Number(e.target.value),
                }));
              }
            }}
            value={initialValue?.pincode || ""}
            id="PinCode"
            type="text"
            className="block p-2.5 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Pin"
          />
        </div>
        <div className="mb-4 flex-1">
          <label
            htmlFor="City"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter City<label className="text-red-500">*</label>
          </label>
          <input
            onChange={(e) => {
              setShippingOrderAddress((prev: IOrderState) => ({
                ...prev,
                city: e.target.value,
              }));
            }}
            value={initialValue?.city}
            id="City"
            type="text"
            className="block p-2.5 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter City"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="states"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select State<label className="text-red-500">*</label>
        </label>
        <select
          id="states"
          onChange={(e) => {
            setShippingOrderAddress((prev: IOrderState) => ({
              ...prev,
              state: e.target.value,
            }));
          }}
          value={initialValue?.state}
          className="block p-2.5 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue={""}>Choose a state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShippingAddress;
