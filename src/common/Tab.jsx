import React from "react";

const Tab = ({ data, field, setfield }) => {
  return (
    <div
      style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
      className="bg-richblack-800 p-1 gap-x-2 my-6 rounded-full max-w-max"
    >
      {data.map((item, index) => (
        <button
          key={index}
          onClick={()=>setfield(item.type)}
          className={`${
            field === item.type ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"
          }  px-5 py-3 rounded-full`}
        >
          {item.tabName}
        </button>
      ))}
    </div>
  );
};

export default Tab;
