
import React from 'react';
import { BuildingStorefrontIcon, ShieldCheckIcon, StarIcon } from '../components/Icons';

const suppliers = [
    {
        name: "Boxify",
        logo: <BuildingStorefrontIcon className="h-10 w-10 text-primary" />,
        description: "Specialists in custom mailer and shipping boxes with fast turnaround times and vibrant, full-color printing.",
        rating: 4.8,
        reviews: 125,
        verified: true,
        tags: ["Mailer Boxes", "E-commerce", "Fast Turnaround"]
    },
    {
        name: "EcoEnclose",
        logo: <BuildingStorefrontIcon className="h-10 w-10 text-primary" />,
        description: "Leading provider of sustainable and eco-friendly packaging solutions, from recycled poly mailers to compostable materials.",
        rating: 4.9,
        reviews: 230,
        verified: true,
        tags: ["Sustainable", "Recycled Materials", "Flexible Packaging"]
    },
    {
        name: "PrintPerfect",
        logo: <BuildingStorefrontIcon className="h-10 w-10 text-primary" />,
        description: "High-end product and luxury rigid box manufacturing. Perfect for brands that require a premium unboxing experience.",
        rating: 4.7,
        reviews: 98,
        verified: true,
        tags: ["Luxury Boxes", "Retail", "High Quality"]
    },
    {
        name: "SupplyHub",
        logo: <BuildingStorefrontIcon className="h-10 w-10 text-primary" />,
        description: "A one-stop-shop for all packaging needs, offering a vast catalog of stock and custom items at competitive prices.",
        rating: 4.6,
        reviews: 150,
        verified: false,
        tags: ["Wholesale", "Shipping Supplies", "Stock Items"]
    }
]

const SupplierCard: React.FC<typeof suppliers[0]> = ({ name, logo, description, rating, reviews, verified, tags }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            {logo}
        </div>
        <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-xl font-bold text-neutral-dark">{name}</h3>
                {verified && <span title="Verified Supplier"><ShieldCheckIcon className="h-6 w-6 text-green-500" /></span>}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="font-bold">{rating}</span>
                <span>({reviews} reviews)</span>
            </div>
            <p className="text-neutral mb-3">{description}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <span key={tag} className="text-xs font-medium bg-secondary text-neutral-dark px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        </div>
        <button className="w-full sm:w-auto bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors duration-300">
            View Profile
        </button>
    </div>
);


const SuppliersPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-dark">Find Your Perfect Packaging Partner</h1>
        <p className="text-lg text-neutral mt-4 max-w-2xl mx-auto">Connect with our network of vetted, high-quality packaging manufacturers to bring your vision to life.</p>
      </div>
      <div className="space-y-6">
        {suppliers.map(supplier => (
            <SupplierCard key={supplier.name} {...supplier} />
        ))}
      </div>
    </div>
  );
};

export default SuppliersPage;