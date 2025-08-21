
import React from 'react';
import { AnalyticsIcon, OrdersIcon, ProductsIcon, CurrencyDollarIcon } from '../../components/Icons';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; change?: string; changeType?: 'increase' | 'decrease' }> = ({ title, value, icon, change, changeType }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex-1">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-neutral-dark mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-full bg-primary text-white">
        {icon}
      </div>
    </div>
    {change && (
      <p className={`text-sm mt-2 flex items-center ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
        {change} vs. last month
      </p>
    )}
  </div>
);


const SupplierAnalyticsPage: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-bold text-neutral-dark mb-6">Performance Analytics</h1>
      
      {/* Stat Cards */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value="$48,290" 
          icon={<CurrencyDollarIcon className="h-6 w-6"/>} 
          change="+12.5%"
          changeType="increase"
        />
        <StatCard 
          title="Total Orders" 
          value="1,245" 
          icon={<OrdersIcon className="h-6 w-6"/>}
          change="-2.1%"
          changeType="decrease"
        />
        <StatCard 
          title="Conversion Rate" 
          value="4.8%" 
          icon={<AnalyticsIcon className="h-6 w-6"/>}
          change="+0.5%"
          changeType="increase"
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-neutral-dark mb-4">Sales Performance (Last 30 Days)</h2>
        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Chart data would be displayed here.</p>
        </div>
      </div>

       {/* Top Products */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-neutral-dark mb-4">Top Performing Products</h2>
        <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
                <span className="text-gray-700">Custom Mailer Box - 10x8x4</span>
                <span className="font-semibold text-neutral-dark">450 Orders</span>
            </li>
             <li className="py-3 flex justify-between items-center">
                <span className="text-gray-700">Eco-Friendly Poly Mailer</span>
                <span className="font-semibold text-neutral-dark">312 Orders</span>
            </li>
             <li className="py-3 flex justify-between items-center">
                <span className="text-gray-700">Luxury Rigid Box - Small</span>
                <span className="font-semibold text-neutral-dark">189 Orders</span>
            </li>
        </ul>
      </div>

    </div>
  );
};

export default SupplierAnalyticsPage;