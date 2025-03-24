import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/CourseDetails";
import { setCourse } from "../../../../../slices/courseSlice";
import Upload from "../../AddCourse/CourseInformation/Upload";
import Iconbutton from "../../../../../common/Iconbutton";
import toast from "react-hot-toast";


const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const isFormSubmitted = () => {
    const currentValues = getValues();

    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoLink
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubsection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoLink) {
      formData.append("videoLink", currentValues.lectureVideo);
    }
    console.log(formData.get("title"))
    console.log(formData.get("videoLink"))
    console.log(formData.get("sectionId"))
    console.log(formData.get("subSectionId"))
    
    setLoading(true);
    const result = await updateSubSection(formData, token);
    setLoading(false);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
      setModalData(null);
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoLink);
    }
  });

  const onSubmit = async (data) => {
   
    if (view) return;

    if (edit) {
      if (!isFormSubmitted()) {
        toast.error("No changes made to the form");
      } else {
        handleEditSubsection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoLink", data.lectureVideo);

    setLoading(true);

    const result = await createSubSection(formData, token);
   
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseSections.map((section) =>
        section._id === modalData ? result.updatedsection : section

      );
      const updatedCourse = { ...course, courseSections: updatedCourseContent };

      dispatch(setCourse(updatedCourse));
      setModalData(null);
      // dispatch(setCourse(result));
    }
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {add && "Adding"}
            {edit && "Editing"} {view && "Viewing"} Lecture
          </p>
          <button onClick={() => setModalData(null)}>
            <i class="ri-close-fill text-2xl text-richblack-5"></i>
          </button>
        </div>
        <form
          className="space-y-8 px-8 py-10"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <Upload
            label="Lecture Video"
            name="lectureVideo"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={edit ? modalData.videoLink : null}
            viewData={view ? modalData.videoLink : null}
            video={true}
          />
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title<sup className="text-pink-50">*</sup>
            </label>
            <input
              type="text"
              placeholder="Enter Lecture Title"
              id="LectureTitle"
              name="lectureTitle"
              {...register("lectureTitle")}
              className="rounded-lg w-full bg-richblack-700 text-richblack-5 p-[12px] mt-1 min-h-[140px]"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description<sup className="text-pink-50">*</sup>
            </label>
            <textarea
              name="lectureDesc"
              id="lectureDesc"
              {...register("lectureDesc", { required: true })}
              placeholder="Enter Lecture Description"
              className="rounded-lg w-full bg-richblack-700 text-richblack-5 p-[12px] mt-1 resize-x-none min-h-[130px] w-full"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            ></textarea>
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <Iconbutton
                text={edit ? "Save Changes" : "Save"}
                type={"submit"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
