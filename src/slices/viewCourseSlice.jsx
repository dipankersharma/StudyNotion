import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOflectures: 0,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setCourseEntireData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = Array.isArray(action.payload)
        ? action.payload
        : [];
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOflectures = action.payload;
    },
    updateCompletedLectures: (state, action) => {
      const current = Array.isArray(state.completedLectures)
        ? state.completedLectures
        : [];
      state.completedLectures = [...current, action.payload];
    },
  },
});

export const {
  setCompletedLectures,
  setCourseEntireData,
  setCourseSectionData,
  setTotalNoOfLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
