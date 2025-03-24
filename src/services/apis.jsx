const REACT_APP_BASE_URL = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const AuthEndpoint = {
  SENDOTP_API: REACT_APP_BASE_URL + "/auth/sendotp",
  SIGNUP_API: REACT_APP_BASE_URL + "/auth/signup",
  LOGIN_API: REACT_APP_BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: REACT_APP_BASE_URL + "/auth/reset-password-token",
  UPDATEPASSWORD_API: REACT_APP_BASE_URL + "/auth/reset-password",
};

export const categories = {
  CATEGORIES_URL: REACT_APP_BASE_URL + "/course/getallcategories",
};

export const SettingsEndpoint = {
  UPDATE_PROFILE_PICTURE_API:
    REACT_APP_BASE_URL + "/profile/updateProfilePicture",
  UPDATE_PROFILE_DETAILS_API: REACT_APP_BASE_URL + "/profile/updateProfile",
  UPDATE_PASSWORD: REACT_APP_BASE_URL + "/auth/changePassword",
  DELETE_ACCOUNT: REACT_APP_BASE_URL + "/profile/deleteAccount",
};
export const profileEndpoint = {
  GET_ENROLLED_COURSES: REACT_APP_BASE_URL + "/profile/getenrolledcourses",
};
export const courseEndpoint = {
  EDIT_COURSE_DETAILS: REACT_APP_BASE_URL + "/course/editcourse",
  CREATE_COURSE: REACT_APP_BASE_URL + "/course/createCourse",
  CREATE_SECTION: REACT_APP_BASE_URL + "/course/createsection",
  UPDATE_SECTION: REACT_APP_BASE_URL + "/course/updatesection",
  DELETE_SECTION: REACT_APP_BASE_URL + "/course/deletesection",
  CREATE_SUBSECTION: REACT_APP_BASE_URL + "/course/createsubsection",
  UPDATE_SUBSECTION: REACT_APP_BASE_URL + "/course/updatesubsection",
  DELETE_SUBSECTION: REACT_APP_BASE_URL + "/course/deletesubsection",
  GET_INSTRUCTOR_COURSES: REACT_APP_BASE_URL + "/course/getinstructorcourses",
  DELETE_COURSE: REACT_APP_BASE_URL + "/course/deletecourse",
  FETCH_COURSE_DETAILS: REACT_APP_BASE_URL + "/course/getCourseDetails",
};
