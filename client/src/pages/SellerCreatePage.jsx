import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SellerCreate from "../components/Seller/SellerCreate";

const SellerCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller , seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/seller/${seller._id}`);
    }
  }, [])
  return (
    <div>
      <SellerCreate />
    </div>
  );
};

export default SellerCreatePage;
