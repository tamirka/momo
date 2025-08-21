
import React from 'react';

const quotes = [
    { id: 'QT-205', product: 'Custom Mailer Box - 10x8x4', supplier: 'Boxify', date: '2023-10-25', status: 'Response Received' },
    { id: 'QT-204', product: 'Luxury Rigid Box - Small', supplier: 'PrintPerfect', date: '2023-10-24', status: 'Pending' },
    { id: 'QT-203', product: 'Eco-Friendly Poly Mailer', supplier: 'EcoEnclose', date: '2023-10-22', status: 'Accepted' },
    { id: 'QT-202', product: 'Branded Product Box - Medium', supplier: 'Boxify', date: '2023-10-21', status: 'Expired' },
];

const getStatusChipClass = (status: string) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Response Received': return 'bg-blue-100 text-blue-800';
        case 'Accepted': return 'bg-green-100 text-green-800';
        case 'Expired': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const BuyerQuotesPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-neutral-dark mb-6">My Quotes</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-neutral mb-6">
          Manage your quote requests. View responses from suppliers, compare offers, and proceed with your procurement.
        </p>
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {quotes.map((quote) => (
                        <tr key={quote.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.product}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.supplier}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusChipClass(quote.status)}`}>
                                    {quote.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-primary hover:text-primary-hover">View Quote</a>
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

export default BuyerQuotesPage;