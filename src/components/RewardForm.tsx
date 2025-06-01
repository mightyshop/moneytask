import React, { useState } from 'react';

interface RewardFormProps {
  type: 'airtime' | 'cash';
  amount: number;
  onSubmit: (formData: any) => void;
}

const networks = ['MTN', 'Airtel', 'Glo', '9mobile'];
const banks = [
  'Access Bank',
  'First Bank',
  'GTBank',
  'UBA',
  'Zenith Bank',
  'OPay',
  'PalmPay',
  'Moniepoint'
];

const RewardForm: React.FC<RewardFormProps> = ({ type, amount, onSubmit }) => {
  const [formData, setFormData] = useState(
    type === 'airtime' 
      ? { phoneNumber: '', network: '' }
      : { accountNumber: '', accountName: '', bankName: '' }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Claim Your {type === 'airtime' ? 'Airtime' : 'Cash'} Prize
      </h2>
      <p className="text-lg text-gray-600 mb-6 text-center">
        You've won NGN{amount} {type}!
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'airtime' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                pattern="[0-9]{11}"
                required
                placeholder="Enter 11-digit phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Network Provider
              </label>
              <select
                name="network"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.network}
                onChange={handleChange}
              >
                <option value="">Select network</option>
                {networks.map(network => (
                  <option key={network} value={network}>{network}</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                pattern="[0-9]{10}"
                required
                placeholder="Enter 10-digit account number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Name
              </label>
              <input
                type="text"
                name="accountName"
                required
                placeholder="Enter account name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.accountName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <select
                name="bankName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.bankName}
                onChange={handleChange}
              >
                <option value="">Select bank</option>
                {banks.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
          </>
        )}
        
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-200"
        >
          Submit Claim
        </button>
      </form>
    </div>
  );
};

export default RewardForm;