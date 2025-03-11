import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../../../services/operations/SettingApis";

const UpdateProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef();
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePicture", imageFile);
      console.log("file: ", formData);
      dispatch(updateProfilePicture(token, formData)).then((response) => {
        console.log("response :", response);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="  flex bg-richblack-800 mt-10 px-7 py-8 rounded-lg justify-between">
      <div className="flex items-center gap-3">
        <img
          src={user.image}
          className="aspect-square w-[80px] rounded-full"
          alt=""
        />
        <div className="flex flex-col gap-1 ">
          <h1 className="text-richblack-5 text-lg font-medium">
            Change Profile Picture
          </h1>
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className=" flex items-center h-fit px-4 py-2 gap-1 font-medium rounded-lg text-richblack-5 bg-richblack-700"
            >
              Select
            </button>
            <button
              onClick={handleFileUpload}
              className=" flex items-center h-fit px-4 py-2 gap-1 font-medium rounded-lg text-richblack-800 bg-yellow-50"
            >
              Upload
              <i class="ri-upload-2-line"></i>
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
