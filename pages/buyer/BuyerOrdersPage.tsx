
import React from 'react';

const orders = [
    { id: 'YBX-1024', supplier: 'Boxify', date: '2023-10-26', total: '$1,250.00', status: 'Processing' },
    { id: 'YBX-1023', supplier: 'EcoEnclose', date: '2023-10-24', total: '$845.50', status: 'Shipped' },
    { id: 'YBX-1022', supplier: 'PrintPerfect', date: '2023-10-22', total: '$3,120.00', status: 'Delivered' },
    { id: 'YBX-1020', supplier: 'SupplyHub', date: '2023-10-19', total: '$2,400.75', status: 'Delivered' },
];

const getStatusChipClass = (status: string) => {
    switch (status) {
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const BuyerOrdersPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-neutral-dark mb-6">My Orders</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-neutral mb-6">
          Track your past and current orders. Here you can find details about your purchase history, shipping status, and invoices.
        </p>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.supplier}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusChipClass(order.status)}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                <a href="#" className="text-primary hover:text-primary-hover">View Details</a>
                                <a href="#" className="text-primary hover:text-primary-hover">Track Order</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerOrdersPage;