import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const html = document.querySelector("html");
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      html.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className="fixed bottom-4 right-4 flex items-center bg-white dark:bg-gray-800 p-2 rounded-full shadow-md cursor-pointer"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <>
          <FaSun className="text-yellow-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">Light Mode</span>
        </>
      ) : (
        <>
          <FaMoon className="text-gray-600 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
        </>
      )}
    </div>
  );
};

export default DarkModeToggle;
