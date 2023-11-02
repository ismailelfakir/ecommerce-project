import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SellerLogin from '../components/Seller/SellerLogin';

const SellerLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller , isLoading} = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/dashboard`);
    }
  }, [isLoading , isSeller])
  return (
    <div>
        <SellerLogin />
    </div>
  )
}

export default SellerLoginPage