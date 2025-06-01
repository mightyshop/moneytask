import React, { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';

interface Cashout {
  name: string;
  amount: number;
  timeAgo: string;
  method: string;
  methodColor: string;
  type: 'cash' | 'airtime';
  network?: string;
}

const CashoutStats: React.FC = () => {
  const [currentCashout, setCurrentCashout] = useState<Cashout | null>(null);

  const generateRandomCashout = (): Cashout => {
    const names = [
      'Chioma', 'Oluwaseun', 'Adebayo', 'Ngozi', 'Chinedu',
      'Folake', 'Babajide', 'Aisha', 'Olayinka', 'Chiamaka',
      'Emeka', 'Folashade', 'Tunde', 'Yetunde', 'Obinna'
    ];
    
    const cashAmounts = [1000, 2000, 3000, 5000, 7000, 10000];
    const airtimeAmounts = [500, 1000, 2000];
    
    const times = [
      '2 minutes ago', '5 minutes ago', '10 minutes ago',
      '15 minutes ago', '1 hour ago', '2 hours ago',
      '30 seconds ago', '45 seconds ago', 'just now'
    ];
    
    const methods = [
      { name: 'OPay', color: 'text-green-600' },
      { name: 'PalmPay', color: 'text-red-600' },
      { name: 'Moniepoint', color: 'text-blue-600' }
    ];

    const networks = ['MTN', 'Airtel', 'Glo', '9mobile'];

    // 50% chance for airtime cashout
    const isAirtime = Math.random() < 0.5;

    if (isAirtime) {
      return {
        name: names[Math.floor(Math.random() * names.length)],
        amount: airtimeAmounts[Math.floor(Math.random() * airtimeAmounts.length)],
        timeAgo: times[Math.floor(Math.random() * times.length)],
        method: networks[Math.floor(Math.random() * networks.length)],
        methodColor: 'text-yellow-600',
        type: 'airtime',
        network: networks[Math.floor(Math.random() * networks.length)]
      };
    }

    const selectedMethod = methods[Math.floor(Math.random() * methods.length)];
    return {
      name: names[Math.floor(Math.random() * names.length)],
      amount: cashAmounts[Math.floor(Math.random() * cashAmounts.length)],
      timeAgo: times[Math.floor(Math.random() * times.length)],
      method: selectedMethod.name,
      methodColor: selectedMethod.color,
      type: 'cash'
    };
  };

  useEffect(() => {
    const updateCashout = () => {
      setCurrentCashout(generateRandomCashout());
    };

    updateCashout();
    const interval = setInterval(updateCashout, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!currentCashout) return null;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg animate-fade-in fixed top-4 left-4 max-w-[90vw] sm:max-w-xs">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="bg-green-100 p-1.5 sm:p-2 rounded-full flex-shrink-0">
          <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-gray-800 truncate">
            <span className="font-semibold">{currentCashout.name}</span> cashed out{' '}
            <span className="font-semibold">₦{currentCashout.amount.toLocaleString()}</span>{' '}
            {currentCashout.type === 'airtime' ? (
              <>
                <span className={currentCashout.methodColor}>{currentCashout.method} Airtime</span>
              </>
            ) : (
              <>via <span className={currentCashout.methodColor}>{currentCashout.method}</span></>
            )}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500">{currentCashout.timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default CashoutStats;