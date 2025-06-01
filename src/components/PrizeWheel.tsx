import React, { useState, useEffect } from 'react';

interface Prize {
  value: number;
  type: 'airtime' | 'cash';
}

interface PrizeWheelProps {
  onPrizeSelected: (prize: Prize) => void;
}

const prizes: Prize[] = [
  { value: 50, type: 'airtime' },
  { value: 100, type: 'airtime' },
  { value: 500, type: 'airtime' },
  { value: 1000, type: 'airtime' },
  { value: 5000, type: 'cash' },
  { value: 10000, type: 'cash' },
];

const PrizeWheel: React.FC<PrizeWheelProps> = ({ onPrizeSelected }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [showLoseMessage, setShowLoseMessage] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      const winChance = Math.random();
      const isWinner = winChance <= 0.002; // 0.2% chance to win
      
      const spins = 5 + Math.random() * 5;
      let randomPrizeIndex = Math.floor(Math.random() * prizes.length);
      
      // If not a winner, ensure it lands on a losing position
      if (!isWinner) {
        randomPrizeIndex = Math.floor(Math.random() * prizes.length);
      }
      
      const segmentAngle = 360 / prizes.length;
      const finalAngle = 360 * spins + (randomPrizeIndex * segmentAngle);
      
      let startTime: number;
      const duration = 10000;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentAngle = easeOut * finalAngle;
          setCurrentRotation(currentAngle);
          requestAnimationFrame(animate);
        } else {
          setCurrentRotation(finalAngle);
          setIsSpinning(false);
          if (!isWinner) {
            setShowLoseMessage(true);
            // Store the last attempt timestamp in localStorage
            localStorage.setItem('lastWheelAttempt', Date.now().toString());
          } else {
            onPrizeSelected(prizes[randomPrizeIndex]);
          }
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isSpinning, onPrizeSelected]);

  if (showLoseMessage) {
    return (
      <div className="text-center space-y-4 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600">Better Luck Next Time!</h2>
        <p className="text-gray-700">Unfortunately, you didn't win this time.</p>
        <p className="text-gray-600">Please try again in 24 hours.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative w-96 h-96">
        <div className="absolute inset-0 rounded-full bg-yellow-400 blur-md animate-pulse"></div>
        
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-[12px] border-x-transparent border-b-[24px] border-b-yellow-500 z-20 filter drop-shadow-lg" />
        
        <div 
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{ 
            transform: `rotate(${currentRotation}deg)`,
            transition: isSpinning ? 'none' : 'transform 0.5s ease-out',
            background: 'radial-gradient(circle at center, #FFD700 0%, #FFA500 100%)',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.5), inset 0 0 20px rgba(255, 165, 0, 0.5)',
            border: '8px solid #FFD700'
          }}
        >
          {prizes.map((prize, index) => {
            const angle = (360 / prizes.length) * index;
            const isAirtime = prize.type === 'airtime';
            return (
              <div
                key={index}
                className="absolute w-1/2 h-1/2 origin-bottom-right"
                style={{
                  transform: `rotate(${angle}deg) skewY(-${360 / prizes.length}deg)`,
                  background: index % 2 === 0 ? '#DC2626' : '#111827',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                }}
              >
                <div
                  className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-white font-bold whitespace-nowrap"
                  style={{ 
                    transform: `rotate(${-angle - (360/prizes.length)/2}deg)`,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  <div className="text-2xl mb-1">₦{prize.value}</div>
                  <div className="text-sm uppercase tracking-wider">{prize.type}</div>
                </div>
              </div>
            );
          })}
          
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-yellow-500 border-4 border-yellow-600 z-10 shadow-lg"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #FFD700 0%, #FFA500 100%)',
            }}
          />
        </div>
      </div>
      
      {isSpinning && (
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-gray-800 animate-pulse">
            Spinning the Wheel!
          </p>
          <p className="text-lg text-gray-600">
            Good luck! 🍀
          </p>
        </div>
      )}
    </div>
  );
};

export default PrizeWheel;