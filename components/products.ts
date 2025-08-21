
export interface Product {
  id: number;
  name: string;
  supplier: string;
  price: string;
  rating: string;
  minOrder: number;
  category: 'Electronics' | 'Industrial' | 'Apparel' | 'Home Goods' | 'Health & Beauty';
  imageUrl: string;
  gallery: string[];
  description: string;
  specifications: { name: string; value: string }[];
  reviews: { author: string; rating: number; comment: string; date: string }[];
}

export const products: Product[] = Array.from({ length: 45 }, (_, i) => {
    const category = ['Electronics', 'Industrial', 'Apparel', 'Home Goods', 'Health & Beauty'][i % 5] as Product['category'];
    const id = i + 1;
    return {
        id,
        name: `Industrial Widget ${id}`,
        supplier: `Supplier Co ${String.fromCharCode(65 + (i % 5))}`,
        price: (Math.random() * 200 + 50).toFixed(2),
        rating: (Math.random() * 2 + 3).toFixed(1),
        minOrder: Math.floor(Math.random() * 10 + 1) * 10,
        category,
        imageUrl: `https://picsum.photos/seed/${id}/600/400`,
        gallery: [
            `https://picsum.photos/seed/${id}/800/600`,
            `https://picsum.photos/seed/${id}a/800/600`,
            `https://picsum.photos/seed/${id}b/800/600`,
            `https://picsum.photos/seed/${id}c/800/600`,
        ],
        description: "A high-quality, durable widget designed for industrial use. Built with the finest materials to ensure longevity and optimal performance. Suitable for a wide range of applications, this widget is a reliable choice for your business needs.",
        specifications: [
            { name: "Material", value: "Hardened Steel" },
            { name: "Weight", value: `${(Math.random() * 5 + 1).toFixed(2)} kg` },
            { name: "Dimensions", value: "15cm x 10cm x 5cm" },
            { name: "Color", value: "Metallic Gray" },
            { name: "Warranty", value: "2 Years" },
        ],
        reviews: [
            { author: "John D.", rating: 5, comment: "Excellent product, very reliable and performs as expected. Highly recommended!", date: "2023-08-15" },
            { author: "Jane S.", rating: 4, comment: "Good value for the price. It gets the job done but could be a bit more robust.", date: "2023-07-22" },
            { author: "Mike W.", rating: 5, comment: "Fantastic! Exactly what we needed for our production line. Will be ordering more.", date: "2023-09-01" },
        ],
    };
});
