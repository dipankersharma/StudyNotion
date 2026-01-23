import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetails } from "../services/operations/CourseDetails";
import {
  setCompletedLectures,
  setCourseEntireData,
  setCourseSectionData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import SidebarCourse from "../component/core/viewCourse/SidebarCourse";
import ModalReview from "../component/core/viewCourse/ModalReview";

const ViewPoint = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
 
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCourseDetails = async () => {
      const courseData = await getFullDetails(courseId, token);
     
      if (courseData?.success) {
     
        dispatch(setCourseSectionData(courseData?.data?.courseSections));
        dispatch(setCourseEntireData(courseData?.data));
        dispatch(setCompletedLectures(courseData?.completedVideos));
        let Lectures = 0;
        courseData?.data?.courseSections?.forEach((section) => {
          Lectures += section?.subSections?.length;
        });
        dispatch(setTotalNoOfLectures(Lectures));
      }
    };

    getCourseDetails();
  }, []);
  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <SidebarCourse setReviewModal={setReviewModal} />
       <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>

        {reviewModal && <ModalReview setReviewModal={setReviewModal} />}
      </div>
    </>
  );
};

export default ViewPoint;
