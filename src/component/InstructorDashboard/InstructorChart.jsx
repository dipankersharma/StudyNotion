import React, { useState } from "react";
import { Chart, ArcElement, Tooltip, Legend, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register only what's needed for Pie
Chart.register(ArcElement, Tooltip, Legend, ...registerables);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");

  const courseNames = Array.isArray(courses)
    ? courses.map((c) => c.courseName)
    : [];
  const studentsData = Array.isArray(courses)
    ? courses.map((c) => c.totalStudentsEnrolled)
    : [];
  const incomeData = Array.isArray(courses)
    ? courses.map((c) => c.totalAmountGenerated)
    : [];

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const chartDataStudents = {
    labels: courseNames,
    datasets: [
      {
        data: studentsData,
        backgroundColor: generateRandomColors(courseNames.length),
      },
    ],
  };

  const chartIncomeData = {
    labels: courseNames,
    datasets: [
      {
        data: incomeData,
        backgroundColor: generateRandomColors(courseNames.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  if (courseNames.length === 0) {
    return (
      <div className="text-center text-richblack-300">No data to display</div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div style={{ height: 300 }}>
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
};

export default InstructorChart;
