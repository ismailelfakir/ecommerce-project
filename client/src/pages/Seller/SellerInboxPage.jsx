import React from 'react'
import DashboardHeader from '../../components/Seller/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Seller/Layout/DashboardSideBar'
import DashboardMessages from "../../components/Seller/DashboardMessages";

const SellerInboxPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={8} />
      </div>
       <DashboardMessages />
    </div>
  </div>
  )
}

export default SellerInboxPage