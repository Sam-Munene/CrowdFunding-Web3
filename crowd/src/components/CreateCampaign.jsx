import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCampaign = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "",
    deadline: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle image selection
  const handleImageUpload = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // Function to upload image to Pinata
  const uploadToPinata = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: file.name,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    try {
      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: "5f307a5170acba1e2020",
          pinata_secret_api_key: "92d2c713dc75e55e63e46529344bc50744aa17b3c53d5c3345022b045d85f834",
        },
      });

      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {

      toast.error("Failed uploading file to Pinata:");

      console.error("Error uploading file to Pinata:", error);
      return null;
    }
  };

  // Function to submit campaign
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = "0xEeD8c686Dce9562A55691DC941aC973fba771cF9";
      const abi = [
        "function createCampaign(string memory title, string memory description, uint256 goal, uint256 deadline, string memory image) public",
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Upload image to Pinata
      const imageUrl = await uploadToPinata(form.image);
      if (!imageUrl) {

        toast.error("Image upload failed");

        setLoading(false);
        return;
      }

      // Convert deadline to timestamp
      const deadlineTimestamp = Math.floor(new Date(form.deadline).getTime() / 1000);

      // Send transaction
      const tx = await contract.createCampaign(
        form.title,
        form.description,
        ethers.parseEther(form.goal), // Convert ETH to Wei
        deadlineTimestamp,
        imageUrl
      );

      await tx.wait();

      toast.success("Campaign created successfully!");

      setForm({ title: "", description: "", goal: "", deadline: "", image: null });
    } catch (error) {
      console.error(error);
      toast.error("Transaction failed!");

    }

    setLoading(false);
  };


  return (
    <div className="max-w-5xl mx-auto mt-20 p-8 bg-gradient-to-r from-[#2ECC71] to-[#34495E] text-dark rounded-lg shadow-lg flex flex-col md:flex-row gap-8 items-center">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl font-extrabold mb-4">🚀 Launch Your Campaign</h2>
        <p className="text-lg">Start raising funds for your project today! Fill in the details and get started.</p>
      </div>
      <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Campaign Title" value={form.title} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 text-black border border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none" required />
          <textarea name="description" placeholder="Describe your campaign..." value={form.description} onChange={handleChange} className="w-full p-3 h-28 rounded-lg text-black bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none" required></textarea>
          <input type="number" name="goal" placeholder="Goal Amount (ETH)" value={form.goal} onChange={handleChange} className="w-full p-3 text-black rounded-lg bg-gray-100  border border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none" required />
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="w-full p-3 text-black rounded-lg bg-gray-100  border border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none" required />
          <input type="file" onChange={handleImageUpload} className="w-full p-3 rounded-lg text-black bg-gray-100 border border-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none" required />
          <button type="submit" disabled={loading} className={`w-full py-3 rounded-full transition-all shadow-md transform hover:scale-105 bg-gradient-to-r from-[#34495E] to-[#2ECC71] ${loading ? "bg-gray-500" : "hover:bg-orange-500"} text-white font-bold`}>
            {loading ? "Submitting..." : "🚀 Launch Campaign"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
