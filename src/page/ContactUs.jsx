import React from "react";
import ContactUsForm from "../common/ContactUsForm";
import Footer from "../common/Footer";

const ContactUs = () => {
  return (
    <div>
      <div className=" w-11/12 mx-auto max-w-maxContent mt-20">
        <div className="flex gap-5 ">
          {/* section1 */}
          <div className="flex flex-col gap-10 bg-richblack-800 px-10 py-8 rounded-xl w-[40%] max-h-[420px]">
            <div className="flex flex-col gap-1">
              <span className="flex gap-2 text-lg font-semibold text-richblack-5">
                {" "}
                <i class="ri-chat-1-fill text-richblack-200 "></i>Chat on us
              </span>
              <p className=" text-richblack-200 text-sm tracking-wide font-medium">
                Our friendly team is here to help.
              </p>
              <p className=" text-richblack-200 text-sm font-semibold tracking-wide">
                info@studynotion.com
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex gap-2 text-lg font-semibold text-richblack-5">
                {" "}
                <i class="ri-earth-fill text-richblack-200 "></i>Visit us
              </span>
              <p className=" text-richblack-200 text-sm tracking-wide">
                Come and say hello at our office HQ.
              </p>
              <p className=" text-richblack-200 text-sm tracking-wide">
                Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
              </p>
              <p className=" text-richblack-200 text-sm tracking-wide">
                Bangalore-560016
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex gap-2 text-lg font-semibold text-richblack-5">
                {" "}
                <i class="ri-chat-1-fill text-richblack-200 "></i>Call us
              </span>
              <p className=" text-richblack-200 text-sm tracking-wide">
                Mon - Fri From 8am to 5pm
              </p>
              <p className=" text-richblack-200 text-sm tracking-wide">
                +123 456 7869
              </p>
            </div>
          </div>

          {/* section2 */}
          <div className="flex flex-col px-12 py-14 w-[55%] border-[1px] border-richblack-600 rounded-xl">
            <h1 className="text-4xl font-semibold text-richblack-5">
              Got a Idea? We've got the skills. Let's team up
            </h1>
            <p className="text-richblack-200 tracking-wide mt-2">
              Tell us more about yourself and what you're got in mind.
            </p>
            <div>
              <ContactUsForm />
            </div>
          </div>
        </div>
        {/* section3 */}
        <div className="text-3xl text-richblack-5 text-center font-semibold mt-10 mb-10">
          Reviews from other learners
        </div>
      </div>
      <div className=" bg-richblack-800">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
