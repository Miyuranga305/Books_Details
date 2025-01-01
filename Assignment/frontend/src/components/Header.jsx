import React, { useState, useEffect, useRef } from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoLogOutOutline } from 'react-icons/io5';
import book from '../assets/booklogo.svg';
import { SlSocialLinkedin } from "react-icons/sl";
import profile from '../assets/headerIcons/profile-pic.png'; // Replace with actual path to the profile image
import { PiBellRinging } from "react-icons/pi";
import Settings from '../assets/headerIcons/settings.svg'; // Replace with actual settings icon path

const Header = () => {
  const [branchDropDownOpen, setbranchDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setbranchDropDownOpen(!branchDropDownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setbranchDropDownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-6 sm:px-8 md:px-12 relative">
      <h1 className="text-[16px] sm:text-[24px] md:text-[28px] lg:text-[36px] font-extrabold text-center mb-4">Book Search App</h1>
      
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <img src={book} alt="Book Logo" className="h-12 sm:h-16 w-12 sm:w-16 object-cover" />
          <a
            href="https://www.linkedin.com/in/ravindu-adhikari-294108243/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block ml-4"
          >
            <SlSocialLinkedin className="w-12 h-12 sm:w-16 sm:h-16 text-white hover:text-yellow-200 transition-colors duration-200" />
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative cursor-pointer">
            <span className="absolute -top-2 -right-2 h-[18px] w-[18px] bg-[#e02222] rounded-full text-xs text-white flex items-center justify-center">
              9
            </span>
            <PiBellRinging className="w-8 h-8" />
          </div>
          
          {/* User Info & Profile Dropdown */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-white font-medium text-sm">Ravindu Adhikari</span>
              <p className="text-gray-200 text-xs">rmiyuranga97@gmail.com</p>
            </div>
            <img
              src={profile}
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="relative" ref={dropdownRef}>
              <span
                onClick={toggleDropdown}
                className="cursor-pointer text-white"
              >
                <IoIosArrowDown
                  className={`w-5 h-5 transition-transform duration-200 ${branchDropDownOpen ? 'rotate-180' : ''}`}
                />
              </span>
              {branchDropDownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-700 shadow-lg rounded-lg overflow-hidden">
                  <ul className="py-2">
                    <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                      <img src={Settings} alt="Settings" className="w-5 h-5" />
                      <span className="ml-3">Profile Settings</span>
                    </li>
                    <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                      <FaRegQuestionCircle className="text-lg" />
                      <span className="ml-3">Help Center</span>
                    </li>
                    <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                      <FaRegMoon className="text-lg" />
                      <span className="ml-3">Dark Mode</span>
                    </li>
                    <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                      <IoLogOutOutline className="text-lg" />
                      <span className="ml-3">Log Out</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
