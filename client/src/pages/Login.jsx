import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import Login from "../components/Login/Login";
import Hero from "../components/Route/Hero/Hero-S"

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  return (
    <div className='flex w-full h-full'>
      <div className='w-full md:w-[60%] h-full'><Login /></div>
      <div className={`w-[40%] h-screen bg-cover flex flex-col items-end md:flex hidden` }>
        <Hero />

      </div>

    </div>
  )
}

export default LoginPage