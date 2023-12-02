import React from "react";
import styles from "../../styles/styles";
import SellerInfo from "../../components/Seller/SellerInfo";
import SellerProfileData from "../../components/Seller/SellerProfileData";

const SellerHomePage = () => {
  return (
    <div className={`${styles.section} bg-gray-300 dark:bg-gray-900`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <SellerInfo isOwner={true} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <SellerProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default SellerHomePage;
