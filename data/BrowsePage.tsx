
import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { products as mockProducts } from '../data/products';

const categories = ["All", "Electronics", "Apparel", "Home Goods", "Industrial", "Health & Beauty"];
const PRODUCTS_PER_PAGE = 12;

const BrowsePage: React.FC = () => {
  const [filters, setFilters] = useState({
    category: 'All',
    price: { min: 0, max: 250 },
    moq: 100,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'minPrice' || name === 'maxPrice') {
        const priceName = name === 'minPrice' ? 'min' : 'max';
        setFilters(prev => ({ ...prev, price: { ...prev.price, [priceName]: Number(value) } }));
    } else if (name === 'moq') {
        setFilters(prev => ({...prev, moq: Number(value) || 100}));
    } 
    else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
    setCurrentPage(1);
  };
  
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      return (
        (filters.category === 'All' || product.category === filters.category) &&
        (product.price >= filters.price.min && product.price <= filters.price.max) &&
        (product.min_order_qty <= filters.moq)
      );
    });
  }, [filters]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  return (
    <div className="container mx-auto">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 mb-8 lg:mb-0">
          <div className="sticky top-20">
            <h2 className="text-2xl font-bold text-neutral-dark mb-4">Filters</h2>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select id="category" name="category" value={filters.category} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                  {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Price Range</label>
                <div className="mt-2 space-y-2">
                  <input type="range" min="0" max="250" value={filters.price.max} name="maxPrice" onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${filters.price.min}</span>
                    <span>${filters.price.max}</span>
                  </div>
                </div>
              </div>

              {/* MOQ Filter */}
               <div>
                <label htmlFor="moq" className="block text-sm font-medium text-gray-700">Max. MOQ</label>
                <input type="number" id="moq" name="moq" value={filters.moq} onChange={handleFilterChange} step="10" min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
            {paginatedProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedProducts.map(product => (
                            <ProductCard key={product.id} product={product as any} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredProducts.length}
                        itemsPerPage={PRODUCTS_PER_PAGE}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-neutral-dark">No Products Found</h3>
                    <p className="text-neutral mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default BrowsePage;