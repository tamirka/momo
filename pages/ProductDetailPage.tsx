import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Product } from '../types/database';
import StarRating from '../components/StarRating';
import { ChevronLeftIcon } from '../components/Icons';

// Mock data for now, as these are not in the product schema
const mockReviews = [
    { author: "E-commerce Store Owner", rating: 5, comment: "Fantastic quality and the print is so vibrant! Our customers love the new packaging.", date: "2023-09-01" },
    { author: "Subscription Box Co.", rating: 4, comment: "Good, sturdy boxes. The ordering process was smooth. A bit longer lead time than expected but worth it.", date: "2023-08-22" },
];

const mockSpecifications = [
    { name: "Material", value: "Corrugated Cardboard" },
    { name: "Print Type", value: "Full Color CMYK" },
    { name: "Min. Dimensions", value: "3\" x 3\" x 1\"" },
    { name: "Lead Time", value: "10-14 Business Days" },
    { name: "Features", value: "Eco-Friendly, Recyclable" },
];

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeImage, setActiveImage] = useState('');
    const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*, profiles(company_name)')
                .eq('id', productId)
                .single();

            if (error) {
                setError(error.message);
                setProduct(null);
            } else {
                const fetchedProduct = data as unknown as Product;
                setProduct(fetchedProduct);
                setActiveImage(fetchedProduct.image_url);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div className="text-center py-20">Loading product details...</div>;
    }

    if (error || !product) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold">Product not found</h1>
                <p className="text-neutral mt-2">{error}</p>
                <Link to="/browse" className="text-primary hover:underline mt-4 inline-block">
                    &larr; Back to all products
                </Link>
            </div>
        );
    }
    
    // Using mock gallery for now
    const gallery = [product.image_url, `https://picsum.photos/seed/box${product.id}a/800/600`, `https://picsum.photos/seed/box${product.id}b/800/600`, `https://picsum.photos/seed/box${product.id}c/800/600`];


    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <Link to="/browse" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary mb-6">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back to Browse
            </Link>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg border">
                             <img src={activeImage} alt={product.name} className="w-full h-full object-cover object-center" />
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {gallery.map((img, index) => (
                                <button key={index} onClick={() => setActiveImage(img)} className={`rounded-md border-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${activeImage === img ? 'border-primary' : 'border-transparent'}`}>
                                    <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-neutral-dark">{product.name}</h1>
                        <p className="text-sm text-gray-500 mt-2">by <span className="font-medium text-primary hover:underline cursor-pointer">{product.profiles?.company_name || 'A Yazbox Supplier'}</span></p>
                        <div className="mt-4">
                            {/* Assuming a mock rating for now */}
                            <StarRating rating={4.5} />
                        </div>
                        <p className="text-lg mt-4 text-gray-700">{product.description}</p>
                        
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
                                <span className="text-sm text-gray-600">per unit</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Minimum Order Quantity: <span className="font-bold">{product.min_order_qty} units</span></p>
                        </div>
                        
                        <div className="mt-auto pt-6">
                           <button className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus">
                                Request Quote
                           </button>
                        </div>
                    </div>
                </div>

                {/* Tabs for Specs and Reviews */}
                <div className="mt-12">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button onClick={() => setActiveTab('specs')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                Specifications
                            </button>
                            <button onClick={() => setActiveTab('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                Reviews ({mockReviews.length})
                            </button>
                        </nav>
                    </div>

                    <div className="mt-6">
                        {activeTab === 'specs' && (
                            <div className="space-y-4">
                               <dl className="divide-y divide-gray-200">
                                {mockSpecifications.map((spec) => (
                                    <div key={spec.name} className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <dt className="text-sm font-medium text-gray-500">{spec.name}</dt>
                                        <dd className="text-sm text-gray-900 sm:col-span-2">{spec.value}</dd>
                                    </div>
                                ))}
                                </dl>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="space-y-8">
                                {mockReviews.length > 0 ? (
                                    mockReviews.map((review, index) => (
                                        <div key={index} className="border-b last:border-b-0 pb-6 mb-6">
                                            <div className="flex items-center mb-2">
                                                <StarRating rating={review.rating} />
                                                <p className="ml-auto text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                                            </div>
                                            <p className="text-sm font-bold text-neutral-dark">{review.author}</p>
                                            <p className="mt-1 text-base text-gray-700 leading-relaxed">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 py-4">No reviews for this product yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
