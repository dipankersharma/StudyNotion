import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import Iconbutton from "../../../common/Iconbutton";
import { RxCross2 } from "react-icons/rx";
import { createRating } from "../../../services/operations/CourseDetails";

const ModalReview = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);
  const onsubmit = async (data) => {
    console.log("Form Data: ", data);
    // Here you can handle the form submission, e.g., send data to the server
    await createRating(
      {
        courseId: courseEntireData?._id,
        rating: data?.courseRating,
        review: data?.courseExperience,
      },
      token
    );
    await setReviewModal(false);
  };

  const ratingChanged = (newRating) => {
    console.log("New Rating: ", newRating);
    setValue("courseRating", newRating);
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* heading of modal */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            {" "}
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Name AND image */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt=""
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posted Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onsubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="ffd700"
            />

            <div className="flex w-11/12 flex-col space-y-2">
              <label
                htmlFor="courseExperience"
                className="text-sm text-richblack-5"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full rounded-lg bg-richblack-700 p-2"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                onClick={() => setReviewModal(false)}
              >
                Cancel
              </button>
              <Iconbutton text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalReview;
