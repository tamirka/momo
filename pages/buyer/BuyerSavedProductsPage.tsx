
import React from 'react';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';

const savedProducts = products.slice(0, 6);

const BuyerSavedProductsPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-neutral-dark mb-6">Saved Products</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-neutral mb-6">
          This is your personal collection of products you are interested in. Keep track of items for future purchases or comparisons.
        </p>
        {savedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
             <div className="text-center py-10">
                <h3 className="text-lg font-semibold text-neutral-dark">No Saved Products</h3>
                <p className="text-neutral mt-1">Browse products and click the heart icon to save them here.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BuyerSavedProductsPage;