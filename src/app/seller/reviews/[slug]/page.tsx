import SellerReviews from "@/components/Seller/SellerReviews";
import React from "react";

const SeePrviews = ({ params }: { params: { slug: string } }) => {

  return (
    <div>
      <SellerReviews productId={params.slug}/>
    </div>
  );
};

export default SeePrviews;
