import React from "react";
import ContactUsForm from "../../../common/ContactUsForm";
const Form = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-richblack-5 text-4xl font-bold">Get in Touch</h1>
      <p className="text-richblack-400 font-medium text-lg">We'd love to here for you, Please fill out this form.</p>
      <ContactUsForm />
    </div>
  );
};

export default Form;
