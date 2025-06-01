import React from 'react';

interface PaymentOptionProps {
  amount: string;
  type: 'Cash' | 'Airtime';
  isSelected: boolean;
  onSelect: (amount: string) => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ 
  amount, 
  type,
  isSelected, 
  onSelect 
}) => {
  const icon = type === 'Cash' ? '💵' : '📱';
  
  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}
      `}
      onClick={() => onSelect(amount)}
    >
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          className="form-radio h-5 w-5 text-blue-600"
          checked={isSelected}
          onChange={() => onSelect(amount)}
        />
        <span className="ml-2 text-lg">
          {icon} NGN {amount} {type}
        </span>
      </label>
    </div>
  );
};

export default PaymentOption;