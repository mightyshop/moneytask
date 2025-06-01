import React from 'react';

interface ShareProgressProps {
  shareCount: number;
  totalRequired: number;
}

const ShareProgress: React.FC<ShareProgressProps> = ({ shareCount, totalRequired }) => {
  const percentage = Math.min((shareCount / totalRequired) * 100, 100);
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Share Progress ({shareCount}/{totalRequired})
        </span>
        <span className="text-sm font-medium text-gray-700">
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ShareProgress;