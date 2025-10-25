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

  function useMyLocation() {
    if (!navigator.geolocation)
      return alert(
        lang === "en"
          ? "Geolocation not supported on this device."
          : "इस डिवाइस पर स्थान सेवा उपलब्ध नहीं है।"
      );

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Location:", pos.coords);
        // TODO: Reverse geocode lat/lon → district
        const autoDistrict = districts[0];
        if (autoDistrict) onSelect(autoDistrict.district_code);
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
