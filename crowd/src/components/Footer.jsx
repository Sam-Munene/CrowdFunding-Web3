import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left Section: Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">CrowdFund</h2>
          <p className="mt-2 text-gray-400 text-sm">
            Empowering dreams through community-driven crowdfunding. Join us to make a difference!
          </p>
        </div>

        {/* Center Section: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-orange-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">About</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Campaigns</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Right Section: Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={22} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedin size={22} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaGithub size={22} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Section: Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CrowdFund. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
