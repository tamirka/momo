import React, { useState, useCallback, useEffect } from 'react';
import { UploadIcon, XIcon, CurrencyDollarIcon } from './Icons';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../auth/Auth';

interface AddProductFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const categories = ["Mailer Boxes", "Shipping Boxes", "Product Packaging", "Flexible Packaging", "Luxury Boxes"];

const AddProductForm: React.FC<AddProductFormProps> = ({ onSave, onCancel }) => {
  const { user } = useAuth();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: categories[0],
    price: '',
    min_order_qty: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { name, description, category, price, min_order_qty } = product;
    setIsValid(
        name.trim() !== '' &&
        description.trim() !== '' &&
        category.trim() !== '' &&
        Number(price) > 0 &&
        Number(min_order_qty) > 0 &&
        images.length > 0
    );
  }, [product, images]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const newFile = files[0]; // Only allow one image for simplicity
      setImages([newFile]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews([reader.result as string]);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !user) return;
    setIsSubmitting(true);

    try {
        // 1. Upload image to Supabase Storage
        const file = images[0];
        const filePath = `${user.id}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);
        if (uploadError) throw uploadError;

        // 2. Get public URL of the uploaded image
        const { data: urlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);
        
        const imageUrl = urlData.publicUrl;

        // 3. Insert product data into the database
        const productToInsert = {
            ...product,
            price: Number(product.price),
            min_order_qty: Number(product.min_order_qty),
            supplier_id: user.id,
            image_url: imageUrl,
        };

        const { error: insertError } = await supabase.from('products').insert([productToInsert]);
        if (insertError) throw insertError;
        
        onSave();

    } catch (error: any) {
        alert(`Error adding product: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Details */}
        <div className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text" name="name" id="name" value={product.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" id="description" value={product.description} onChange={handleChange} rows={4} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" id="category" value={product.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (USD per unit)</label>
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                           <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="number" name="price" id="price" value={product.price} onChange={handleChange} required min="0" step="0.01" className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary sm:text-sm" placeholder="0.00" />
                    </div>
                </div>
                <div>
                    <label htmlFor="min_order_qty" className="block text-sm font-medium text-gray-700">Min. Order Qty (MOQ)</label>
                    <input type="number" name="min_order_qty" id="min_order_qty" value={product.min_order_qty} onChange={handleChange} required min="1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
            </div>
        </div>

        {/* Right Column: Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image (1 image max)</label>
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md transition-colors ${isDragging ? 'border-primary bg-blue-50' : ''}`}
          >
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400"/>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-focus focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files)} className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {previews.length > 0 && (
             <div className="mt-4 grid grid-cols-3 gap-4">
                {previews.map((src, index) => (
                    <div key={index} className="relative group">
                        <img src={src} alt={`Preview ${index}`} className="h-24 w-full object-cover rounded-md" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <XIcon className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 border-t">
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onCancel} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancel
          </button>
          <button type="submit" disabled={!isValid || isSubmitting} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus disabled:bg-gray-400 disabled:cursor-not-allowed">
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;