import React from 'react';

interface ContinueButtonProps {
  onClick: () => void;
  isDisabled: boolean;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ 
  onClick, 
  isDisabled 
}) => {
  return (
    <button
      className={`
        px-8 py-3 rounded-lg border border-blue-300 text-lg
        transition-all duration-200
        ${isDisabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-white text-gray-700 hover:bg-blue-50 active:bg-blue-100'
        }
      `}
      onClick={onClick}
      disabled={isDisabled}
    >
      Continue
    </button>
  );
};

export default ContinueButton;