import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { Product } from '../types/database';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/browse/${product.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden group transition-shadow duration-300 hover:shadow-xl">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={product.image_url} alt={product.name} />
        <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">{product.category}</div>
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-bold text-lg">View Details</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-neutral-dark truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">by {product.profiles?.company_name || 'A Yazbox Supplier'}</p>
        <div className="flex items-center justify-between mb-3">
            <p className="text-xl font-extrabold text-primary">${product.price.toFixed(2)}</p>
            {/* Mock rating for now */}
            <StarRating rating={4.5} /> 
        </div>
        <p className="text-xs text-gray-500">MOQ: {product.min_order_qty} units</p>
      </div>
    </Link>
  );
};

export default ProductCard;
