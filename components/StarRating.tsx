
import React from 'react';
import { StarIcon, StarHalfIcon, StarOutlineIcon } from './Icons';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className="h-5 w-5 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalfIcon key="half" className="h-5 w-5 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutlineIcon key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      ))}
      <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;
