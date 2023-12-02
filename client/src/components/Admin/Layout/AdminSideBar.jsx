import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-gray-100 dark:bg-gray-950 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 1 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            className={`${
              active === 1
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 2 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        {" "}
        <Link to="/admin/dashboard-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            className={`${
              active === 2
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 3 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        {" "}
        <Link to="/admin/all-seller" className="w-full flex items-center">
          <GrWorkshop
            size={30}
            className={`${
              active === 3
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            All Sellers
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 4 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        {" "}
        <Link
          to="/admin/dashboard-all-user"
          className="w-full flex items-center"
        >
          <HiOutlineUserGroup
            size={30}
            className={`${
              active === 4
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 5 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        {" "}
        <Link
          to="/admin/dashboard-products"
          className="w-full flex items-center"
        >
          <BsHandbag
            size={30}
            className={`${
              active === 5
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 6 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        {" "}
        <Link to="/admin/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            className={`${
              active === 6
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 7 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        {" "}
        <Link
          to="/admin/dashboard-categories"
          className="w-full flex items-center"
        >
          <MdOutlineCategory
            size={30}
            className={`${
              active === 7
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            All Categories
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 8 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        {" "}
        <Link to="/admin-withdraw-request" className="w-full flex items-center">
          <CiMoneyBill
            size={30}
            className={`${
              active === 8
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Withdraw Request
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 9 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        {" "}
        <Link
          to="/admin-dashboard-subscription"
          className="w-full flex items-center"
        >
          <MdOutlineSubscriptions
            size={30}
            className={`${
              active === 9
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Subscription
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 10 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        {" "}
        <Link to="/profile" className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            className={`${
              active === 10
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
