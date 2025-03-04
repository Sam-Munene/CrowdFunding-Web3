import React from "react";

const CampaignCard = ({ image, title, description, raised, goal, daysLeft, onSupportClick, onViewTransactions }) => {
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <div className="light:bg-gray-300 dark:bg-gray-800  rounded-r-2xl rounded-l-2xl shadow-lg overflow-hidden w-full sm:w-[220px] transition hover:shadow-2xl">
      <img src={image} alt={title} className="w-full h-40 object-cover" />

      <div className="p-4">
        <h2 className="text-lg font-bold light:text-[#2ECC71] dark:text-white">{title}</h2>
        <p className="text-sm light:text-[#2ECC71] dark:text-white mt-2">
          {description.length > 100 ? description.substring(0, 100) + "..." : description}
        </p>


        <div className="mt-4">
          <div className="h-2 bg-gray-300 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-[#2ECC71] to-[#2ECC71] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm light:text-[#2ECC71] dark:text-white">
            <span className="font-bold">{Number(raised).toFixed(5)} </span> raised of {Number(goal).toFixed(5)} ETH
          </p>
          <span className="mt-1 light:text-[#2ECC71] dark:text-white">{daysLeft} days left</span>
        </div>

        {/* Support Campaign Button */}
        <button
          className="cursor-pointer mt-4 w-full bg-gradient-to-r from-[#34495E] to-[#2ECC71] text-white dark:text-white py-2 rounded-lg font-bold transition"
          onClick={() => onSupportClick({ image, title, description, raised, goal, daysLeft })}
        >
          Support Campaign
        </button>

        {/* View Transactions (Clickable Text) */}
        <p
          className="mt-3 text-center text-gray-500 dark:text-white hover:text-white cursor-pointer text-sm font-semibold"
          onClick={onViewTransactions}
        >
          View Transactions
        </p>
      </div>
    </div>
  );
};

export default CampaignCard;
