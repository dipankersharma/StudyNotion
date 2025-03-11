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
  const { editCourse } = useSelector((state) => state.course);

  const handleAddChips = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event
      event.preventDefault();
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim();
      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip value to the chips array
        const newChip = [...chips, chipValue];
        setChips(newChip);
        // Clear the input value
        event.target.value = "";
      }
    }
  };
  const handleRemoveChip = (chipValue) => {
    // Filter out the chip value from the chips array
    const newChips = chips.filter((chip) => chip !== chipValue);
    setChips(newChips);
  };
  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      setChips(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);
  useEffect(() => {
    setValue(name, chips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}
        <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {/* Map over the chips array and render each chip */}
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {/* Render the chip value */}
            {chip}
            {/* Render the button to delete the chip */}
            <button type="button" onClick={() => handleRemoveChip(chip)}>
              <i class="ri-close-line "></i>
            </button>
          </div>
        ))}
        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleAddChips}
          className=" w-full text-richblack-5 bg-richblack-700 p-[12px] rounded-lg"
          style={{ boxShadow: "inset 0px -1px 0 rgba(255,255,255,0.18" }}
        />
      </div>
    </div>
  );
};

export default Chipinput;
