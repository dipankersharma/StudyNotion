import { toast } from "react-hot-toast";
import { apiconnector } from "../apiConnector";
import { SettingsEndpoint } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./AuthOperation";
export const updateProfilePicture = (token, formData) => async (dispatch) => {
  console.log("Setting file and token: ", token, formData);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "PUT",
      SettingsEndpoint.UPDATE_PROFILE_PICTURE_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(
      "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
      response
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Display Picture Updated Successfully");
    dispatch(setUser(response.data.data));
  } catch (error) {
    console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
    toast.error("Could Not Update Profile Picture");
  }
  toast.dismiss(toastId);
};

export const updateProfileDetail = (token, data) => async (dispatch) => {
  const toastId = toast.loading("loading....");
  console.log(token);
  try {
    const response = await apiconnector(
      "PUT",
      SettingsEndpoint.UPDATE_PROFILE_DETAILS_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(token);
    console.log(
      "UPDATE_PROFILE_DETAILS_API API RESPONSE............",
      response
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Profile Updated Successfully");
    const userImage = response.data.data.image
      ? response.data.data.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
    dispatch(setUser({ ...response.data.data, image: userImage }));
  } catch (error) {
    console.log("UPDATE_PROFILE_DETAILS_API API ERROR............", error);
    toast.error("Could Not Update Profile");
  }
  toast.dismiss(toastId);
};

export const updatePassword = (token, data) => async (dispatch) => {
  const toastId = toast.loading("loading....");
  try {
    const response = await apiconnector(
      "POST",
      SettingsEndpoint.UPDATE_PASSWORD,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("UPDATEPASSWORD_API API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Updated Successfully");
  } catch (error) {
    console.log("UPDATEPASSWORD_API API ERROR............", error);
    toast.error("Could Not Update Password");
  }
  toast.dismiss(toastId);
};

// Permanently delete Account

export const deleteAccount = (token, navigate) => async (dispatch) => {
  const toastId = toast.loading("loading....");
  try {
    const response = await apiconnector(
      "DELETE",
      SettingsEndpoint.DELETE_ACCOUNT,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE_ACCOUNT_API API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Account Deleted Successfully");

    dispatch(logout(navigate));
  } catch (error) {
    console.log("DELETE_ACCOUNT_API API ERROR............", error);
    toast.error("Could Not Delete Account");
  }
  toast.dismiss(toastId);
};
