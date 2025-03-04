import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoneyBills } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { CiBullhorn } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiMenuAlt3 } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import { GiWallet } from "react-icons/gi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close sidebar when a link is clicked
  const handleCloseSidebar = () => setIsOpen(false);

  return (
    <div className="hidden md:flex">
      <div
        className={`${
          isOpen ? "w-64" : "w-15"
        } backdrop-blur-2xl bg-[#34495E]/90 rounded-b-2xl z-10 rounded-t-2xl text-white fixed top-[120px] left-[20px] p-4 transition-all duration-500 shadow-lg`}
      >
        {/* Toggle Button */}
        <button
          className="cursor-pointer absolute top-5 right-[-20px] bg-[#2ECC71] p-1 rounded-full hover:bg-[#27AE60] transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ImCancelCircle className="text-white w-6 h-6" />
          ) : (
            <HiMenuAlt3 className="text-white w-6 h-6" />
          )}
        </button>

        {/* Sidebar Menu */}
        <ul className="space-y-3 mt-10">
          <SidebarItem
            to="/"
            icon={<LuLayoutDashboard />}
            text="Home"
            isOpen={isOpen}
            closeSidebar={handleCloseSidebar}
          />
          <SidebarItem
            to="/create-campaign"
            icon={<IoAddCircle />}
            text="Create"
            isOpen={isOpen}
            closeSidebar={handleCloseSidebar}
          />
          <SidebarItem
            to="/#"
            icon={<CiBullhorn />}
            text="Announce"
            isOpen={isOpen}
            closeSidebar={handleCloseSidebar}
          />
          <SidebarItem
            to="/#"
            icon={<GiWallet />}
            text="Wallet"
            isOpen={isOpen}
            closeSidebar={handleCloseSidebar}
          />
          <SidebarItem
            to="/#"
            icon={<CgProfile />}
            text="Account"
            isOpen={isOpen}
            closeSidebar={handleCloseSidebar}
          />
          <SidebarItem
            to="/#"
            icon={<IoMdLogOut />}
            text="Logout"
            isOpen={isOpen}
            closeSidebar={handleCloseSidebar}
          />
        </ul>
      </div>
    </div>
  );
};

// Sidebar Item Component for Reusability
const SidebarItem = ({ to, icon, text, isOpen, closeSidebar }) => (
  <li className="cursor-pointer flex items-center space-x-2 p-1 rounded-md transition-all duration-300 hover:bg-gradient-to-r hover:from-[#34495E] hover:to-[#2ECC71]">
    <Link
      to={to}
      className="flex items-center w-full"
      onClick={closeSidebar}
    >
      <span className="w-12 h-10 scale-150 flex items-center justify-center text-[#2ECC71] hover:text-[#27AE60]">
        {icon}
      </span>
      {isOpen && (
        <span className="text-lg text-white hover:text-white transition">
          {text}
        </span>
      )}
    </Link>
  </li>
);

export default Sidebar;
