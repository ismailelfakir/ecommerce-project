import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-gray-100 dark:bg-gray-950 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div
        className={`w-full flex items-center p-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-800
      ${active === 1 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/dashboard" className="w-full flex items-center">
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
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 2 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/dashboard-orders" className="w-full flex items-center">
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
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 3 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiPackage
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
            All Products
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 4 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
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
            Create Product
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 5 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
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
            All Events
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 6 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile
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
            Create Event
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 7 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
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
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 8 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
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
            Inbox
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 9 ?  "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/dashboard-coupons" className="w-full flex items-center">
          <AiOutlineGift
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
            Discount Codes
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 10 ?  "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
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
            Refunds
          </h5>
        </Link>
      </div>

      <div
        className={`w-full flex items-center p-4 rounded-l-2xl hover:bg-gray-200 dark:hover:bg-gray-800
        ${active === 11 ? "bg-gray-200 dark:bg-gray-800 " : ""}`}
      >
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            className={`${
              active === 11
                ? "text-[#1900ff]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11
              ? "text-[#1900ff]"
              : "text-gray-700 dark:text-gray-300"            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
