import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";


const DonationModal = ({ campaign, onClose }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    if (!window.ethereum) return alert("Please connect a crypto wallet.");
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return alert("Enter a valid donation amount.");
    if (!campaign || typeof campaign.id === "undefined") {
      console.error("Invalid campaign data:", campaign);

      return toast.error("Invalid campaign data. Please try again.");

    }
  
    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = "0xEeD8c686Dce9562A55691DC941aC973fba771cF9";
      const abi = ["function donateToCampaign(uint256 campaignId) public payable"];
  
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.donateToCampaign(campaign.id, { value: ethers.parseEther(amount.toString()) });
  
      await tx.wait();
      toast.success("Donation successful!");
      setAmount("");
      onClose();
    } catch (error) {
      console.error("Donation failed:", error);
      toast.error("Donation failed. Try again");

    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-end">
      <div className="w-100 h-[90%] mt-20 rounded-b-2xl bg-gray-800 p-6 shadow-lg flex flex-col">
        <button className="text-white self-start text-2xl" onClick={onClose}>&times;</button>
        <img src={campaign.image} alt={campaign.title} className="w-full h-40 object-cover mb-4 rounded" />
        <h2 className="text-xl font-bold text-white mb-4">{campaign.title}</h2>

        <p className="text-white mb-2">{campaign.description}</p>
        <p className="text-green-400 font-bold mb-2">Target: {campaign.goal} ETH</p>
        <p className="text-blue-400 font-bold mb-4">Raised: {campaign.raised} ETH</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in ETH"
          className="w-full p-2 rounded text-white" 
        />
        <button
          onClick={handleDonate}
          className="mt-4 bg-orange-500 text-white py-2 rounded-full font-bold"
          disabled={isLoading}
        >
          {isLoading ? "Donating..." : "Donate"}
        </button>
      </div>
    </div>
  );
};

export default DonationModal;
