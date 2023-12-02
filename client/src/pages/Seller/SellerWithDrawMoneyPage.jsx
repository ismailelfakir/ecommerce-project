import React from 'react'
import DashboardHeader from '../../components/Seller/Layout/DashboardHeader'
import WithdrawMoney from "../../components/Seller/WithdrawMoney";
import DashboardSideBar from '../../components/Seller/Layout/DashboardSideBar';

const SellerWithDrawMoneyPage = () => {
  return (
    <div className="bg-gray-300 dark:bg-gray-900">
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default SellerWithDrawMoneyPage