import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countrycode from "../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phoneNo: "",
        message: "",
      });
    }
  }, [isSubmitSuccessful, reset]);
  const submitForm = (data) => {
    console.log("Data:", data);
    try {
      setLoading(true);
      const response = { status: "OK" };
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <form
        className="flex flex-col gap-5 mt-8"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="flex gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-richblack-5" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <span>Please enter your name</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-richblack-5" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              {...register("lastname")}
            />
          </div>
        </div>
        <div className="flex flex-col text-richblack-5 gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter a valid email address</span>}
        </div>

        {/* phoneNO */}
        <div className="flex flex-col gap-2">
          <label className="text-richblack-5 " htmlFor="phonenumber">
            Phone Number
          </label>
          <div className="flex gap-5">
            {/* dropdown */}
            <select
              name="dropdown"
              id="dropdown"
              className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1 w-[80px]"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              {...register("dropdown", { required: true })}
            >
              {countrycode.map((item, index) => {
                return (
                  <option>
                    {item.code} -{item.country}
                  </option>
                );
              })}
            </select>

            {/* phonenumber */}
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1 w-[calc(100%-90px )]"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              placeholder="12345 67890"
              {...register("phoneNo", {
                required: { value: true, message: "Please enter phone number" },
                maxLength: { value: 10, message: "Invalid Phone number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        <div className="flex flex-col text-richblack-5 gap-2">
          <label htmlFor="message"> Message</label>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={7}
            placeholder="Enter your message"
            className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register("message", { required: true })}
          />

          {errors.message && <span>Please enter your message</span>}
        </div>
        <button
          className="bg-yellow-50 w-full text-black font-semibold px-2 rounded-lg py-3 text-center"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
