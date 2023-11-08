import React from 'react'
import DashboardHeader from '../../components/Seller/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Seller/Layout/DashboardSideBar';
import ShopSettings from "../../components/Seller/SellerSettings.jsx";

const SellerSettingsPage = () => {
    return (
        <div>
          <DashboardHeader />
          <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={11} />
            </div>
            <ShopSettings />
          </div>
        </div>
      );
}

export default SellerSettingsPage