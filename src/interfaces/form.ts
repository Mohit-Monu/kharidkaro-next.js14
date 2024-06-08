export interface IPartFormSubmitDataStepOne {
  title: string;
  description: string;
  categories: CategoryType;
  image: imageType;
}
export interface IPartFormSubmitDataStepTwo {
  mainImage: { localPath: string; serverPath: string };
  price: number;
  oriPrice: number;
  quantity: number;
}
export interface IPostFormDetails {
  title: string;
  description: string;
  categories: CategoryType;
  mainImage: string;
  price: number;
  oriPrice: number;
  quantity: number;
  image: string[];
}
export type formDetailsType = IPartFormSubmitDataStepOne &
  IPartFormSubmitDataStepTwo;
export type imageType = { localPath: string; serverPath: string }[];
export type CategoryType =
  | "Digital service"
  | "Cosmetics and body care"
  | "Food and beverages"
  | "Furniture and decor"
  | "Health and Wellness"
  | "Household items"
  | "Jewelry and accessories"
  | "Pet supplies"
  | "Sports and leisure"
  | "Toys and games"
  | "Others"
  | "";
