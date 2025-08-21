
import React from 'react';
import { useAuth } from '../../auth/Auth';
import { UploadIcon } from '../../components/Icons';

const SupplierProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-neutral-dark mb-6">Company Profile</h1>
      <form className="space-y-8">
        {/* Company Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark border-b pb-4 mb-6">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input type="text" id="companyName" defaultValue="Yazbox Print Co." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Public Contact Email</label>
              <input type="email" id="contactEmail" defaultValue={user?.email} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="companyBio" className="block text-sm font-medium text-gray-700">Company Bio</label>
              <textarea id="companyBio" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" defaultValue="Yazbox Print Co. is a leading manufacturer of high-quality, custom packaging solutions for businesses of all sizes."></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Company Logo</label>
                <div className="mt-1 flex items-center space-x-4">
                    <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.993A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <UploadIcon className="h-5 w-5 mr-2" />
                        Change Logo
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-neutral-dark border-b pb-4 mb-6">Business Address</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input type="text" id="address" defaultValue="456 Print Street" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                </div>
                 <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" id="city" defaultValue="Boxville" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                    <input type="text" id="state" defaultValue="CA" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                </div>
                <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                    <input type="text" id="zip" defaultValue="90210" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                </div>
            </div>
        </div>
        
        <div className="flex justify-end">
            <button type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors duration-300">
                Save Changes
            </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierProfilePage;