import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function DistrictSelector({ onSelect, lang, districts }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  function search(q) {
    setQuery(q);
    if (!q) return setSuggestions([]);
    const filtered = districts.filter((d) =>
      d.district_name.toLowerCase().includes(q.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 6));
  }

  async function reverseGeocode(lat, lon) {
    try {
      // Using free reverse geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=5`
      );
      const data = await response.json();
      const address = data.address || {};
      
      // Extract district name (might be in city, county, or state_district)
      const districtName = address.city || address.county || address.state_district || '';
      
      if (districtName) {
        // Find matching district
        const matched = districts.find(d => 
          d.district_name.toLowerCase().includes(districtName.toLowerCase()) ||
          districtName.toLowerCase().includes(d.district_name.toLowerCase())
        );
        return matched;
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
    }
    return null;
  }

  async function useMyLocation() {
    if (!navigator.geolocation) {
      alert(
        lang === "en"
          ? "Geolocation not supported on this device."
          : "इस डिवाइस पर स्थान सेवा उपलब्ध नहीं है।"
      );
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("Location:", latitude, longitude);
        
        // Try to find district from location
        const matchedDistrict = await reverseGeocode(latitude, longitude);
        
        if (matchedDistrict) {
          onSelect(matchedDistrict.district_code);
          alert(
            lang === "en"
              ? `Detected district: ${matchedDistrict.district_name}`
              : `पता चला जिला: ${matchedDistrict.district_name}`
          );
        } else {
          alert(
            lang === "en"
              ? "Could not identify your district from location. Please select manually."
              : "आपके स्थान से ज़िला पहचान नहीं हो सका। कृपया मैन्युअल रूप से चुनें।"
          );
        }
        setLoading(false);
      },
      () => {
        alert(
          lang === "en"
            ? "Could not detect your location."
            : "आपका स्थान ज्ञात नहीं हो सका।"
        );
        setLoading(false);
      }
    );
  }

  return (
    <motion.div
      className="max-w-lg mx-auto mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder={
              lang === "en" ? "Search your district" : "अपना ज़िला खोजें"
            }
            className="w-full pl-10 p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg shadow-sm"
          />
        </div>

        <button
          onClick={useMyLocation}
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-2xl shadow hover:bg-blue-700 active:scale-95 transition"
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">
            {lang === "en" ? "Use my location" : "मेरी जगह"}
          </span>
        </button>
      </div>

      {suggestions.length > 0 && (
        <motion.ul
          className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg divide-y divide-gray-100"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {suggestions.map((s) => (
            <li
              key={s.district_code}
              onClick={() => onSelect(s.district_code)}
              className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700"
            >
              {s.district_name}
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
