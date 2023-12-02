import React from 'react'
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from '../../components/Admin/Layout/AdminSideBar'
import AllOrders from '../../components/Admin/AllOrders';

const AdminDashboardEvents = () => {
  return (
    <div className="bg-gray-300 dark:bg-gray-900">
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={2} />
        </div>
        <AllOrders />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardEvents