import React from 'react'
import DashboardHeader from '../../components/Seller/Layout/DashboardHeader'
import Footer from '../../components/Layout/Footer'
import OrderDetails from "../../components/Seller/OrderDetails";

const ShopOrderDetails = () => {
  return (
    <div className="bg-gray-300 dark:bg-gray-900">
         <DashboardHeader />
         <OrderDetails />
          <Footer />
    </div>
  )
}

export default ShopOrderDetails