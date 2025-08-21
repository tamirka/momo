import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { supabase } from '../lib/supabaseClient';
import { Product } from '../types/database';

const categories = ["All", "Mailer Boxes", "Shipping Boxes", "Product Packaging", "Flexible Packaging", "Luxury Boxes"];
const ratings = [4, 3, 2, 1];
const PRODUCTS_PER_PAGE = 12;

const BrowsePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const [filters, setFilters] = useState({
    category: 'All',
    price: { min: 0, max: 10 },
    moq: 1000,
    rating: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
      
      let query = supabase
        .from('products')
        .select(`
          *,
          profiles ( company_name )
        `, { count: 'exact' })
        .gte('price', filters.price.min)
        .lte('price', filters.price.max)
        .lte('min_order_qty', filters.moq)
        // Note: Supabase doesn't directly support rating filters on joined tables easily without RPC.
        // For this example, we'll omit rating filter on the query and apply it client-side if needed,
        // or assume a 'rating' column exists on the products table.
        .range(startIndex, startIndex + PRODUCTS_PER_PAGE - 1);
        
      if (filters.category !== 'All') {
        query = query.eq('category', filters.category);
      }
      
      const { data, error: queryError, count } = await query;
      
      if (queryError) {
        setError(queryError.message);
      } else {
        // Here we assume the returned data structure matches what ProductCard expects
        // This might need adjustment based on your actual Supabase schema and RLS
        const fetchedProducts = data as unknown as Product[];
        setProducts(fetchedProducts);
        setTotalItems(count || 0);
      }
      setLoading(false);
    };
    
    fetchProducts();
  }, [currentPage, filters]);


  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'minPrice' || name === 'maxPrice') {
        const priceName = name === 'minPrice' ? 'min' : 'max';
        setFilters(prev => ({ ...prev, price: { ...prev.price, [priceName]: Number(value) } }));
    } else if (name === 'moq') {
        setFilters(prev => ({...prev, moq: Number(value) || 1000}));
    } 
    else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
    setCurrentPage(1);
  };
  
  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, rating: prev.rating === rating ? 0 : rating }));
    setCurrentPage(1);
  }

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
                <label className="block text-sm font-medium text-gray-700">Price Per Unit</label>
                <div className="mt-2 space-y-2">
                  <input type="range" min="0" max="10" step="0.5" value={filters.price.max} name="maxPrice" onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${filters.price.min.toFixed(2)}</span>
                    <span>${filters.price.max.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* MOQ Filter */}
               <div>
                <label htmlFor="moq" className="block text-sm font-medium text-gray-700">Max. MOQ</label>
                <input type="number" id="moq" name="moq" value={filters.moq} onChange={handleFilterChange} step="50" min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>

              {/* Rating Filter (Note: client-side for now) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="mt-2 flex space-x-2">
                    {ratings.map(r => (
                        <button key={r} onClick={() => handleRatingChange(r)} className={`px-3 py-1 border rounded-md text-sm transition-colors ${filters.rating === r ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
                            {r}+ ★
                        </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
            {loading ? (
                 <div className="text-center py-20">Loading products...</div>
            ) : error ? (
                <div className="text-center py-20 text-red-500">Error: {error}</div>
            ) : products.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
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
