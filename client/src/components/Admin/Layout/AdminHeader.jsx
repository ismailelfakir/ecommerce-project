import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
    const {user} = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-gray-50 dark:bg-gray-800  shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          {/* <img
            src=""
            alt=""
          /> */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">LOGO</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {/* <Link to="/dashboard/coupons" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link> */}
          <Link to="/admin/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              size={30}
              className="mx-5 cursor-pointer text-gray-900 dark:text-gray-100"
           
            />
          </Link>
          <Link to="/admin/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              size={30}
              className="mx-5 cursor-pointer text-gray-900 dark:text-gray-100"
            />
          </Link>
          <Link to="/admin/dashboard-orders" className="800px:block hidden">
            <FiPackage  size={30}
              className="mx-5 cursor-pointer text-gray-900 dark:text-gray-100"
           />
          </Link>
          <Link to="/admin-all-conversation" className="800px:block hidden">
            <BiMessageSquareDetail
              size={30}
              className="mx-5 cursor-pointer text-gray-900 dark:text-gray-100"
           
            />
          </Link>
            <img
              src={`${user?.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
        </div>
      </div>
    </div>
  )
}

export default AdminHeader