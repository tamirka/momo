import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../../components/Modal';
import AddProductForm from '../../components/AddProductForm';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../auth/Auth';
import { Database } from '../../types/database';

type Product = Database['public']['Tables']['products']['Row'];

const SupplierProductsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProducts = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    const { data, error: queryError } = await supabase
      .from('products')
      .select('*')
      .eq('supplier_id', user.id);

    if (queryError) {
      setError(queryError.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  const handleAddProduct = () => {
    setIsModalOpen(false);
    fetchProducts(); // Refresh the product list after adding a new one
  };

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-neutral-dark">Manage Products</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors duration-300 flex items-center"
          >
            <span className="text-xl mr-2">+</span> Add New Product
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
           {loading ? (
              <p>Loading your products...</p>
           ) : error ? (
              <p className="text-red-500">Error: {error}</p>
           ) : products.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MOQ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.min_order_qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           ) : (
                <p className="text-center text-gray-500 py-4">You haven't added any products yet.</p>
           )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="4xl">
        <AddProductForm onSave={handleAddProduct} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default SupplierProductsPage;