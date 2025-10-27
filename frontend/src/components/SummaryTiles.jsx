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

  // Calculate visual indicators
  const paymentValue = data.payments_within_15_days ?? 0;
  const paymentIcon = paymentValue >= 80 ? "🟢" : paymentValue >= 50 ? "🟡" : "🔴";
  const daysValue = data.avg_days_per_household ?? 0;
  const daysIcon = daysValue >= 80 ? "🟢" : daysValue >= 50 ? "🟡" : "🔴";
  const peopleCount = data.people_got_work ?? 0;
  const peopleIcon = peopleCount > 50000 ? "🟢" : peopleCount > 20000 ? "🟡" : "🔴";

  const tiles = [
    {
      label_en: "👷‍♂️ People Who Got Work",
      label_hi: "👷‍♂️ काम मिलने वाले लोग",
      value: peopleCount?.toLocaleString() ?? "—",
      subvalue: `${peopleIcon} `,
      color: "bg-gradient-to-br from-green-100 to-green-200 text-green-900 border-green-400",
      help: helpText[lang].people,
      icon: peopleIcon,
    },
    {
      label_en: "📅 Work Days Per Family",
      label_hi: "📅 प्रति परिवार कार्य दिवस",
      value: daysValue?.toFixed(1) ?? "—",
      subvalue: daysIcon,
      color: "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-900 border-amber-400",
      help: helpText[lang].days,
      icon: daysIcon,
    },
    {
      label_en: "💰 Fast Payments",
      label_hi: "💰 तुरंत भुगतान",
      value:
        data.payments_within_15_days != null
          ? `${data.payments_within_15_days.toFixed(0)}%`
          : "—",
      subvalue: paymentIcon,
      color: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900 border-blue-400",
      help: helpText[lang].payment,
      icon: paymentIcon,
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
            className={`p-6 rounded-3xl border-2 shadow-lg ${tile.color} relative text-center hover:scale-105 transition-transform`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="text-5xl mb-3">{tile.icon}</div>
            <div className="text-4xl font-black mb-2">{tile.value}</div>
            <div className="text-lg font-semibold">
              {lang === "en" ? tile.label_en : tile.label_hi}
            </div>
            <button
              onClick={() =>
                speak(
                  `${lang === "en" ? tile.label_en : tile.label_hi}: ${tile.value}`
                )
              }
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:bg-white transition"
              title="Speak value"
            >
              <Volume2 className="w-5 h-5 text-gray-700" />
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
