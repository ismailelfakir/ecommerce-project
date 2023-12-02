import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const sidebarItems = [
    { id: 1, icon: <RxPerson size={20} className={`text-gray-800 dark:text-gray-200 ${active === 1 ? "text-[#1900ff] dark:text-[#1900ff] " : ""}`} />, text: "Profile" },
    { id: 2, icon: <HiOutlineShoppingBag size={20} className={`text-gray-800 dark:text-gray-200 ${active === 2 ? "text-[#1900ff] dark:text-[#1900ff] " : ""}`} />, text: "Orders" },
    { id: 3, icon: <HiOutlineReceiptRefund size={20} className={`text-gray-800 dark:text-gray-200 ${active === 3 ? "text-[#1900ff] dark:text-[#1900ff] " : ""}`} />, text: "Refunds" },
    { id: 4, icon: <AiOutlineMessage size={20} className={`text-gray-800 dark:text-gray-200 ${active === 4 ? "text-[#1900ff] dark:text-[#1900ff] " : ""}`} />, text: "Inbox" },
    { id: 5, icon: <MdOutlineTrackChanges size={20} className={`text-gray-800 dark:text-gray-200 ${active === 5 ? "text-[#1900ff] dark:text-[#1900ff] " : ""}`} />, text: "Track Order" },
    { id: 6, icon: <RiLockPasswordLine size={20} className={`text-gray-800 dark:text-gray-200 ${active === 6 ? "text-[#1900ff] dark:text-[#1900ff] " : ""}`} />, text: "Change Password" },
    { id: 7, icon: <TbAddressBook size={20} className={`text-gray-800 dark:text-gray-200 ${active === 7 ? "text-[#1900ff] dark:text-[#1900ff] " : ""}`} />, text: "Address" },
  ];

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950 shadow-sm rounded-[10px] p-4 pt-8">
      {sidebarItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center cursor-pointer w-full mb-6 p-2 rounded-lg 
            hover:bg-[#F6F6F5] dark:hover:bg-gray-800 ${
              active === item.id ? "bg-[#F6F6F5] dark:bg-gray-800 " : ""
            }`}
          onClick={() => {
            setActive(item.id);
          }}
        >
          {item.icon}
          <span
            className={`pl-3 ${
              active === item.id ? " text-[#1900ff] dark:text-[#1900ff]" : ""
            } 800px:block hidden dark:text-gray-300`}
          >
            {item.text}
          </span>
        </div>
      ))}

      {user && user.role === "Admin" && (
        <div
        className={`flex items-center cursor-pointer w-full mb-6 p-2 rounded-lg 
        hover:bg-[#F6F6F5] dark:hover:bg-gray-800 ${
          active === 8 ? "bg-[#F6F6F5] dark:bg-gray-800" : ""
        }`}          
        onClick={() => navigate("/admin/dashboard")}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className={`text-gray-800 dark:text-gray-200 ${active === 8 ? "text-[#1900ff] dark:text-[#1900ff] " : ""}`}
          />
          <span
            className={`pl-3 ${
              active === 8 ? "text-[#1900ff] dark:text-[#1900ff]" : ""
            } 800px:block hidden dark:text-gray-300`}
          >
            Admin Dashboard
          </span>
        </div>
      )}

      <div
        className={`flex items-center cursor-pointer w-full mb-6 p-2 rounded-lg 
          hover:bg-[#F6F6F5] dark:hover:bg-gray-800 ${
            active === 9 ? "bg-[#F6F6F5] dark:bg-gray-800" : ""
          }`}
        onClick={logoutHandler}
      >
        <AiOutlineLogin 
        size={20} 
        className={`text-gray-800 dark:text-gray-200 ${active === 9 ? "text-[#1900ff] dark:text-[#1900ff] " : ""}`}
        />
        <span
          className={`pl-3 ${
            active === 9 ? "text-[#1900ff] dark:text-[#1900ff]" : ""
          } 800px:block hidden dark:text-gray-300`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
