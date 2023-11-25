import React from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'
import AdminSideBar from '../../components/Admin/Layout/AdminSideBar'
import AdminSubscription from "../../components/Admin/AdminSubscription";

const AdminDashboardSubscription = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={9} />
        </div>
         <AdminSubscription />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardSubscription