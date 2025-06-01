import React from 'react';

interface StatusIndicatorProps {
  name: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
      <p className="text-green-600 font-medium">
        🔥 Over 1000 tasks available for you!
      </p>
    </div>
  );
};

export default StatusIndicator;