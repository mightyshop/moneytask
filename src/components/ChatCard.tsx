import React, { useState, useEffect } from 'react';
import StatusIndicator from './StatusIndicator';
import PaymentOption from './PaymentOption';
import Modal from './Modal';
import ShareProgress from './ShareProgress';
import TaskStep from './TaskStep';

const ChatCard: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [currentStep, setCurrentStep] = useState<'select' | 'share' | 'verifying' | 'username' | 'task'>('select');
  const [username, setUsername] = useState('');
  const totalSharesRequired = 3;
  
  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setIsModalOpen(true);
    setCurrentStep('share');
  };
  
  const handleShare = () => {
    const message = `Amazing opportunity! I just discovered how to win up to NGN10,000 by completing simple tasks! It's legitimate and super easy. Join me and start earning today!\n\nhttps://nextto.space\n\nLimited spots available - Don't miss out!`;
    window.location.href = `whatsapp://send?text=${encodeURIComponent(message)}`;
    setShareCount(prev => {
      const newCount = Math.min(prev + 1, totalSharesRequired);
      if (newCount === totalSharesRequired) {
        setCurrentStep('verifying');
        setTimeout(() => {
          setCurrentStep('username');
        }, 5000);
      }
      return newCount;
    });
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setCurrentStep('task');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-lg">
      <StatusIndicator name="Willa" />
      
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-6">
        Complete Tasks, Win Prizes
      </h1>

      {currentStep === 'select' && (
        <>
          <p className="text-center text-gray-600 mb-6 text-lg">
            Win cash or airtime prizes up to NGN10k just to complete easy tasks
          </p>
          
          <div className="space-y-4 mb-6">
            <PaymentOption 
              amount="500" 
              type="Airtime"
              isSelected={selectedAmount === "500"} 
              onSelect={handleAmountSelect} 
            />
            
            <PaymentOption 
              amount="1,000" 
              type="Airtime"
              isSelected={selectedAmount === "1,000"} 
              onSelect={handleAmountSelect} 
            />

            <PaymentOption 
              amount="5,000" 
              type="Cash"
              isSelected={selectedAmount === "5,000"} 
              onSelect={handleAmountSelect} 
            />

            <PaymentOption 
              amount="10,000" 
              type="Cash"
              isSelected={selectedAmount === "10,000"} 
              onSelect={handleAmountSelect} 
            />
          </div>
        </>
      )}

      {currentStep === 'share' && selectedAmount && (
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-center text-green-800 mb-3">
              Congratulations, you can win NGN {selectedAmount}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p className="font-medium text-center">Proceed to get your {selectedAmount.includes('000') ? 'cash' : 'airtime'}</p>
              <div className="space-y-2">
                <p className="font-medium">How to proceed:</p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Share this opportunity with 3 groups or 3 friends on WhatsApp to verify your account.</li>
                  <li>After sharing 3 times, you'll be taken to the next step.</li>
                </ol>
              </div>
            </div>
          </div>

          <ShareProgress 
            shareCount={shareCount} 
            totalRequired={totalSharesRequired} 
          />
          
          <button
            onClick={handleShare}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Share on WhatsApp</span>
            <span className="text-xl">📱</span>
          </button>
        </div>
      )}

      {currentStep === 'verifying' && (
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">Verifying your shares...</p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Congratulations! The next verification step</h3>
            <p className="text-gray-700 mb-4">You might WIN ANYTHING, e.g cash, airtime and many more gifts!</p>
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">Verification methods; We may ask you to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Send SMS</li>
                <li>Download</li>
                <li>Enter phone number</li>
                <li>Answer the survey</li>
                <li>Install the app</li>
                <li>Or any other given task to Verify your phone number</li>
              </ul>
              <p className="font-medium text-red-600 mt-4">Remember, the next step is very important. Do not skip any step.</p>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'username' && (
        <form onSubmit={handleUsernameSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your username to continue
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Your username"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-200"
          >
            Continue
          </button>
        </form>
      )}

      {currentStep === 'task' && (
        <TaskStep username={username} />
      )}

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={selectedAmount || ""}
      />
    </div>
  );
};

export default ChatCard;