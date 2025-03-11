import toast from "react-hot-toast";
import { profileEndpoint } from "../apis";
import { apiconnector } from "../apiConnector";

export const enrolledCourses = (token) => async (dispatch) => {
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
};
