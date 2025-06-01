import React from 'react';
import ChatCard from './components/ChatCard';
import CashoutStats from './components/CashoutStats';

function App() {
  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center p-4 font-sans">
      <ChatCard />
      <CashoutStats />
    </div>
  );
}

export default App;