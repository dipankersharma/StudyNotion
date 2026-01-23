import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { BigPlayButton, Player } from "video-react";

import "video-react/dist/video-react.css";
import Iconbutton from "../../../common/Iconbutton";
import { markLectureAsComplete } from "../../../services/operations/CourseDetails";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        // console.log("courseSectionData", courseSectionData)
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );
        // console.log("filteredData", filteredData)
        const filteredVideoData = filteredData?.[0]?.subSections.filter(
          (data) => data._id === subSectionId
        );
        // console.log("filteredVideoData", filteredVideoData)
        setVideoData(filteredVideoData[0]);
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndex === -1) return true;
    const currentSection = courseSectionData[currentSectionIndex];
    if (!currentSection || !Array.isArray(currentSection.subSections))
      return true;
    const currentSubsectionIndex = currentSection.subSections.findIndex(
      (data) => data._id === subSectionId
    );
    return currentSectionIndex === 0 && currentSubsectionIndex === 0;
  };

  const isvideoCompleted = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndex === -1) return;

    const currentSection = courseSectionData[currentSectionIndex];
    if (!currentSection || !Array.isArray(currentSection.subSections)) return;

    const currentSubsectionIndex = currentSection.subSections.findIndex(
      (data) => data._id === subSectionId
    );

    // If not the first subsection in the section, go to previous subsection
    if (currentSubsectionIndex > 0) {
      const previousSubsectionId =
        currentSection.subSections[currentSubsectionIndex - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubsectionId}`
      );
    }
    // If first subsection, go to the last subsection of the previous section
    else if (currentSectionIndex > 0) {
      const previousSection = courseSectionData[currentSectionIndex - 1];
      if (
        previousSection &&
        Array.isArray(previousSection.subSections) &&
        previousSection.subSections.length > 0
      ) {
        const previousSubsectionId =
          previousSection.subSections[previousSection.subSections.length - 1]
            ._id;
        navigate(
          `/view-course/${courseId}/section/${previousSection._id}/sub-section/${previousSubsectionId}`
        );
      }
    }
    // else: already at the very first video, do nothing
  };
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndex === -1) return;

    const currentSection = courseSectionData[currentSectionIndex];
    if (!currentSection || !Array.isArray(currentSection.subSections)) return;

    const noOfSubsections = currentSection.subSections.length;
    const currentSubsectionIndex = currentSection.subSections?.findIndex(
      (data) => data._id === subSectionId
    );

    if (currentSubsectionIndex !== noOfSubsections - 1) {
      const nextSubSectionIdx =
        currentSection.subSections[currentSubsectionIndex + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionIdx}`
      );
    } else {
      // Go to the first subsection of the next section
      const nextSection = courseSectionData[currentSectionIndex + 1];
      if (
        nextSection &&
        Array.isArray(nextSection.subSections) &&
        nextSection.subSections.length > 0
      ) {
        const nextSubSectionIdx = nextSection.subSections[0]._id;
        navigate(
          `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubSectionIdx}`
        );
      }
    }
  };
  const islastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubsections =
      courseSectionData[currentSectionIndex].subSections.length;
    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSections?.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubsectionIndex === noOfSubsections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoLink}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures?.includes(subSectionId) && (
                <Iconbutton
                  disabled={loading}
                  onclick={() => isvideoCompleted()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <Iconbutton
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPreviousVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!islastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
