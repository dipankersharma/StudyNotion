import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { logout } from "../../../services/operations/AuthOperation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (authLoading || profileLoading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <div className="bg-richblack-800 border-r-[1px] border-r-richblack-700 flex flex-col w-[222px] py-10 h-[calc(100vh-3.5rem)] ">
        <div className="flex flex-col">
          {sidebarLinks.map((link, index) => {
            if (link.type && link.type !== user.accountType) return null;
            return <SidebarLink key={index} link={link} />;
          })}
        </div>

        <div className="mx-auto w-10/12 h-[1px] bg-richblack-600 mb-6 mt-6 "></div>
        <div className="flex flex-col">
          <SidebarLink
            link={{
              name: "Setting",
              path: "dashboard/setting",
              icon: "ri-settings-5-fill",
            }}
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure ?",
                text2: "You will be logged out from your Account",
                btn1Text: "Log out",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="text-richblack-100 font-medium text-sm"
          >
            <div className="flex gap-x-2 items-center mx-auto px-8 py-2 font-medium text-sm flex">
              <i class="ri-logout-circle-line"></i>
              Log out
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
