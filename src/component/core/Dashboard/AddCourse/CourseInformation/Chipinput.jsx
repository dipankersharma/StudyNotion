import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Chipinput = ({
  register,
  name,
  label,
  placeholder,
  setValue,
  getValues,
  errors,
}) => {
  const [chips, setChips] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);
  // console.log("Course",course);
  // console.log(chips);

  const handleAddChips = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        const newChip = [...chips, chipValue];
        console.log("Chip",newChip);
        setChips(newChip);
        event.target.value = "";
      }
    }
  };

  const handleRemoveChip = (chipValue) => {
    const newChips = chips.filter((chip) => chip !== chipValue);
    setChips(newChips);
  };

  useEffect(() => {
    if (editCourse && course?.tags) {
      setChips(course?.tags);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, [editCourse, course, name, register]);

  useEffect(() => {
    setValue(name, chips);
    // console.log("get values",getValues(name))
  }, [chips, name, setValue]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}
        <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button type="button" onClick={() => handleRemoveChip(chip)}>
              <i className="ri-close-line"></i>
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleAddChips}
          className="w-full text-richblack-5 bg-richblack-700 p-[12px] rounded-lg"
          style={{ boxShadow: "inset 0px -1px 0 rgba(255,255,255,0.18)" }}
        />
      </div>
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};

export default Chipinput;
