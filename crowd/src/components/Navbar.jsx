import React, { useEffect, useState } from "react";
import { BsRocket } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel, MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const userAccounts = await provider.send("eth_requestAccounts", []);
      const walletBalance = await provider.getBalance(userAccounts[0]);

      if (userAccounts.length > 0) {
        setAccounts(userAccounts);
        setActiveAccount(userAccounts[0]);
        fetchBalance(userAccounts[0]);
        toast.success("Successfully connected");
      }
    } catch (error) {
      toast.error("Failed to connect to MetaMask");
    }
  };

  const fetchBalance = async (account) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      const userBal = ethers.formatEther(balance);
      const blnza = parseFloat(userBal).toFixed(4);

      setUserBalance(blnza);
    } catch (error) {
      setUserBalance(null);
    }
  };

  useEffect(() => {
    if (activeAccount) fetchBalance(activeAccount);
  }, [activeAccount]);

  return (
    <nav className="fixed top-6 mx-6 w-[95%] rounded-r-full rounded-l-full bg-gradient-to-r from-[#34495E] to-[#2ECC71] shadow-lg z-50">
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BsRocket className="w-8 h-8 text-white" />
          <span className="text-white text-2xl font-bold">CrowdFund</span>
        </div>

        <ul className="space-x-6 hidden md:flex cursor-pointer">
          <li className="font-bold hover:text-[#E67E22] text-lg text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="font-bold hover:text-[#E67E22] text-lg text-white">Explore</li>
          <Link to="/create-campaign">
            <li className="font-bold hover:text-[#E67E22] text-lg text-white">Create</li>
          </Link>
          <li className="font-bold hover:text-[#E67E22] text-lg text-white">About</li>
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer text-white text-2xl p-2 bg-[#34495E] rounded-full border border-gray-200"
          >
            {darkMode ? <MdOutlineLightMode className="text-yellow-500" /> : <MdDarkMode />}
          </button>

          <div className="relative">
            <button
              onClick={accounts.length === 0 ? connectWallet : () => setDropdownOpen(!dropdownOpen)}
              className="hidden md:flex space-x-2 text-[14px] bg-[#34495E] hover:bg-[#34495A] text-white font-semibold px-4 py-2 rounded-lg items-center"
            >
              <FaWallet className="text-lg" />
              {activeAccount ? (
                <span>{activeAccount.slice(0, 5)}...{activeAccount.slice(-4)} {userBalance} ETH</span>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>

            {dropdownOpen && accounts.length > 1 && (
              <ul className="absolute right-0 mt-2 w-50 bg-[#34495E] border border-gray-400 rounded-lg shadow-lg overflow-hidden z-10">
                {accounts.map((account, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveAccount(account);
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#2ECC71] text-white ${
                      activeAccount === account ? "font-bold bg-[#27AE60]" : ""
                    }`}
                  >
                    {account.slice(0, 5)}...{account.slice(-4)} {userBalance} ETH
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div onClick={() => setMenuOpen(!menuOpen)} className="md:hidden cursor-pointer text-white">
            {menuOpen ? <MdOutlineCancel className="text-white w-8 h-8" /> : <HiMenuAlt3 className="text-white w-8 h-8" />}
          </div>
        </div>
      </div>

      {menuOpen && (
        <ul className="md:hidden absolute left-0 top-[65px] w-full bg-[#34495E] text-white text-center p-4 space-y-4 shadow-md">
          <li className="hover:text-[#E67E22] transition cursor-pointer">Home</li>
          <li className="hover:text-[#E67E22] transition cursor-pointer">Explore</li>
          <Link to="/create-campaign">
            <li className="hover:text-[#E67E22] transition cursor-pointer">Create</li>
          </Link>
          <li className="hover:text-[#E67E22] transition cursor-pointer">My Campaigns</li>
          <button
            onClick={connectWallet}
            className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-lg text-white font-bold py-2 px-6 rounded-lg"
          >
            {activeAccount ? `${activeAccount.slice(0, 5)}...${activeAccount.slice(-4)}` : "Connect Wallet"}
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
