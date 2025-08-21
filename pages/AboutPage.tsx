
import React from 'react';
import { GlobeAltIcon, BoltIcon, ShieldCheckIcon } from '../components/Icons';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img className="w-full h-56 object-cover object-center" src="https://picsum.photos/seed/boxes/1200/400" alt="Warehouse with custom boxes" />
        <div className="absolute inset-0 bg-primary bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">About Yazbox</h1>
        </div>
      </div>
      <div className="p-8 md:p-12 space-y-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold text-neutral-dark">Our Mission</h2>
          <p className="mt-4 text-lg text-neutral max-w-3xl mx-auto leading-relaxed">
            To empower businesses of all sizes by making custom packaging simple, accessible, and on-demand. We believe that great packaging shouldn't be reserved for big brands, and we're building the platform to make that a reality.
          </p>
        </section>

        <div className="border-t"></div>

        <section>
          <h2 className="text-3xl font-bold text-neutral-dark text-center mb-8">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <BoltIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Simplicity & Speed</h3>
              <p className="text-neutral">We're replacing lengthy quote processes and complex supply chains with an intuitive, all-in-one platform. Design, price, and order your packaging in minutes, not weeks.</p>
            </div>
            <div className="p-6">
              <ShieldCheckIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality & Trust</h3>
              <p className="text-neutral">Our marketplace is built on a network of vetted, top-tier suppliers. We ensure every order meets high standards for material quality, print accuracy, and structural integrity.</p>
            </div>
            <div className="p-6">
              <GlobeAltIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accessibility & Innovation</h3>
              <p className="text-neutral">From low minimum order quantities to powerful online design tools, we're leveraging technology to break down barriers and give every business the power to create an amazing unboxing experience.</p>
            </div>
          </div>
        </section>
        
        <div className="border-t"></div>
        
        <section className="text-center bg-gray-50 p-8 rounded-lg">
           <h2 className="text-3xl font-bold text-neutral-dark">Join Our Journey</h2>
            <p className="mt-4 text-lg text-neutral max-w-3xl mx-auto leading-relaxed">
                Whether you're a growing e-commerce brand, an established retailer, or a packaging supplier looking to expand your reach, Yazbox is your partner for success. Let's build something amazing together.
            </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;