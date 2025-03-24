import { AuthEndpoint } from "../apis";
import { apiconnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

// OTP SENDING FUNCTION

export const Sendotp = (email, navigate) => async (dispatch) => {
  const toastId = toast.loading("Loading....");
  dispatch(setLoading(true));
  try {
    const response = await apiconnector("POST", AuthEndpoint.SENDOTP_API, {
      email,
      userExits: true,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("OTP sent successfully");
    navigate("/verify-email");
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to send OTP");
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};

// SIGNUP FUNCTION

export const signup =
  (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
  ) =>
  async (dispatch) => {
    const toastId = toast.loading("loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiconnector("POST", AuthEndpoint.SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

     
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      console.error("Error Response:", error.response?.data); // Log server error details
      toast.error(error.response?.data?.message || "Signup failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };


export const login = (email, password, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  const toastId = toast.loading("loading...");
  try {
    const response = await apiconnector("POST", AuthEndpoint.LOGIN_API, {
      email,
      password,
    });
 
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Login successful");
    dispatch(setToken(response.data.token));

    if (!response.data?.user) {
      console.log("User data not found.");
    }
    dispatch(setUser(response.data.user));
    const userImage = response.data?.image
      ? response.data.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
    dispatch(setUser({ ...response.data.user, image: userImage }));
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate("/dashboard/my-profile");
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to login");
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

export const logout = (navigate) => (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    dispatch(setToken(null));
    toast.success("Logged Out Successfully");
    navigate("/login");
  } catch (error) {
    console.error(error);
    toast.error("Failed to Logout");
  }
};

export const setResetPasswordToken =
  (email, setEmailSent) => async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");

    try {
      const response = await apiconnector(
        "POST",
        AuthEndpoint.RESETPASSTOKEN_API,
        {
          email,
        }
      );

      console.log("Password Reset Token Response ...", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset Password Link Sent Successfully");
      setEmailSent(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send Reset Password Link");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
export const updatePassword =
  (password, confirmPassword, token) => async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");

    try {
      const response = await apiconnector(
        "POST",
        AuthEndpoint.UPDATEPASSWORD_API,
        {
          password,
          confirmPassword,
          token,
        }
      );


      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(" Password changed  Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Reset Password ");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
