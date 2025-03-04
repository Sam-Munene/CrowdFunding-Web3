import React from "react";
import { motion } from "framer-motion";
import { Clipboard, X } from "lucide-react";
import toast from "react-hot-toast";

const TransactionsModal = ({ donors, onClose }) => {
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
   
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-70 z-50">
      {/* Modal Container with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-lg p-6 rounded-xl shadow-2xl w-[90%] max-w-2xl border border-gray-300 dark:border-gray-700"
      > 
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Donor Transactions</h2>
          <button
            className="text-gray-500 hover:text-red-500 transition"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div> 

        {/* Donor List */}
        {donors.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No donations yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {donors.map((donor, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-2">
                  <span className="truncate text-gray-700 dark:text-gray-300">{donor.donor}</span>
                  <button
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
                    onClick={() => handleCopy(donor.donor)}
                  >
                    <Clipboard size={18} />
                  </button>
                </div>
                <span className="font-bold text-green-700">{donor.amount} ETH</span>
              </li>
            ))}
          </ul>
        )}

        {/* Close Button */}
        <button
          className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-80 text-white py-2 rounded-lg font-bold transition"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default TransactionsModal;
