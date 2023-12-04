import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);
  const [linkIndex, setLinkIndex] = useState(0);

  const backgrounds = [
    "./background0.png",
    "./background00.png",
    "./background.png",
  ];

  const titles = [
    "Explore Our Collection for Moroccan Products",
    "Explore Our Unique Moroccan Events",
    "Discover the Beauty of Moroccan Crafts",
  ];

  const descriptions = [
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, assumenda? Quisquam itaque exercitationem labore vel, dolore quidem asperiores, laudantium temporibus soluta optio consequatur aliquam deserunt officia. Dolorum saepe nulla provident.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus lorem ut odio luctus, non tincidunt libero feugiat. Duis ac odio sit amet erat molestie ultrices.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur varius turpis sed est interdum, ut molestie ex feugiat.",
  ];

  const links = ["/products", "/events", "/seller-create"];
  const linkTexts = ["Shop Now", "Explore Now", "Become Seller"];



  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
      setContentIndex((prevIndex) => (prevIndex + 1) % titles.length);
      setLinkIndex((prevIndex) => (prevIndex + 1) % links.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative w-full h-[100vh] bg-cover dark:bg-gray-900 ${styles.noramlFlex}`}

    >

      <div className="absolute bg-cover inset-0 w-full h-full z-0" style={{
        backgroundImage: `url(${backgrounds[backgroundIndex]})`,
      }}></div>
      <div className="absolute inset-0 w-full h-full backdrop-blur-[2px]"></div>
      <div className={`${styles.section} relative w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] dark:text-gray-100 font-[600] capitalize`}
        >
          {titles[contentIndex]}
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] dark:text-gray-300">
          {descriptions[contentIndex]}
        </p>
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
