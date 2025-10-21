import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating = 0, totalStars = 5, size = 30, color = "#FF7A00" }) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    const fillLevel = Math.min(Math.max(rating - (i - 1), 0), 1); 
    // Gives a value between 0 and 1 for each star (how much to fill it)

    stars.push(
      <div key={i} className="relative inline-block">
        {/* Empty outline star */}
        <Star size={size} stroke={color} fill="none" />

        {/* Filled portion */}
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${fillLevel * 100}%` }}
        >
          <Star size={size} fill={color} stroke={color} />
        </div>
      </div>
    );
  }

  return <div className="flex items-center space-x-2">{stars}</div>;
};

export default StarRating;