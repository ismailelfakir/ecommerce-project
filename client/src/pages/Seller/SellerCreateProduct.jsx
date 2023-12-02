import React from "react";
import DashboardHeader from "../../components/Seller/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Seller/Layout/DashboardSideBar";
import CreateProduct from "../../components/Seller/CreateProduct";

const SellerCreateProduct = () => {
  return (
    <div className="bg-gray-300 dark:bg-gray-900">
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default SellerCreateProduct;
