import { IProduct } from "./product";

export interface IOrderState {
  name: string;
  phone: number;
  alternateNo: number;
  address: string;
  city: string;
  state: StateType;
  pincode: number;
}
export interface IMyOrdersResponse {
  address: IAddress;
  createdAt: string;
  orderProduct_Ids: IOrderProduct[];
  paymentStatus: string;
  shippingStatus: string;
  total: {
    originalPrice: number;
    payingAmount: number;
    price: number;
    shippingCost: number;
  };
  updatedAt: string;
  user_Id: string;
  _id: string;
  __v: number;
}
export interface IAddress {
  address: string;
  city: string;
  name: string;
  phone: number;
  pincode: number;
  state: StateType;
  alternatePhone?: number;
}
export interface IOrderProduct {
  Product_Id: IProduct;
  createdAt: string;
  order_Id: string;
  paymentStatus: string;
  shippingStatus: string;
  price: number;
  quantity: number;
  seller_Id: string;
  updatedAt: string;
  user_Id: string;
  __v: number;
  _id: string;
}
export interface IOrderSeller {
  Product_Id: IProduct;
  createdAt: string;
  order_Id: {
    address: IAddress;
    createdAt: string;
    orderProduct_Ids: string[];
    paymentStatus: string;
    shippingStatus: string;
    total: {
      originalPrice: number;
      payingAmount: number;
      price: number;
      shippingCost: number;
    };
    updatedAt: string;
    user_Id: string;
    _id: string;
    __v: number;
  };
  paymentStatus: string;
  shippingStatus: string;
  price: number;
  quantity: number;
  seller_Id: string;
  updatedAt: string;
  user_Id: string;
  __v: number;
  _id: string;
}
export type StateType =
  | "Andra Pradesh"
  | "Arunachal Pradesh"
  | "Assam"
  | "Bihar"
  | "Chhattisgarh"
  | "Goa"
  | "Gujarat"
  | "Haryana"
  | "Himachal Pradesh"
  | "Jharkhand"
  | "Karnataka"
  | "Kerala"
  | "Madhya Pradesh"
  | "Maharashtra"
  | "Manipur"
  | "Meghalaya"
  | "Mizoram"
  | "Nagaland"
  | "Odisha"
  | "Punjab"
  | "Rajasthan"
  | "Sikkim"
  | "Tamil Nadu"
  | "Telangana"
  | "Tripura"
  | "Uttarakhand"
  | "Uttar Pradesh"
  | "West Bengal";
