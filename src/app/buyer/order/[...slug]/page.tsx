import PlaceOrderProduct from "@/components/PlaceOrderProduct/PlaceOrderProduct";
import React from "react";

const page = ({ params }: { params: { slug: string[] } }) => {
  return <PlaceOrderProduct product={params.slug} />
};

export default page;
