import React, { useState, useEffect } from "react";
import DistrictSelector from "./components/DistrictSelector";
import SummaryTiles from "./components/SummaryTiles";
import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";

export default function App() {
  const [districtCode, setDistrictCode] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [lang, setLang] = useState("en");
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    async function fetchDistricts() {
      try {
        const res = await fetch(`${API_BASE}/api/v1/districts`);
        if (!res.ok) throw new Error("Failed to fetch districts");
        const data = await res.json();
        setDistricts(data);
      } catch (err) {
        console.error("District fetch error:", err);
      }
    }
    fetchDistricts();
  }, [API_BASE]);

  async function fetchSummary(code) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/district/${code}/summary`);
      if (!res.ok) throw new Error("Failed to fetch summary");
      const data = await res.json();
      setSummaryData(data);
    } catch (err) {
      console.error("Fetch summary error:", err);
      setSummaryData(null);
    } finally {
      setLoading(false);
    }
  }

  function handleDistrictSelect(code) {
    setDistrictCode(code);
    fetchSummary(code);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-blue-700 to-blue-800 text-white py-4 shadow-lg">
        <motion.h1
          className="text-center text-3xl sm:text-4xl font-extrabold tracking-wide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {lang === "en"
            ? "Our Voice, Our Rights – MGNREGA"
            : "हमारी आवाज़, हमारे अधिकार – मनरेगा"}
        </motion.h1>

        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="absolute top-4 right-4 flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl text-sm backdrop-blur-sm transition"
        >
          <Globe2 className="w-4 h-4" />
          <span className="font-medium">{lang === "en" ? "हिंदी" : "EN"}</span>
        </button>
      </header>

      {/* Main content */}
      <motion.main
        className="flex-1 p-5 sm:p-8 max-w-3xl mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <DistrictSelector
          onSelect={handleDistrictSelect}
          lang={lang}
          districts={districts}
        />

        {loading ? (
          <div className="text-center text-gray-500 mt-8 text-lg animate-pulse">
            {lang === "en"
              ? "Loading data for this district..."
              : "इस ज़िले के लिए डेटा लोड हो रहा है..."}
          </div>
        ) : districtCode && summaryData ? (
          <SummaryTiles data={summaryData} lang={lang} />
        ) : (
          <motion.div
            className="text-center text-gray-500 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {lang === "en"
              ? "Select a district to view MGNREGA performance."
              : "मनरेगा प्रदर्शन देखने के लिए एक ज़िला चुनें।"}
          </motion.div>
        )}
      </motion.main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 text-sm border-t border-gray-200">
        © 2025 Our Voice, Our Rights | Empowering rural citizens
      </footer>
    </div>
  );
}
