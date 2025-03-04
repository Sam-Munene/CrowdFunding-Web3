import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import CampaignCard from "./CampaignCard";
import DonationModal from "./DonationModal";
import TransactionsModal from "./TransactionsModal"; // Import TransactionsModal

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donors, setDonors] = useState([]);
  const [showTransactionsModal, setShowTransactionsModal] = useState(false); // New state for transactions modal

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // const fetchCampaigns = async () => {
  //   try {
  //     if (!window.ethereum) throw new Error("No crypto wallet found");

  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const contractAddress = "0xEeD8c686Dce9562A55691DC941aC973fba771cF9";
  //     const abi = [
  //       "function getCampaigns() public view returns (tuple(string title, string description, uint256 goal, uint256 deadline, string image, uint256 raisedAmount, address owner)[])",
  //       "function getDonors(uint256 campaignId) public view returns (address[] memory)",
  //       "function getDonationAmount(uint256 campaignId, address donor) public view returns (uint256)"
  //     ];

  //     const contract = new ethers.Contract(contractAddress, abi, provider);
  //     const campaignsData = await contract.getCampaigns();

  //     const formattedCampaigns = campaignsData.map((c, index) => ({
  //       id: index,
  //       title: c.title,
  //       description: c.description,
  //       goal: ethers.formatEther(BigInt(c.goal)),
  //       raised: ethers.formatEther(BigInt(c.raisedAmount)),
  //       deadline: Number(c.deadline),
  //       image: c.image,
  //       daysLeft: Math.max(0, Math.floor((Number(c.deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24))),
  //     }));

  //     setCampaigns(formattedCampaigns);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching campaigns:", error);
  //     setLoading(false);
  //   }
  // };


  const fetchCampaigns = async () => {
    try {
      // Use a public provider for reading data
      const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/EVY6szujl7Xlw4bTj6Pe2Fnx7H5azVo_");
      const contractAddress = "0xEeD8c686Dce9562A55691DC941aC973fba771cF9";
      const abi = [
        "function getCampaigns() public view returns (tuple(string title, string description, uint256 goal, uint256 deadline, string image, uint256 raisedAmount, address owner)[])",
        "function getDonors(uint256 campaignId) public view returns (address[] memory)",
        "function getDonationAmount(uint256 campaignId, address donor) public view returns (uint256)"
      ];
  
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const campaignsData = await contract.getCampaigns();
  
      const formattedCampaigns = campaignsData.map((c, index) => ({
        id: index,
        title: c.title,
        description: c.description,
        goal: ethers.formatEther(BigInt(c.goal)),
        raised: ethers.formatEther(BigInt(c.raisedAmount)),
        deadline: Number(c.deadline),
        image: c.image,
        daysLeft: Math.max(0, Math.floor((Number(c.deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24))),
      }));
  
      setCampaigns(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setLoading(false);
    }
  };

  
  const fetchDonors = async (campaignId) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractAddress = "0xEeD8c686Dce9562A55691DC941aC973fba771cF9";
      const abi = [
        "function getDonors(uint256 campaignId) public view returns (address[] memory)",
        "function getDonationAmount(uint256 campaignId, address donor) public view returns (uint256)"
      ];

      const contract = new ethers.Contract(contractAddress, abi, provider);
      const donorAddresses = await contract.getDonors(campaignId);
      const donorData = await Promise.all(
        donorAddresses.map(async (donor) => {
          const amount = await contract.getDonationAmount(campaignId, donor);
          return { donor, amount: ethers.formatEther(BigInt(amount)) };
        })
      );

      setDonors(donorData);
      setShowTransactionsModal(true); // Open transactions modal after fetching data
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  const handleSupportClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleViewTransactions = (campaignId) => {
    fetchDonors(campaignId);
  };

  const handleCloseModals = () => {
    setSelectedCampaign(null);
    setShowTransactionsModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-2 p-6">
      <h1 className="text-3xl font-bold text-center light:text-gray-800 dark:text-[#2ECC71]">
        Explore Campaigns
      </h1>

      {loading ? (
        <p className="text-center text-gray-300 mt-4">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-center text-gray-300 mt-4">No campaigns found</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard 
              key={campaign.id} 
              image={campaign.image}
              title={campaign.title}
              description={campaign.description}
              raised={campaign.raised}
              goal={campaign.goal}
              daysLeft={campaign.daysLeft}
              onSupportClick={() => handleSupportClick(campaign)} 
              onViewTransactions={() => handleViewTransactions(campaign.id)}
            />
          ))}
        </div>
      )}

      {/* Donation Modal */}
      {selectedCampaign && <DonationModal campaign={selectedCampaign} onClose={handleCloseModals} />}

      {/* Transactions Modal */}
      {showTransactionsModal && <TransactionsModal donors={donors} onClose={handleCloseModals} />}
    </div>
  );
};

export default Campaigns;
