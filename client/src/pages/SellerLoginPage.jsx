import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SellerLogin from '../components/Seller/SellerLogin';

const SellerLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller , seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/seller/${seller._id}`);
    }
  }, [])
  return (
    <div>
        <SellerLogin />
    </div>
  )
}

export default SellerLoginPage