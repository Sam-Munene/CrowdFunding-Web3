import React, { useState } from "react";
import { BsRocket } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaWallet } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 backdrop-blur-2xl w-full mx-auto max-w-7xl   rounded-r-full rounded-l-full  bg-gradient-to-r from-orange-500 to-gray-600 dark:from-gray-900 dark:to-gray-700 shadow-lg z-50">
      <div className=" px-6 py-3 flex justify-between items-center">

        {/* 🚀 Logo */}
        <div className="flex items-center space-x-2">
          <BsRocket className="w-8 h-8 text-white" />
          <span className="text-white text-2xl font-bold">CrowdFund</span>
        </div>

        {/* 🔗 Navigation Links (Hidden on mobile) */}
        <ul className="hidden md:flex space-x-6 text-white font-semibold">
          <li className="hover:text-yellow-300 transition cursor-pointer">Home</li>
          <li className="hover:text-yellow-300 transition cursor-pointer">Explore</li>
          <li className="hover:text-yellow-300 transition cursor-pointer">My Campaigns</li>
          <li className="hover:text-yellow-300 transition cursor-pointer">About</li>
        </ul>

        {/* 🌙 Dark Mode & Connect Wallet */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-white text-2xl p-2 bg-gray-700 dark:bg-gray-300 rounded-full"
          >
            {darkMode ? <MdOutlineLightMode className="text-yellow-500" /> : <MdDarkMode />}
          </button>

          {/* Connect Wallet Button */}
          <button className="hidden md:flex bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg  items-center space-x-2">
            <FaWallet className="text-lg" />
            <span>Connect Wallet</span>
          </button>

          {/* 🍔 Mobile Menu Toggle */}
          <div onClick={() => setMenuOpen(!menuOpen)} className="md:hidden cursor-pointer text-white">
            {menuOpen ? <MdOutlineCancel className="text-white w-8 h-8" /> : <GiHamburgerMenu className="text-white w-8 h-8" />}
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden absolute left-0 top-[65px] w-full bg-gray-900 text-white text-center p-4 space-y-4 shadow-md">
          <li className="hover:text-yellow-300 transition cursor-pointer">Home</li>
          <li className="hover:text-yellow-300 transition cursor-pointer">Explore</li>
          <li className="hover:text-yellow-300 transition cursor-pointer">My Campaigns</li>
          <li className="hover:text-yellow-300 transition cursor-pointer">About</li>
          <button className="w-full bg-green-600 hover:bg-green-700 text-lg text-white font-bold py-2 px-6 rounded-lg">
            Connect Wallet
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
