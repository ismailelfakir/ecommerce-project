import React from "react";
import DashboardHeader from "../../components/Seller/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Seller/Layout/DashboardSideBar";
import AllCoupons from "../../components/Seller/AllCoupons.jsx";

const SellerAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default SellerAllCoupons;