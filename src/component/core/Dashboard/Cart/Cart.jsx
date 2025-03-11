import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourse from "./RenderCartCourse";
import RenderTotalPrice from "./RenderTotalPrice";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Wishlist
      </h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in cart
      </p>
      {total ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourse />
          <RenderTotalPrice />
        </div>
      ) : (
        <div className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is Empty
        </div>
      )}
    </>
  );
};

export default Cart;
