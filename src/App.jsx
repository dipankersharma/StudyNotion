import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import "./App.css";
import Navbar from "./common/Navbar";
import Login from "./page/login";
import Signup from "./page/Signup";
import ForgotPassword from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword";
import VerifyEmail from "./page/VerifyEmail";
import AboutUs from "./page/AboutUs";
import Profile from "./component/core/Dashboard/Profile";
import OpenRoute from "./component/core/Auth/OpenRoute";
import PrivateRoute from "./component/core/Auth/PrivateRoute";
import Dashboard from "./page/Dashboard";
import ContactUs from "./page/ContactUs";
import Setting from "./component/core/Dashboard/setting/Setting";
import EnrolledCourse from "./component/core/Dashboard/EnrolledCourse";
import Cart from "./component/core/Dashboard/Cart/Cart";
import { ACCOUNT_TYPE } from "./utils/constanst";
import { useSelector } from "react-redux";
import Addcourse from "./component/core/Dashboard/AddCourse/Addcourse";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen flex flex-col bg-richblack-900 font-inter ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:token"
          element={
            <OpenRoute>
              <ResetPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="/about"
          element={
            <OpenRoute>
              <AboutUs />
            </OpenRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <OpenRoute>
              <ContactUs />
            </OpenRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard/my-profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/setting"
            element={
              <PrivateRoute>
                <Setting />
              </PrivateRoute>
            }
          />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              {" "}
              <Route
                path="/dashboard/enrolled-courses"
                element={
                  <PrivateRoute>
                    <EnrolledCourse />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              {" "}
              <Route path="/dashboard/add-course" element={<Addcourse />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
