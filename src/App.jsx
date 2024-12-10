import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import "./App.css";
import Navbar from "./common/Navbar";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-richblack-900 font-inter ">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
