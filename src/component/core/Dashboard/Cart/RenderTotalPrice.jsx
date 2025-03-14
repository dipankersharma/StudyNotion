import React from "react";
import { useSelector } from "react-redux";
import Iconbutton from "../../../../common/Iconbutton";

const RenderTotalPrice = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    // Add logic to handle buying the course
    const course = cart.map((course) => course._id);
    console.log("Buying course...");
  };
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <Iconbutton
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
};

export default RenderTotalPrice;
