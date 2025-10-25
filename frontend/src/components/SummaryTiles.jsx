import React from 'react';
import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SummaryTiles({ data, lang }) {
  if (!data) return null;

  const tiles = [
    {
      label_en: 'Individuals worked',
      label_hi: 'काम करने वाले व्यक्ति',
      value: data.total_individuals_worked?.toLocaleString() || '—',
      color: 'bg-green-100 text-green-800 border-green-300',
    },
    {
      label_en: 'Avg. days per household',
      label_hi: 'प्रति परिवार औसत कार्य दिवस',
      value: data.avg_days_per_household || '—',
      color: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      label_en: 'Payments within 15 days (%)',
      label_hi: '15 दिनों में भुगतान (%)',
      value: `${data.payments_generated_within_15_days || 0}%`,
      color: 'bg-blue-100 text-blue-800 border-blue-300',
    },
  ];

  function speak(text) {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
      window.speechSynthesis.speak(msg);
    }
  }

  return (
    <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
      {tiles.map((tile, i) => (
        <motion.div
          key={i}
          className={`p-5 rounded-2xl border shadow-sm ${tile.color} relative`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="text-3xl font-bold mb-1">{tile.value}</div>
          <div className="text-sm font-medium">
            {lang === 'en' ? tile.label_en : tile.label_hi}
          </div>
          <button
            onClick={() =>
              speak(
                `${lang === 'en' ? tile.label_en : tile.label_hi}: ${
                  tile.value
                }`
              )
            }
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-50"
          >
            <Volume2 className="w-4 h-4 text-gray-600" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
