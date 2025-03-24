import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Iconbutton from "../../../../common/Iconbutton";
import { resetCourseState, setStep } from "../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../utils/constanst";
import { editCourseDetails } from "../../../../services/operations/CourseDetails";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const { register, getValues, handleSubmit, setValue } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.state === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);
  const handleCoursePublish = async () => {
    if (
      (course?.state === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.state === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // there is no change in the state
      goToCourse();
     
      return;
    }
    const formData = new FormData();
    console.log("courseId", course._id)
    formData.append("courseId", course._id);
    const updatedState = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
      console.log("updatedvalue", updatedState)
    formData.append("state", updatedState);
    setLoading(true);
    const response =  await editCourseDetails(token,formData);
    if (response) {
    
      goToCourse();
    }
    setLoading(false);
  };

  const onSubmit = (data) => {
    handleCoursePublish();
    console.log(data);
  };
  const goToCourse = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

 
  const goToBack = () => {
    dispatch(setStep(2));
  };
 
  return (
    <div className="bg-richblack-800 rounded-lg p-6">
      <h1 className="text-richblack-5 text-xl font-semibold mb-3">
        Publish Settings
      </h1>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7">
          <label htmlFor="public">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="rounded w-4 h-4"
            />
            <span className="text-richblack-200 ml-3">
              Make this course as a public
            </span>
          </label>
        </div>

        <div className="flex gap-x-5 justify-end">
          <button
            className="bg-richblack-300 rounded-lg px-4 py-2 font-semibold"
            onClick={goToBack}
          >
            Back
          </button>
          <Iconbutton text="Save changes" type="submit" disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
