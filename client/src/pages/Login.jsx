import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import Login from "../components/Login/Login";


const LoginPage = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isSeller])
  return (
    <div className='flex w-full h-full'>
      <div className='w-full md:w-[60%] h-full'><Login /></div>
      <div className={`w-[40%] h-screen bg-cover flex flex-col items-end md:flex hidden` } style={{
        backgroundImage:
          "url(./backgroundImg.jpg)",
      }}>
        <div className={`${styles.section} w-[90%] h-[90%] flex items-end`}>
          <h1
            className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
          >
            Best Collection for <br /> MOROCCAN PRODUCTS
            <br />
          <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5 bg-blue-600`}>
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                Shop Now
              </span>
            </div>
          </Link>
          </h1>
          
        </div>

      </div>

    </div>
  )
}

export default LoginPage