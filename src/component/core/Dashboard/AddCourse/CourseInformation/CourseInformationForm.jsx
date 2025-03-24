import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_STATUS } from "../../../../../utils/constanst";
import {
  createCourse,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/CourseDetails";
import Chipinput from "./Chipinput";
import Upload from "./Upload";
import RequirementFields from "./RequirementFields";
import Iconbutton from "../../../../../common/Iconbutton";

import { setCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";

const CourseInformationForm = () => {
  const dispatch = useDispatch();

  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setloading] = useState(false);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const getCategories = async () => {
    setloading(true);
    const coursecategories = await fetchCourseCategories();

    if (coursecategories.length > 0) {
      setCategories(coursecategories);
    }
    setloading(false);
  };

  const isUpdateDetail = () => {
    const currentValue = getValues();
    if (
      currentValue.courseTitle !== course.courseName ||
      currentValue.courseShortDesc !== course.courseDescription ||
      currentValue.coursePrice !== course.price ||
      currentValue.courseBenefits !== course.whatYouWillLearn ||
      currentValue.courseImage !== course.thumbnail ||
      currentValue.courseTags.toString() !== course.tag.toString() ||
      currentValue.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValue.courseCategory !== course.category.toString()
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (editCourse) {
      console.log("data populated", editCourse);
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tags);
      setValue("courseBenefits", course.whatwillyoulearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, [editCourse, course, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    if (editCourse) {
      if (isUpdateDetail()) {
        const currentValue = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValue.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValue.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValue.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValue.courseBenefits !== course.whatwillyoulearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValue.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }
        if (currentValue.courseTags.toString() !== course.tags.toString()) {
          formData.append("tags", JSON.stringify(data.courseTags));
        }
        if (
          currentValue.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        setloading(true);
        const result = await editCourseDetails(token, formData);
        setloading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes were made to the course");
      }
      return;
    } else {
      const formData = new FormData();
      console.log(JSON.stringify(data.courseTags));
      console.log(JSON.stringify(data.courseRequirements));
      

      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("whatwillyoulearn", data.courseBenefits);
      formData.append("thumbnail", data.courseImage);
      formData.append("tags", JSON.stringify(data.courseTags));
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("category", data.courseCategory);
      formData.append("state", COURSE_STATUS.DRAFT);
    


      setloading(true);
      const result = await createCourse(token, formData);

      if (result) {
        dispatch(setCourse(result));
        dispatch(setStep(2));
      }
      setloading(false);
    }
  };

  return (
    <form
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5">
          Course Title<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="rounded-lg w-full bg-richblack-700 text-richblack-5 p-[12px] mt-1"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.courseTitle && <span>Course title is required</span>}
      </div>
      <div className=" flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
          Course Short Description<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Course Description"
          {...register("courseShortDesc", { required: true })}
          className="rounded-lg w-full bg-richblack-700 text-richblack-5 p-[12px] mt-1 min-h-[140px]"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.courseShortDesc && (
          <span>Course short description is required</span>
        )}
      </div>
      <div className=" flex flex-col space-y-2 relative">
        <label htmlFor="coursePrice" className="text-sm text-richblack-5">
          Course Price<sup className="text-pink-200">* </sup>
        </label>
        <input
          type="text"
          id="coursePrice"
          placeholder="Price"
          {...register("coursePrice", { required: true })}
          className="rounded-lg w-full bg-richblack-700 text-richblack-5 py-[12px] px-[32px] mt-1"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.coursePrice && <span>Course price is required</span>}
        <i className="ri-money-rupee-circle-fill absolute text-richblack-400 text-2xl top-[28px] left-[5px]"></i>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          Course Category<sup className="text-pink-200">*</sup>
        </label>
        <select
          type="text"
          id="courseCategory"
          placeholder="Enter Course Category"
          {...register("courseCategory", { required: true })}
          className="rounded-lg w-full bg-richblack-700 text-richblack-5 p-[12px] mt-1"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        >
          <option value=" " disabled>
            Choose a Category
          </option>
          {!loading &&
            categories?.map((category, index) => (
              <option key={index} value={category._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && <span>Course category is required</span>}
      </div>

      <Chipinput
        register={register}
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload
        name="courseImage"
        register={register}
        label="Course Thumbnail"
        placeholder="Provide Thumbnail"
        errors={errors}
        setValue={setValue}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className=" flex flex-col space-y-2">
        <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
          Course Benefits<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Course Benefits"
          {...register("courseBenefits", { required: true })}
          className="rounded-lg w-full bg-richblack-700 text-richblack-5 p-[12px] mt-1 min-h-[140px]"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.courseBenefits && <span>Course benefits are required</span>}
      </div>

      <RequirementFields
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
        placeholder="Instruction for Course"
      />

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}
        <button className="bg-yellow-50 text-richblack-800 rounded-lg py-2 px- font-semibold">
          {!editCourse ? "Next" : "Save changes"}{" "}
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </form>
  );
};

export default CourseInformationForm;
