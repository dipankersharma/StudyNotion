import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { setEditCourse, setCourse } from "../../../../slices/courseSlice";
import { getCourseDetails } from "../../../../services/operations/CourseDetails";

const Editcourse = () => {
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
 
  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      const result = await getCourseDetails(token, id);
      console.log(result);
      if (result) {
        dispatch(setCourse(result));
        dispatch(setEditCourse(true));
      }
      setLoading(false);
    };
    populateCourseDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Course</h1>
      <div>{course ? <RenderSteps /> : <div> Page not found</div>}</div>
    </div>
  );
};

export default Editcourse;
