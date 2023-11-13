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
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 1 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 2 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 3 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiPackage size={30} color={`${active === 3 ? "#1900ff" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 4 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 5 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 6 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile
            size={30}
            color={`${active === 6 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 7 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 8 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 9 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link to="/dashboard-coupouns" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 10 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div
      className= {`w-full flex items-center p-4 rounded-lg hover:bg-[#F6F6F5] 
      ${active === 11 ? "bg-[#F6F6F5] " : "" }`}
      >
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 11 ? "#1900ff" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[#1900ff]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
