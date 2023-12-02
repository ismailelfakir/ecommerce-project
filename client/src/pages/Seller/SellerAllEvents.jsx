import React from 'react'
import DashboardHeader from '../../components/Seller/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Seller/Layout/DashboardSideBar'
import AllEvents from "../../components/Seller/AllEvents";

const SellerAllEvents = () => {
    return (
      <div className="bg-gray-300 dark:bg-gray-900">
      <DashboardHeader />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                  <DashboardSideBar active={5} />
                </div>
                <div className="w-full justify-center flex">
                    <AllEvents />
                </div>
              </div>
        </div>
      )
}

export default SellerAllEvents