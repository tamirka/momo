import React from 'react';

const BuyerMessagesPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-neutral-dark mb-6">Messages</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-neutral">
          Communicate directly with suppliers. All your conversations regarding products, quotes, and orders will be stored here.
        </p>
      </div>
    </div>
  );
};

export default BuyerMessagesPage;
