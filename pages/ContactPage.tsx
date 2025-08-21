
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-dark">Get in Touch</h1>
        <p className="text-lg text-neutral mt-4 max-w-2xl mx-auto">We're here to help with any questions about orders, suppliers, or our platform. Reach out and we'll get back to you shortly.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-dark mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" placeholder="Your Name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" placeholder="you@company.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" rows={4} placeholder="How can we help you today?" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus">
                Send Message
              </button>
            </div>
          </form>
        </div>
        
        {/* Contact Info */}
        <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Contact Information</h2>
            <div className="space-y-4 text-neutral">
                <p>
                    <strong className="block text-neutral-dark">Address:</strong>
                    123 Packaging Way, Boxville, CA 90210
                </p>
                <p>
                    <strong className="block text-neutral-dark">Email:</strong>
                    <a href="mailto:support@yazbox.com" className="text-primary hover:underline">support@yazbox.com</a>
                </p>
                <p>
                    <strong className="block text-neutral-dark">Phone:</strong>
                    <a href="tel:+1-800-555-YAZBOX" className="text-primary hover:underline">+1 (800) 555-YAZBOX</a>
                </p>
                <div className="border-t pt-4 mt-4">
                    <strong className="block text-neutral-dark">Business Hours:</strong>
                    Monday - Friday: 9:00 AM - 5:00 PM PST
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;