import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DistrictSelector({ onSelect, lang, districts }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  function search(q) {
    setQuery(q);
    if (!q) return setSuggestions([]);
    const filtered = districts.filter((d) =>
      d.district_name.toLowerCase().includes(q.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }

  function useMyLocation() {
    if (!navigator.geolocation)
      return alert('Geolocation not available on this device');
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('User location:', pos.coords);
        // For now, just pick first district as a placeholder
        const autoDistrict = districts[0];
        if (autoDistrict) onSelect(autoDistrict.district_code);
        setLoading(false);
      },
      () => {
        alert('Could not determine your location');
        setLoading(false);
      }
    );
  }

  return (
    <div className="max-w-md mx-auto mb-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder={
              lang === 'en' ? 'Search your district' : 'अपना ज़िला खोजें'
            }
            className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
        <button
          onClick={useMyLocation}
          disabled={loading}
          className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-xl shadow active:scale-95 transition"
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
          <span className="text-sm">
            {lang === 'en' ? 'Use my location' : 'मेरी जगह'}
          </span>
        </button>
      </div>

      {suggestions.length > 0 && (
        <motion.ul
          className="mt-2 bg-white border border-gray-200 rounded-lg shadow"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {suggestions.map((s) => (
            <li
              key={s.district_code}
              onClick={() => onSelect(s.district_code)}
              className="p-3 hover:bg-blue-50 cursor-pointer"
            >
              {s.district_name}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
