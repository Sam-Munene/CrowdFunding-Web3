import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import CampaignCard from "./CampaignCard";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractAddress = "0x993F38E30e344A7641a0EEe9fb3047B83fB831aB";
      const abi = [
        "function getCampaign() public view returns (tuple(string title, string description, uint256 goal, uint256 deadline, string image)[])",
      ];
      

      const contract = new ethers.Contract(contractAddress, abi, provider);
      const campaignsData = await contract.getCampaign();


      const formattedCampaigns = campaignsData.map((c, index) => ({
  id: index,  // Generate an ID since your contract does not return one
  title: c.title,
  description: c.description,
  goal: ethers.formatEther(c.goal),
  deadline: c.deadline,
  image: c.image,
}));


      setCampaigns(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-200 dark:text-white">
        Explore Campaigns
      </h1>

      {loading ? (
        <p className="text-center text-gray-300 mt-4">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-center text-gray-300 mt-4">No campaigns found</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;
