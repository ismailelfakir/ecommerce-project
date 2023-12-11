import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [contentIndex, setContentIndex] = useState(0);
    const [linkIndex, setLinkIndex] = useState(0);

    const backgrounds =
        ["./background1.png"]
        ;

    const titles =
        ["Explore Our Collection for Moroccan Products"]
        ;

    const descriptions =
        ["Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, assumenda? Quisquam itaque exercitationem labore vel, dolore quidem asperiores, laudantium temporibus soluta optio consequatur aliquam deserunt officia. Dolorum saepe nulla provident."]
        ;

    const links = ["/products"];
    const linkTexts = ["Shop Now"];



    useEffect(() => {
        setBackgroundIndex(0);
        setContentIndex(0);
        setLinkIndex(0);

    }, []);

    return (
        <div
            className={`relative w-full h-full bg-cover dark:bg-gray-900 ${styles.noramlFlexS}`}
        >
            <div className="absolute bg-cover inset-0 w-full h-full z-0" style={{
                backgroundImage: `url(${backgrounds[backgroundIndex]})`,
            }}></div>
            <div className="absolute inset-0 w-full h-full  "></div>
            <div className={`relative w-[90%] 800px:w-[90%] h-[80vh] m-auto flex flex-col justify-end`}>
                <h1
                    className={`text-[35px] leading-[1.2] 800px:text-[50px] dark:text-gray-100 font-[600] capitalize`}
                >
                    {titles[contentIndex]}
                </h1>
                <div className="flex items-center  mt-5 ml-10">
                    <div className="bg-green-500 rounded-full p-[2px] inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-5 h-5">
                            <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06l2.25 2.25 6.72-6.72a.75.75 0 0 1 1.06 0z" />
                        </svg>
                    </div>
                    <div className="text-gray-800 ml-2 font-[500]  dark:text-gray-100 ">Dress in the elegance of tradition with our cultural collection.</div>
                </div>
                <div className="flex items-center  mt-3 ml-10">
                    <div className="bg-green-500 rounded-full p-[2px] inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-5 h-5">
                            <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06l2.25 2.25 6.72-6.72a.75.75 0 0 1 1.06 0z" />
                        </svg>
                    </div>
                    <div className="text-gray-800 ml-2 font-[500]  dark:text-gray-100 ">Experience the perfect fit with our virtual try-on feature.</div>
                </div>
                <div className="flex items-center mt-3 ml-10">
                    <div className="bg-green-500 rounded-full p-[2px] inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-5 h-5">
                            <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06l2.25 2.25 6.72-6.72a.75.75 0 0 1 1.06 0z" />
                        </svg>
                    </div>
                    <div className="text-gray-800 ml-2 font-[500]  dark:text-gray-100 ">Preserve the art of tradition with our easy-care instructions.</div>
                </div>
                

                <Link to={links[linkIndex]} className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            {linkTexts[linkIndex]}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
