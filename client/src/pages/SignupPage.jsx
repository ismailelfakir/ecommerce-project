import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import Signup from "../components/Singup/Singup";
import Hero from "../components/Route/Hero/Hero-S"

const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  return (
    <div className='flex w-full h-full dark:bg-gray-900'>
      <div className='w-full md:w-[60%] h-full dark:bg-gray-900'><Signup /></div>
      <div className={`w-[40%] h-screen bg-cover flex flex-col items-end md:flex hidden` }>
       <Hero />

      </div>

    </div>
  )
}

export default SignupPage;