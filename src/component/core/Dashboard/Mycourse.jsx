import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getinstructorcourses } from "../../../services/operations/CourseDetails";
import Iconbutton from "../../../common/Iconbutton";
import CourseTable from "./InstructorCourse/CourseTable";

const Mycourse = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourse] = useState("");

    useEffect(() => {
      const fetchinstructorcourse = async () => {
        const result = await getinstructorcourses(token);
        if (result) {
          setCourse(result);
        }
      };
      fetchinstructorcourse();
    }, []);
  return (
    <div>
      <div className="flex justify-between mt-3">
        <h1 className="text-2xl text-richblack-5 font-semibold">My Courses</h1>
        <Iconbutton text="Add Course" children={<i class="ri-add-fill"></i>} onclick={()=>{navigate("/dashboard/add-course")}} />
      </div>
      {courses && <CourseTable course={courses} setcourse={setCourse} />}
    </div>
  );
};

export default Mycourse;
