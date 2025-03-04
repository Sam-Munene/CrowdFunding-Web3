import React from "react";

const campaigns = [
  {
    id: 1,
    title: "Clean Water for Africa",
    description: "Help provide clean drinking water to underserved communities.",
    target: 5000,
    raised: 3200,
    image: "https://flagcdn.com/w320/us.png",
  },
  {
    id: 2,
    title: "Education for All",
    description: "Support children's education with books and resources.",
    target: 10000,
    raised: 7800,
    image: "https://flagcdn.com/w320/gb.png",
  },
  {
    id: 3,
    title: "Renewable Energy Project",
    description: "Funding for solar panels in remote areas.",
    target: 20000,
    raised: 15400,
    image: "https://flagcdn.com/w320/ke.png",
  },
];

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Featured Campaigns
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-3">
              {campaign.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              {campaign.description}
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-gray-800 dark:text-white">
                  ${campaign.raised} Raised
                </span>
                <span className="text-gray-800 dark:text-white">
                  Target: ${campaign.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded-full mt-2">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                ></div>
              </div>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition-all">
              Support Campaign
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
