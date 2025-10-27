import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export default function TrendChart({ historyData, lang }) {
  if (!historyData || !historyData.records || historyData.records.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        {lang === "en" ? "No historical data available" : "कोई ऐतिहासिक डेटा उपलब्ध नहीं है"}
      </div>
    );
  }

  // Process data for chart
  const chartData = historyData.records
    .map(record => ({
      month: `${record.month}/${record.year}`,
      people: record.people_got_work || 0,
      days: record.avg_days_per_household || 0,
      payments: record.payments_within_15_days || 0
    }))
    .reverse();

  // Calculate trends
  const latest = chartData[chartData.length - 1];
  const previous = chartData[chartData.length - 2];
  
  const peopleTrend = latest && previous ? ((latest.people - previous.people) / previous.people * 100).toFixed(1) : 0;
  const daysTrend = latest && previous ? ((latest.days - previous.days) / previous.days * 100).toFixed(1) : 0;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        {lang === "en" ? "📈 Last 12 Months Trend" : "📈 पिछले 12 महीने का रुझान"}
      </h3>

      {/* Trend Indicators */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {lang === "en" ? "People" : "लोग"}
            </span>
            {peopleTrend > 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {latest?.people?.toLocaleString() || 0}
          </div>
          <div className={`text-sm ${peopleTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {peopleTrend > 0 ? '+' : ''}{peopleTrend}%
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {lang === "en" ? "Days" : "दिन"}
            </span>
            {daysTrend > 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className="text-2xl font-bold text-amber-900">
            {latest?.days?.toFixed(1) || 0}
          </div>
          <div className={`text-sm ${daysTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {daysTrend > 0 ? '+' : ''}{daysTrend}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            style={{ fontSize: '12px' }}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="people"
            name={lang === "en" ? "People Worked" : "काम करने वाले लोग"}
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

