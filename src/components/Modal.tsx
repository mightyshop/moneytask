import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;

  const isAirtime = !amount.includes('000');
  const reward = isAirtime ? 'airtime' : 'cash';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Congratulations! 🎉
        </h2>
        <p className="text-gray-600 text-center mb-6">
          You can win NGN {amount} {reward} now!
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;