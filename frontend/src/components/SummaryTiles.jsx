import React, { useState } from "react";
import { Volume2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SummaryTiles({ data, lang }) {
  if (!data) return null;

  const [showHelp, setShowHelp] = useState(false);

  const helpText = {
    en: {
      people: "Total individuals who got at least one day of work under MGNREGA.",
      days: "Average days of work per registered household.",
      payment: "Percentage of payments generated within 15 days of work completion.",
    },
    hi: {
      people: "मनरेगा के तहत काम करने वाले कुल व्यक्तियों की संख्या।",
      days: "पंजीकृत परिवारों के लिए औसत कार्य दिवस।",
      payment: "कुल भुगतानों का प्रतिशत जो 15 दिनों में बनाए गए।",
    },
  };

  const tiles = [
    {
      label_en: "Individuals worked 👷‍♂️",
      label_hi: "काम करने वाले व्यक्ति 👷‍♀️",
      value: data.people_got_work?.toLocaleString() ?? "—",
      color: "bg-green-100 text-green-900 border-green-300",
      help: helpText[lang].people,
    },
    {
      label_en: "Avg. days per household 📅",
      label_hi: "औसत कार्य दिवस 📅",
      value: data.avg_days_per_household ?? "—",
      color: "bg-amber-100 text-amber-900 border-amber-300",
      help: helpText[lang].days,
    },
    {
      label_en: "Payments within 15 days (%) 💰",
      label_hi: "15 दिनों में भुगतान (%) 💰",
      value:
        data.payments_within_15_days != null
          ? `${data.payments_within_15_days.toFixed(1)}%`
          : "—",
      color: "bg-blue-100 text-blue-900 border-blue-300",
      help: helpText[lang].payment,
    },
  ];

  function speak(text) {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = lang === "en" ? "en-IN" : "hi-IN";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(msg);
    }
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-700">
          {lang === "en" ? "At a glance" : "एक नज़र में"}
        </h2>
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center space-x-1 text-blue-600 hover:underline"
        >
          <Info className="w-4 h-4" />
          <span>{lang === "en" ? "What does this mean?" : "यह क्या दर्शाता है?"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tiles.map((tile, i) => (
          <motion.div
            key={i}
            className={`p-5 rounded-2xl border shadow ${tile.color} relative text-center`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="text-3xl font-extrabold mb-1">{tile.value}</div>
            <div className="text-base font-medium">
              {lang === "en" ? tile.label_en : tile.label_hi}
            </div>
            <button
              onClick={() =>
                speak(
                  `${lang === "en" ? tile.label_en : tile.label_hi}: ${tile.value}`
                )
              }
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-gray-100 transition"
              title="Speak value"
            >
              <Volume2 className="w-4 h-4 text-gray-600" />
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 max-w-md text-gray-700"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-lg font-semibold mb-2">
                {lang === "en" ? "Understanding the metrics" : "आँकड़ों को समझें"}
              </h3>
              <ul className="space-y-2 text-sm">
                {tiles.map((t, i) => (
                  <li key={i}>
                    <b>{lang === "en" ? t.label_en : t.label_hi}:</b> {t.help}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                {lang === "en" ? "Close" : "बंद करें"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
