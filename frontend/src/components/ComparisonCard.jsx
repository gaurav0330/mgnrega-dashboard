import React from "react";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ComparisonCard({ comparisonData, lang }) {
  if (!comparisonData || !comparisonData.current) return null;

  const { current, previous, lastYear } = comparisonData;

  const calculateChange = (current, previous) => {
    if (!current || !previous) return null;
    const change = ((current - previous) / previous) * 100;
    return {
      percent: Math.abs(change).toFixed(1),
      isPositive: change >= 0
    };
  };

  const peopleChange = calculateChange(current.people_got_work, previous?.people_got_work);
  const daysChange = calculateChange(current.avg_days_per_household, previous?.avg_days_per_household);
  const paymentsChange = calculateChange(current.payments_within_15_days, previous?.payments_within_15_days);

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        {lang === "en" ? "📊 Compare with Previous Month" : "📊 पिछले महीने से तुलना"}
      </h3>

      <div className="space-y-4">
        {/* People Comparison */}
        {peopleChange && (
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">
                {lang === "en" ? "People Got Work" : "काम मिलने वाले लोग"}
              </span>
              <div className="flex items-center space-x-2">
                {peopleChange.isPositive ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <span
                  className={`font-bold ${
                    peopleChange.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {peopleChange.isPositive ? '+' : '-'}{peopleChange.percent}%
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{previous.people_got_work?.toLocaleString()} →</span>
              <ArrowRight className="w-4 h-4" />
              <span className="font-semibold text-gray-800">
                {current.people_got_work?.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Days Comparison */}
        {daysChange && (
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">
                {lang === "en" ? "Avg Days per Household" : "औसत दिन प्रति परिवार"}
              </span>
              <div className="flex items-center space-x-2">
                {daysChange.isPositive ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <span
                  className={`font-bold ${
                    daysChange.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {daysChange.isPositive ? '+' : '-'}{daysChange.percent}%
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{previous.avg_days_per_household?.toFixed(1)} →</span>
              <ArrowRight className="w-4 h-4" />
              <span className="font-semibold text-gray-800">
                {current.avg_days_per_household?.toFixed(1)}
              </span>
            </div>
          </div>
        )}

        {/* Payments Comparison */}
        {paymentsChange && (
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">
                {lang === "en" ? "Payments Within 15 Days" : "15 दिनों में भुगतान"}
              </span>
              <div className="flex items-center space-x-2">
                {paymentsChange.isPositive ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <span
                  className={`font-bold ${
                    paymentsChange.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {paymentsChange.isPositive ? '+' : '-'}{paymentsChange.percent}%
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{previous.payments_within_15_days?.toFixed(1)}% →</span>
              <ArrowRight className="w-4 h-4" />
              <span className="font-semibold text-gray-800">
                {current.payments_within_15_days?.toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {!peopleChange && !daysChange && !paymentsChange && (
          <div className="text-center text-gray-500 py-4">
            {lang === "en" ? "No comparison data available" : "कोई तुलना डेटा उपलब्ध नहीं है"}
          </div>
        )}
      </div>
    </motion.div>
  );
}

