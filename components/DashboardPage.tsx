
import React from 'react';
import { useAuth } from '../auth/Auth';
import { OrdersIcon, ProductsIcon, AnalyticsIcon } from '../components/Icons';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-neutral-dark">{value}</p>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-dark">Welcome back, {user?.email}!</h1>
        <p className="text-neutral mt-1">Here's a snapshot of your marketplace activity.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$48,290" 
          icon={<AnalyticsIcon className="h-6 w-6 text-white"/>} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Total Orders" 
          value="1,245" 
          icon={<OrdersIcon className="h-6 w-6 text-white"/>}
          color="bg-blue-500"
        />
        <StatCard 
          title="Products Listed" 
          value="89" 
          icon={<ProductsIcon className="h-6 w-6 text-white"/>}
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-neutral-dark mb-4">Recent Activity</h2>
        <p className="text-neutral">This area will display recent orders, messages, or product reviews for quick access.</p>
        <div className="mt-4 border rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
