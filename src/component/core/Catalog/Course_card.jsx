import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
// import avgReviewCount

const Course_card = ({ data, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const rating = GetAvgRating(data?.ratingAndReviews);
  
    setAvgReviewCount(rating);
  }, [data]);
  return (
    <>
      <Link to={`/courses/${data?._id}`} className="flex flex-col gap-2">
        <div>
          <img src={data?.thumbnail}
           className={`${Height} w-full rounded-xl object-cover `} />
        </div>
        <div className="flex flex-col gap-2 px-1 py-3">
          <p className="text-xl text-richblack-5" >{data?.courseName}</p>
          <p className="text-sm text-richblack-50">
            {data?.courseInstructor?.firstName}{" "}
            {data?.courseInstructor?.lastName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-5">{avgReviewCount || 0} </span>
            <RatingStars Review_Count={avgReviewCount}/>
            <span className="text-richblack-400">
                {data?.ratingAndReviews?.length} Ratings
              </span>
          </div>
          <p className="text-xl text-richblack-5">Rs. {data?.price}</p>
        </div>
      </Link>
    </>
  );
};

export default Course_card;
