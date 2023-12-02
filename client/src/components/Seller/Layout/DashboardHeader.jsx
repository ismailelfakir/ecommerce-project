import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-gray-50 dark:bg-gray-800  shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          {/* <img
            src=""
            alt=""
          /> */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">LOGO</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard-coupons" className="800px:block hidden">
            <AiOutlineGift
              size={30}
              className="mx-5 cursor-pointer text-gray-900 dark:text-gray-100"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              size={30}
              className="mx-5 cursor-pointer text-gray-900 dark:text-gray-100"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              size={30}
              className="mx-5 cursor-pointer text-gray-900 dark:text-gray-100"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage 
            size={30}
             className="mx-5 cursor-pointer text-gray-900 dark:text-gray-100" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              size={30}
              className="mx-5 cursor-pointer text-gray-900 dark:text-gray-100"
            />
          </Link>
          <Link to={`/seller/${seller._id}`}>
            <img
              src={`${seller?.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
