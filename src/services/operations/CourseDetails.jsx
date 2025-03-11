import { toast } from "react-hot-toast";
import { apiconnector } from "../apiConnector";
import { categories } from "../apis";
import { courseEndpoint } from "../apis";

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiconnector("GET", categories.CATEGORIES_URL);
    // console.log("COURSE_CATEGORIES_API API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    // console.log(result);
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error);
    toast.error(error.message);
  }

  return result;
};

export const editCourseDetails = (token, formData) => async () => {
  let result = null;
  const toastId = toast.loading("loading...");
  try {
    const response = await apiconnector(
      "PUT",
      courseEndpoint.EDIT_COURSE_DETAILS,
      formData,
      null,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("EDIT_COURSE_DETAILS_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createCourse = async (token, formData) => {
  let result = null;
  const toastId = toast.loading("loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoint.CREATE_COURSE,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE COURSE API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course");
    }

    toast.success("Course Added Successfully");
    result = response?.data?.data;

    // Dispatch success action
    // dispatch({
    //   type: "CREATE_COURSE_SUCCESS",
    //   payload: result, // Yeh serializable hai
    // });
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error);
    toast.error(error.message);

    // Dispatch failure action
    // dispatch({
    //   type: "CREATE_COURSE_FAILURE",
    //   payload: error.message, // Yeh bhi serializable hai
    // });
  }
  toast.dismiss(toastId);
  return result;
};

// backend calls for sections
export const createSection = async (data, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    let response = await apiconnector(
      "POST",
      courseEndpoint.CREATE_SECTION,
      data,
      {
        // "Content-Type": "application/json",
        AuthoriZation: `Bearer ${token}`,
      }
    );

    console.log("CREATE_SECTION_API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Section");
    }
    toast.success("Section Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_SECTION_API RESPONSE ERROR....", error);
    toast.error("Could Not Add Section");
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSection = async (data, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiconnector(
      "PUT",
      courseEndpoint.UPDATE_SECTION,
      data,
      {
        "Content-Type": "multipart/form-data",
        AuthoriZation: `Bearer ${token}`,
      }
    );
    console.log("UPDATE_SECTION_API RESPONSE............", response);
    if (response?.data?.success !== true) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Section Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT_SECTION_API RESPONSE............", error.message);
    toast.error("Could Not Update Section");
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiconnector(
      "DELETE",
      courseEndpoint.DELETE_SECTION,
      data,
      {
        "Content-Type": "application/json",
        AuthoriZation: `Bearer ${token}`,
      }
    );
    console.log("DELETE_SECTION_API RESPONSE............", response);
    if (response?.data?.success !== true) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Section Deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_SECTION_API RESPONSE............", error.message);
    toast.error("Could Not Delete Section");
  }
  toast.dismiss(toastId);
  return result;
};

// backend call for subsections
export const createSubSection = async (formData, token) => {
  console.log(formData.get("title"));
  console.log(formData.get("description"));
  console.log(formData.get("sectionId"));
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoint.CREATE_SUBSECTION,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE_SUBSECTION_API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Subsection");
    }
    toast.success("Subsection Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log(" error CREATE_SUBSECTION_API RESPONSE............", error);
    toast.error("Could Not Add Subsection");
  }
  toast.dismiss(toastId);
  return result;
};
export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiconnector(
      "PUT",
      courseEndpoint.UPDATE_SUBSECTION,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("UPDATE_SUBSECTION_API RESPONSE............", response);
    if (response?.data?.success !== true) {
      throw new Error("Could Not Update Subsection");
    }
    toast.success("Subsection Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE_SUBSECTION_API RESPONSE............", error);
    toast.error("Could Not update Subsection");
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("loading...");
  let result = null;
  try {
    const response = await apiconnector(
      "DELETE",
      courseEndpoint.DELETE_SUBSECTION,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE_SUBSECTION_API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Subsection");
    }
    toast.success("Subsection Deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_SUBSECTION_API ERROR RESPONSE............", error);
    toast.error("Could Not Delete Subsection");
  }
  toast.dismiss(toastId);
  return result;
};
