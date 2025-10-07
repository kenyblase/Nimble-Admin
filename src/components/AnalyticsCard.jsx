import { ArrowUpRight, ArrowDownRight, TrendingDown, TrendingUp } from "lucide-react";

export default function AnalyticsCard({
  title,
  value,
  trendPercent,
  trendDirection, // "up" or "down"
  trendLabel, // e.g. "from yesterday"
}) {
  const isUp = trendDirection === "up";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col justify-between w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-semibold mt-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </h2>
        </div>
      </div>

      {/* Trend */}
      <div
        className={`flex items-center mt-3 text-sm ${
          isUp ? "text-green-600" : "text-red-600"
        }`}
      >
        {isUp ? (
          <TrendingUp className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 mr-1" />
        )}
        <span className="font-medium">{Math.abs(trendPercent)}%</span>
        <span className="ml-1 text-gray-500">
          {isUp ? "Up" : "Down"} {trendLabel}
        </span>
      </div>
    </div>
  );
}
