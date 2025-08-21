// This file provides mock data for products.
// It's designed to be structurally compatible with the `Product` type from `types/database.ts`
// which is what components like `ProductCard` expect.

const productNames = [
    "Custom Mailer Box", "Eco-Friendly Shipping Box", "Branded Product Box", "Luxury Rigid Box", "Custom Poly Mailer",
    "Subscription Box", "Retail Display Box", "Food-Safe Packaging", "Custom Insert", "Promotional Gift Box"
];

const suppliers = [
    { id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', name: "Boxify" },
    { id: 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', name: "PackPro" },
    { id: 'c3d4e5f6-a7b8-9012-3456-7890abcdef12', name: "EcoEnclose" },
    { id: 'd4e5f6a7-b8c9-0123-4567-890abcdef123', name: "PrintPerfect" },
    { id: 'e5f6a7b8-c9d0-1234-5678-90abcdef1234', name: "SupplyHub" },
];
const categories = ['Mailer Boxes', 'Shipping Boxes', 'Product Packaging', 'Flexible Packaging', 'Luxury Boxes'];

// The return type of this generation is structurally compatible with `Product` from `types/database.ts`
export const products = Array.from({ length: 45 }, (_, i) => {
    const id = i + 1;
    const supplier = suppliers[i % suppliers.length];
    const category = categories[i % 5] as 'Mailer Boxes' | 'Shipping Boxes' | 'Product Packaging' | 'Flexible Packaging' | 'Luxury Boxes';
    const name = `${productNames[i % productNames.length]}`;
    return {
        id,
        name,
        supplier_id: supplier.id,
        price: Number((Math.random() * 5 + 0.5).toFixed(2)),
        min_order_qty: [100, 250, 500, 1000][i % 4],
        category,
        image_url: `https://picsum.photos/seed/box${id}/600/400`,
        description: `High-quality, customizable ${name.toLowerCase()} perfect for your brand. Our boxes are durable, stylish, and designed to protect your products while providing a great unboxing experience.`,
        created_at: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
        profiles: {
            company_name: supplier.name,
        },
    };
});
