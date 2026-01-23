import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import { apiconnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { useParams } from "react-router-dom";
import CategoryPageDetails from "../services/operations/CategoryPageDetails";
import CourseSlider from "../component/core/Catalog/CourseSlider";
import Course_card from "../component/core/Catalog/Course_card";

const Catalog = () => {
  const { name } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [isActive, setIsActive] = useState("");
  console.log(isActive);

  const fetchCategoryDetails = async () => {
    const response = await apiconnector("GET", categories.CATEGORIES_URL);

    const category = response?.data?.data.filter(
      (ct) => ct.name.split(" ").join("-").toLowerCase() === name
    )[0]?._id;

    setCategoryId(category);
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, [name]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await CategoryPageDetails(categoryId);
        console.log("categoryData", response);
        if (response) {
          setCategoryData(response);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchCategoryData();
  }, [categoryId]);
  return (
    <>
      <div className="box-content bg-richblack-800 px-4">
        {/* hero section */}
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home/Catalog/`}{" "}
            <span className="text-yellow-25">
              {categoryData?.data?.category?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {categoryData?.data?.category?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {categoryData?.data?.category?.description}
          </p>
        </div>
      </div>

      {/* main sections */}

      {/* section 01 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              isActive === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setIsActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
              isActive === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setIsActive(2)}
          >
            New
          </p>
        </div>
        <CourseSlider data={categoryData?.data?.category?.courses} />
      </div>

      {/* section 02 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top course in {categoryData?.data?.category?.name}
        </div>

        <div className="py-8">
          {" "}
          <CourseSlider data={categoryData?.data?.differentCategory[1]?.courses} />
        </div>
      </div>

      {/* section 03 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {categoryData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, index) => (
                <Course_card data={course} key={index} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

   <div className=" bg-richblack-800">
        <Footer />
      </div>
    </>
  );
};

export default Catalog;
