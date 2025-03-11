import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { enrolledCourses } from "../../../services/operations/ProfileApis";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourse = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [enrolledcourse, setEnrolledCourse] = useState(null);
  const fetchEnrolledCourse = async () => {
    try {
      const result = await enrolledCourses(token);
      setEnrolledCourse(result);
    } catch (error) {
      console.error("Error fetching enrolled courses: ", error);
      alert("Error fetching enrolled courses. Please try again later.");
    }
  };

  useEffect(() => {
    fetchEnrolledCourse();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-richblack-50">Enrolled Courses</h1>
      {!enrolledcourse ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledcourse.length > 0 ? (
        <div className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You haven't enrolled in any courses yet
        </div>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {enrolledcourse.map((course, index, arr) => {
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={index}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>

                  <p className="text-xs text-richblack-300">
                    {" "}
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>

              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress:{course.progressPercentage || 0}%</p>
                <ProgressBar
                  maxCompleted={100}
                  completed={course.progressPercentage}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>;
          })}
        </div>
      )}
    </>
  );
};

export default EnrolledCourse;
