import React, { useEffect, useState } from "react";

const RequirementFields = ({
  label,
  name,
  register,
  errors,
  getvalue,
  setValue,
  placeholder,
}) => {
  const [Requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const handleAddRequirement = () => {
    if (Requirement) {
      setRequirementList([...requirementList, Requirement]);
      setRequirement("");
    }
  };
  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });
  });
  useEffect(() => {
    setValue(name, requirementList);
  });
  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}
        <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={Requirement}
          onChange={(e) => setRequirement(e.target.value)}
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
          className="rounded-lg w-full bg-richblack-700 text-richblack-5 p-[12px] mt-1"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((item, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{item}</span>
              <button
                type="button"
                onClick={handleRemoveRequirement}
                className="ml-2 text-xs text-pure-greys-300 "
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default RequirementFields;
