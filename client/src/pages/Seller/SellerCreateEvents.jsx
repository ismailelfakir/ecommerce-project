import React from 'react'
import DashboardHeader from '../../components/Seller/Layout/DashboardHeader'
import CreateEvent from "../../components/Seller/CreateEvent.jsx";
import DashboardSideBar from '../../components/Seller/Layout/DashboardSideBar';

const SellerCreateEvents = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-center justify-between w-full">
          <div className="w-[330px]">
            <DashboardSideBar active={6} />
          </div>
          <div className="w-full justify-center flex">
            <CreateEvent />
          </div>
        </div>
        </div>
      )
}

export default SellerCreateEvents