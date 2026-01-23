import toast from "react-hot-toast";
import { profileEndpoint } from "../apis";
import { apiconnector } from "../apiConnector";

export async function enrolledCourses(token) {
  const toastId = toast.loading("loading....");
  let result = [];
  try {
    const response = await apiconnector(
      "GET",
      profileEndpoint.GET_ENROLLED_COURSES,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;

    toast.success("Enrolled Courses fetched successfully");
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading instructor data...");
  let result = [];
  try {
    const response = await apiconnector(
      "GET",
      profileEndpoint.GET_INSTRUCTOR_DATA,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_INSTRUCTOR_DATA_API RESPONSE:", response);
    if (!response.status === 200) {
      throw new Error(response.data.message);
    }
    result = response.data.courses;
    console.log("GET_INSTRUCTOR_DATA_API RESPONSE:", result);
    // toast.success("Instructor data fetched successfully");
  } catch (error) {
    console.error("GET_INSTRUCTOR_DATA_API ERROR:", error.message);
    toast.error("Could not fetch instructor data");
  }
  toast.dismiss(toastId);
  return result;
}
