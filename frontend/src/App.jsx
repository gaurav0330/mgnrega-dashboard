import React, { useState, useEffect } from 'react';
import DistrictSelector from './components/DistrictSelector';
import SummaryTiles from './components/SummaryTiles';
import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';

export default function App() {
  const [districtCode, setDistrictCode] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [lang, setLang] = useState('en');
  const [districts, setDistricts] = useState([]);

  // Fetch all districts
  useEffect(() => {
    async function fetchDistricts() {
      try {
        const res = await fetch('https://mgnrega-dashboard-rpfi.onrender.com/api/v1/districts');
        if (!res.ok) throw new Error('Failed to fetch districts');
        const data = await res.json();
        setDistricts(data);
      } catch (err) {
        console.error('District fetch error:', err);
      }
    }
    fetchDistricts();
  }, []);

  async function fetchSummary(code) {
    try {
      const res = await fetch(`https://mgnrega-dashboard-rpfi.onrender.com/api/v1/district/${code}/summary`);
      if (!res.ok) throw new Error('Summary fetch error');
      const data = await res.json();
      setSummaryData(data);
    } catch (err) {
      console.error('Fetch summary error:', err);
      setSummaryData(null);
    }
  }

  function handleDistrictSelect(code) {
    setDistrictCode(code);
    fetchSummary(code);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <header className="bg-blue-700 text-white text-center py-4 shadow-md relative">
        <h1 className="text-2xl font-bold">
          {lang === 'en'
            ? 'Our Voice, Our Rights - MGNREGA'
            : 'हमारी आवाज़, हमारे अधिकार - मनरेगा'}
        </h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="absolute top-4 right-4 flex items-center space-x-1 bg-blue-600 px-2 py-1 rounded-md text-sm"
          aria-label="Toggle language"
        >
          <Globe2 className="w-4 h-4" />
          <span>{lang === 'en' ? 'हिंदी' : 'EN'}</span>
        </button>
      </header>

      <motion.main
        className="flex-1 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <DistrictSelector
          onSelect={handleDistrictSelect}
          lang={lang}
          districts={districts}
        />

        {districtCode && summaryData ? (
          <SummaryTiles data={summaryData} lang={lang} />
        ) : districtCode && !summaryData ? (
          <div className="text-center text-gray-500 mt-8">
            {lang === 'en'
              ? 'Loading data for this district...'
              : 'इस ज़िले के लिए डेटा लोड हो रहा है...'}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-8">
            {lang === 'en'
              ? 'Select a district to view MGNREGA performance.'
              : 'मनरेगा प्रदर्शन देखने के लिए एक ज़िला चुनें।'}
          </div>
        )}
      </motion.main>

      <footer className="text-center text-gray-500 py-4 text-sm">
        © 2025 Our Voice, Our Rights | Made for citizens of rural India
      </footer>
    </div>
  );
}
