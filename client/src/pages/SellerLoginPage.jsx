import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SellerLogin from '../components/Seller/SellerLogin';
import Hero from "../components/Route/Hero/Hero-S"


const SellerLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isSeller])
  return (
    <div className='flex w-full h-full'>
      <div className='w-full md:w-[60%] h-full'><SellerLogin /></div>
      <div className={`w-[40%] h-screen bg-cover flex flex-col items-end md:flex hidden` } >
        <Hero />

      </div>

    </div>
  )
}

export default SellerLoginPage