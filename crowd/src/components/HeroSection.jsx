import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#34495E] to-[#2ECC71] dark:from-gray-900 dark:to-gray-700 text-white py-6 px-6 text-center rounded-xl shadow-lg max-w-5xl mx-auto mt-30">
      
      {/* Headline & Description */}
      <h1 className="text-4xl md:text-5xl font-bold">
        Empower Ideas, Fund Dreams! 🚀
      </h1>
      <p className="mt-4 text-lg max-w-2xl mx-auto">
        Join our community and support innovative projects that make an impact. 
        Start a campaign or contribute today!
      </p>

      {/* CTA Button */}
      <Link to='/create-campaign'>
      <button className="cursor-pointer mt-6 bg-gradient-to-r from-orange-400 to-yellow-800  hover:scale-110 text-white px-6 py-3 text-lg font-bold rounded-full shadow-md transition">
         Start a Campaign
      </button>
      </Link>

      {/* Quick Stats */}
      <div className="mt-8 flex justify-center gap-10 text-lg">
        <div>
          <span className="font-bold text-2xl">1,245+</span> <br /> Campaigns
        </div>
        <div>
          <span className="font-bold text-2xl">$3.5M+</span> <br /> Raised
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
