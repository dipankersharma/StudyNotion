import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tbody } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constanst";
import {
  deleteCourse,
  getinstructorcourses,
} from "../../../../services/operations/CourseDetails";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const CourseTable = ({ course, setcourse }) => {
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const TRUNCATE_LENGTH = 30;
  const handleCourseDelete = async (_id) => {
    console.log("Table wala: ", _id);
    setLoading(true);
    await deleteCourse(token, _id);
    const result = await getinstructorcourses(token);
    if (result) {
      setcourse(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div>
      <Table className="rounded-xl border border-richblack-800 w-full mt-10">
        <thead>
          <tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              COURSES
            </th>
            <th className="text-left text-sm font-medium uppercase text-richblack-100">
              DURATIONS
            </th>
            <th className="text-left text-sm font-medium uppercase text-richblack-100">
              PRICE
            </th>
            <th className="text-left text-sm font-medium uppercase text-richblack-100">
              ACTIONS
            </th>
          </tr>
        </thead>
        <Tbody>
          {course.length === 0 ? (
            <tr>
              <td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses Available
              </td>
            </tr>
          ) : (
            course?.map((course) => (
              <tr
                key={course._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course?.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course?.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                      {/* {course.courseDescription} */}
                    </p>
                    <p className="text-[12px] text-white">Created At:</p>
                    {course?.state === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <i class="ri-time-fill"></i>Draft
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <i class="ri-checkbox-circle-fill"></i>published
                      </p>
                    )}
                  </div>
                </td>
                <td className="text-sm font-medium text-richblack-100">
                  2h 30min
                </td>
                <td className="text-sm font-medium text-richblack-100">
                  <i class="ri-money-rupee-circle-fill"></i>
                  {course.price}
                </td>
                <td className="text-sm font-medium text-richblack-100 ">
                  <div className="flex gap-x-4 text-richblack-100">
                    <button
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                      disabled={loading}
                      title="Edit"
                      onClick={()=>{
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                    >
                      <i className="ri-pencil-fill"></i>
                    </button>
                    <button
                      disabled={loading}
                      
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...  ",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        });
                      }}
                      title="Delete"
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <i className="ri-delete-bin-6-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
