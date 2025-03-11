import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/CourseDetails";
import { setCourse } from "../../../../../slices/courseSlice";
import SubSectionModal from "./SubSectionModal";

import ConfirmationModal from "../../../../../common/ConfirmationModal";

const NestedView = ({ handleEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [addSubSection, setAddSubSection] = useState(null);

  const dispatch = useDispatch();

  const handleDeleteSection = async (sectionId) => {
    let result = await deleteSection(
      {
        sectionId: sectionId,
        courseId: course._id,
      },
      token
    );
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    let result = await deleteSubSection(
      {
        sectionId: sectionId,
        subSectionId: subSectionId,
      },
      token
    );

    if (result) {
      const updatedCourseSection = course.courseSections.map((section) => {
        return section._id === sectionId ? result : section; // ✅ Fix applied
      });

      const updatedCourse = { ...course, courseSections: updatedCourseSection };

      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <div className="rounded-lg bg-richblack-700 p-6 px-8">
      {course?.courseSections?.map((section) => (
        <details key={section._id} open>
          <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
            <div className="flex gap-x-3 text-richblack-50">
              <i class="ri-arrow-up-down-line"></i>
              <p className="">{section.sectionName}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <button
                className="text-xl text-richblack-300"
                onClick={() =>
                  handleEditSectionName(section.sectionName, section._id)
                }
              >
                <i class="ri-pencil-fill"></i>
              </button>
              <button
                className="text-xl text-richblack-300"
                onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this Section?",
                    text2: "All the lectures in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
              >
                <i class="ri-delete-bin-6-fill"></i>
              </button>
              <span className="w-[2px] h-[20px] bg-richblack-300"></span>
              <button>
                {" "}
                <i class="ri-arrow-down-s-fill text-richblack-200 text-xl"></i>
              </button>
            </div>
          </summary>

          <div className="px-6 pb-4">
            {section?.subSections?.map((subSection) => (
              <div className="flex items-center justify-between border-b-2 border-b-richblack-600">
                <div
                  className="flex cursor-pointer items-center text-richblack-50 gap-x-3  py-2"
                  onClick={() => setViewSubSection(subSection)}
                >
                  <i class="ri-arrow-up-down-line"></i>
                  <p className="">{subSection.title}</p>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <button
                    className="text-xl text-richblack-300"
                    onClick={() =>
                      setEditSubSection({
                        ...subSection,
                        sectionId: section._id,
                      })
                    }
                  >
                    <i class="ri-pencil-fill"></i>
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Sub Section?",
                        text2: "Selected lectures will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(subSection._id, section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    className="text-xl text-richblack-300"
                  >
                    <i class="ri-delete-bin-6-fill"></i>
                  </button>
                </div>
              </div>
            ))}

            <button
              className="mt-3 flex items-center gap-x-1 text-yellow-50"
              onClick={() => setAddSubSection(section._id)}
            >
              <i class="ri-add-fill"></i>
              Add Lecture
            </button>
          </div>
        </details>
      ))}

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NestedView;
