import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import Iconbutton from "../../../../../common/Iconbutton";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  updateSection,
  createSection,
} from "../../../../../services/operations/CourseDetails";

const CourseBuilder = () => {
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const canceEdit = () => {
    setValue("courseSections", "");
    setEditSectionName(false);
  };
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };
  const goToNext = () => {
    console.log("Go to next");
    console.log("Course: ", course);
    console.log("CourseSections: ", course.courseSections.length);





    if ( course.courseSections.length === 0) {
      toast.error("Please add at least one course Section");
      return;
    }
    if (
      course.courseSections.some((Section) => Section.subSection?.length === 0)
    ) {
      toast.error("Please add at least one lecture to each course section");
      return;
    }
    dispatch(setStep(3));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.courseSections,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.courseSections,
          courseId: course._id,
        },
        token
      );
    }
    console.log(result);
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const handleEditSectionName = (sectionName, sectionId) => {
    if (editSectionName === sectionId) {
      canceEdit();
      return;
    }

    setEditSectionName(sectionId);

    setValue("sectionName", sectionName);
  };
  return (
    <div className="flex flex-col bg-richblack-800 p-6 space-y-8 rounded-md border-[1px] border-richblack-700 rounded-lg">
      <p className="text-richblack-5 text-xl font-semibold">Course Builder</p>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-richblack-5" htmlFor="sectionName">
            Section Name<sup className="text-pink-50">*</sup>
          </label>
          <input
            type="text"
            name="courseSections"
            placeholder="Add course Name"
            {...register("courseSections", { required: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="rounded-lg w-full bg-richblack-700 text-richblack-5 p-[12px] mt-1"
          />
          {}
        </div>
        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            className="text-yellow-50 border-[1px] py-2 px-4 border-yellow-50 rounded-lg"
          >
            {editSectionName ? "Edit Section Name" : "Create Section"}
            <i class="ri-add-circle-fill text-yellow-50 ml-2"></i>
          </button>

          {editSectionName && (
            <button
              type="button"
              onClick={canceEdit}
              className="text-richblack-500"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseSections.length > 0 && (
        <>
          <NestedView handleEditSectionName={handleEditSectionName} />{" "}
          <div className="flex items-center gap-5 justify-end">
            <button
              type="button"
              onClick={goBack}
              className="text-richblack-800 px-3 py-2 font-semibold bg-richblack-100 border-[1px] border-richblack-200 rounded-lg "
            >
              Back
            </button>
            <Iconbutton
              text="Next"
              onclick={goToNext}
              customClasses={"text-ricblack-800"}
            ></Iconbutton>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseBuilder;
