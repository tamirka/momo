
import React from 'react';
import { ShieldCheckIcon, GlobeAltIcon, BoltIcon, RightArrowIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-neutral-dark mb-3">{title}</h3>
        <p className="text-neutral leading-relaxed">{description}</p>
    </div>
);

const HowItWorksStep: React.FC<{ number: string; title: string; description: string; isLast?: boolean }> = ({ number, title, description, isLast }) => (
    <div className="relative flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                {number}
            </div>
            {!isLast && <div className="flex-grow border-l-2 md:border-t-2 border-primary border-dashed mt-4 md:mt-0 md:mx-4 h-8 md:h-auto md:w-auto"></div>}
        </div>
        <h4 className="text-xl font-semibold text-neutral-dark mb-2">{title}</h4>
        <p className="text-neutral">{description}</p>
    </div>
);


const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-white rounded-2xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-teal-800 opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-dark tracking-tighter leading-tight">
            Design, Print, and Ship Custom Packaging
          </h1>
          <p className="mt-6 text-xl text-neutral max-w-3xl mx-auto">
            Yazbox is the first on-demand packaging marketplace where you can design, get instant quotes, and order custom boxes for your business.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/browse" className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Designing
            </Link>
            <a href="#how-it-works" className="inline-block bg-gray-200 text-neutral-dark font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
                How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-dark">Why Choose Yazbox?</h2>
            <p className="text-lg text-neutral mt-4 max-w-2xl mx-auto">We provide the tools and trust to help your brand stand out.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard icon={<BoltIcon className="h-8 w-8"/>} title="Instant Quotes" description="No more waiting. Get real-time pricing as you configure your custom packaging specifications." />
            <FeatureCard icon={<ShieldCheckIcon className="h-8 w-8"/>} title="Verified Suppliers" description="Every supplier is vetted for quality and reliability, ensuring you source from the best manufacturers." />
            <FeatureCard icon={<GlobeAltIcon className="h-8 w-8"/>} title="Sustainable Options" description="Choose from a variety of eco-friendly and recyclable materials to meet your brand's sustainability goals." />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 scroll-mt-20">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-dark">Get Custom Packaging in 3 Easy Steps</h2>
            <p className="text-lg text-neutral mt-4 max-w-2xl mx-auto">From concept to delivery, our platform simplifies the entire process.</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-12">
            <HowItWorksStep number="1" title="Select & Configure" description="Choose from hundreds of packaging styles and sizes. Configure your material, print, and quantity." />
            <HowItWorksStep number="2" title="Design & Approve" description="Upload your artwork or use our online tools to create your design. Approve a 3D proof instantly." />
            <HowItWorksStep number="3" title="Order & Ship" description="Place your order with secure payments and track your custom packaging right to your door." isLast/>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-neutral-dark rounded-2xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary rounded-full opacity-20"></div>
            <div className="absolute -top-12 -left-12 w-36 h-36 border-4 border-primary rounded-full opacity-20"></div>
            <h2 className="text-4xl font-bold">Ready to Elevate Your Brand?</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Join thousands of businesses creating unforgettable unboxing experiences. Create your account to get started.</p>
            <div className="mt-8">
                 <Link to="/signup" className="inline-flex items-center bg-accent text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <span>Get Started for Free</span>
                    <RightArrowIcon className="w-6 h-6 ml-3" />
                </Link>
            </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;