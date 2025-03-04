import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom"; // Import useLocation
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import HeroSection from "./components/HeroSection";
import Campaigns from "./components/Campaigns";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import CreateCampaign from "./components/CreateCampaign";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
 
  const location = useLocation(); // Get the current route

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <main className={`min-h-screen pt-5 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"} transition-all duration-500`}>
      <Toaster position="top-left" reverseOrder={false} />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Sidebar />

      {/* Only show HeroSection & Campaigns on Home ("/") */}
      {location.pathname === "/" && (
        <>
          <HeroSection />
          <Campaigns />
        </>
      )}

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/create-campaign" element={<CreateCampaign />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
