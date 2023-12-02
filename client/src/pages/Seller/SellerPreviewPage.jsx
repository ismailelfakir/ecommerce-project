import React from 'react'
import styles from '../../styles/styles'
import SellerInfo from "../../components/Seller/SellerInfo";
import SellerProfileData from "../../components/Seller/SellerProfileData";

const SellerPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-gray-200 dark:bg-gray-900`}>
         <div className="w-full 800px:flex py-10 justify-between">
          <div className="800px:w-[25%] rounded-lg bg-gray-50 dark:bg-gray-950 shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
            <SellerInfo isOwner={false} />
          </div>
          <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-lg">
            <SellerProfileData isOwner={false} />
          </div>
         </div>
    </div>
  )
}

export default SellerPreviewPage