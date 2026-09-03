const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const connectDB = require('./src/config/db');

// Load environment variables and connect to the database
dotenv.config();
connectDB();

const sampleProducts = [
  // ==========================
  // CATEGORY: ELECTRONICS
  // ==========================
  {
    name: 'Premium Wireless Headphones',
    description: 'Over-ear headphones with active noise cancellation, deep bass, and 40-hour battery life.',
    price: 299.99,
    category: 'Electronics',
    stock: 50,
    imageUrls: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80']
  },
  {
    name: 'Ultra-Slim 4K Monitor',
    description: '27-inch 4K UHD IPS monitor with ultra-thin bezels and HDR10 support for creators.',
    price: 399.00,
    category: 'Electronics',
    stock: 15,
    imageUrls: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80']
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'Tenkeyless mechanical keyboard with tactile brown switches and customizable RGB lighting.',
    price: 129.99,
    category: 'Electronics',
    stock: 30,
    imageUrls: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80']
  },
  {
    name: 'Ergonomic Wireless Mouse',
    description: 'Advanced ergonomic mouse designed for comfort, featuring a high-precision sensor and multi-device flow.',
    price: 89.50,
    category: 'Electronics',
    stock: 45,
    imageUrls: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80']
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker delivering 360-degree sound and 12 hours of playtime.',
    price: 119.99,
    category: 'Electronics',
    stock: 60,
    imageUrls: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80']
  },
  {
    name: '10,000mAh Power Bank',
    description: 'Fast-charging power bank with dual USB-C output and a sleek metallic finish.',
    price: 49.99,
    category: 'Electronics',
    stock: 100,
    imageUrls: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80']
  },
  {
    name: 'Dual Pad Wireless Charger',
    description: 'Qi-certified fast wireless charging pad for your smartphone and wireless earbuds.',
    price: 39.99,
    category: 'Electronics',
    stock: 75,
    imageUrls: ['https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=800&q=80']
  },
  {
    name: 'Smart LED Desk Lamp',
    description: 'Adjustable LED desk lamp with auto-dimming technology and app control.',
    price: 79.00,
    category: 'Electronics',
    stock: 25,
    imageUrls: ['https://images.unsplash.com/photo-1507473885765-e6ed057f7821?w=800&q=80']
  },
  {
    name: 'Noise-Canceling Earbuds',
    description: 'True wireless earbuds with immersive sound, transparency mode, and sweat resistance.',
    price: 199.99,
    category: 'Electronics',
    stock: 40,
    imageUrls: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80']
  },
  {
    name: 'USB-C 7-in-1 Hub',
    description: 'Multi-port USB-C adapter with 4K HDMI, SD card readers, and 100W power delivery.',
    price: 55.00,
    category: 'Electronics',
    stock: 80,
    imageUrls: ['https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800&q=80']
  },

  // ==========================
  // CATEGORY: ACCESSORIES
  // ==========================
  {
    name: 'Classic Leather Wallet',
    description: 'Hand-stitched genuine leather bifold wallet with 6 card slots and a cash compartment.',
    price: 65.00,
    category: 'Accessories',
    stock: 55,
    imageUrls: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80']
  },
  {
    name: 'Polarized Aviator Sunglasses',
    description: 'Timeless aviator design featuring polarized lenses and a lightweight alloy frame.',
    price: 145.00,
    category: 'Accessories',
    stock: 30,
    imageUrls: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80']
  },
  {
    name: 'Minimalist Chronograph Watch',
    description: 'Sleek 40mm stainless steel watch with a matte black dial and premium mesh strap.',
    price: 210.00,
    category: 'Accessories',
    stock: 20,
    imageUrls: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80']
  },
  {
    name: 'Water-Resistant Travel Duffel',
    description: 'Durable 40L weekend duffel bag made from heavy-duty canvas with leather accents.',
    price: 130.00,
    category: 'Accessories',
    stock: 25,
    imageUrls: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80']
  },
  {
    name: 'Premium Canvas Backpack',
    description: 'Everyday backpack with a padded laptop sleeve and ergonomic shoulder straps.',
    price: 95.00,
    category: 'Accessories',
    stock: 45,
    imageUrls: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'] // Fallback
  },
  {
    name: 'RFID-Blocking Card Holder',
    description: 'Ultra-slim metallic card holder that protects your credit cards from unauthorized scanning.',
    price: 29.99,
    category: 'Accessories',
    stock: 120,
    imageUrls: ['https://images.unsplash.com/photo-1606503153255-59d8b8b828b6?w=800&q=80']
  },
  {
    name: 'Stainless Steel Thermos',
    description: 'Double-wall vacuum insulated flask that keeps drinks cold for 24 hours or hot for 12.',
    price: 34.99,
    category: 'Accessories',
    stock: 90,
    imageUrls: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80']
  },
  {
    name: 'Woven Winter Scarf',
    description: 'Soft, oversized scarf crafted from premium wool blend for maximum warmth.',
    price: 45.00,
    category: 'Accessories',
    stock: 60,
    imageUrls: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80']
  },
  {
    name: 'Genuine Leather Belt',
    description: 'Classic full-grain leather belt with a brushed gunmetal buckle.',
    price: 55.00,
    category: 'Accessories',
    stock: 40,
    imageUrls: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80']
  },
  {
    name: 'Matte Black Fountain Pen',
    description: 'Elegant executive fountain pen with a smooth-writing fine nib and metallic body.',
    price: 85.00,
    category: 'Accessories',
    stock: 20,
    imageUrls: ['https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80']
  },

  // ==========================
  // CATEGORY: APPAREL
  // ==========================
  {
    name: 'Classic White Oxford Shirt',
    description: 'A tailored fit 100% cotton oxford shirt, perfect for both casual and formal settings.',
    price: 65.00,
    category: 'Apparel',
    stock: 75,
    imageUrls: ['https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800&q=80']
  },
  {
    name: 'Vintage Denim Jacket',
    description: 'Rugged vintage-wash denim jacket with copper hardware and twin chest pockets.',
    price: 110.00,
    category: 'Apparel',
    stock: 35,
    imageUrls: ['https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80']
  },
  {
    name: 'Slim Fit Chino Pants',
    description: 'Comfort-stretch chino pants in navy blue, offering a clean and modern silhouette.',
    price: 75.00,
    category: 'Apparel',
    stock: 50,
    imageUrls: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80']
  },
  {
    name: 'Merino Wool Crewneck Sweater',
    description: 'Lightweight yet incredibly warm crewneck sweater made from extra-fine merino wool.',
    price: 135.00,
    category: 'Apparel',
    stock: 40,
    imageUrls: ['https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80']
  },
  {
    name: 'Heavyweight Cotton Hoodie',
    description: 'Relaxed fit hoodie crafted from premium 400gsm cotton fleece for ultimate comfort.',
    price: 85.00,
    category: 'Apparel',
    stock: 60,
    imageUrls: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80']
  },
  {
    name: 'Classic Trench Coat',
    description: 'Water-resistant double-breasted trench coat with a belted waist and classic lapels.',
    price: 250.00,
    category: 'Apparel',
    stock: 15,
    imageUrls: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80']
  },
  {
    name: 'Performance Activewear Tee',
    description: 'Moisture-wicking, breathable athletic t-shirt designed for high-intensity workouts.',
    price: 35.00,
    category: 'Apparel',
    stock: 100,
    imageUrls: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80']
  },
  {
    name: 'Minimalist Casual Sneakers',
    description: 'Clean white leather sneakers with a durable rubber sole and memory foam insoles.',
    price: 120.00,
    category: 'Apparel',
    stock: 45,
    imageUrls: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80']
  },
  {
    name: 'Tailored Linen Shorts',
    description: 'Breathable linen blend shorts tailored for a sharp summer look.',
    price: 55.00,
    category: 'Apparel',
    stock: 65,
    imageUrls: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80']
  },
  {
    name: 'Lightweight Puffer Vest',
    description: 'Packable insulated vest perfect for layering during transitional weather.',
    price: 90.00,
    category: 'Apparel',
    stock: 25,
    imageUrls: ['https://images.unsplash.com/photo-1584514945871-3c4ba76b2520?w=800&q=80']
  },

  // ==========================
  // CATEGORY: HOME & LIVING
  // ==========================
  {
    name: 'Handcrafted Ceramic Mug',
    description: 'Minimalist artisan ceramic mug, perfect for your morning coffee or evening tea.',
    price: 18.50,
    category: 'Home & Living',
    stock: 120,
    imageUrls: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop']
  },
  {
    name: 'Scented Soy Wax Candle',
    description: 'Eco-friendly vanilla and sandalwood scented candle with a 40-hour burn time.',
    price: 24.00,
    category: 'Home & Living',
    stock: 85,
    imageUrls: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop']
  },
  {
    name: 'Chunky Woven Throw Blanket',
    description: 'Ultra-soft, hand-knitted chunky throw blanket for cozying up on the couch.',
    price: 65.00,
    category: 'Home & Living',
    stock: 30,
    imageUrls: ['https://images.unsplash.com/photo-1580828369019-2228f411ba72?q=80&w=800&auto=format&fit=crop']
  },
  {
    name: 'Modern Matte Table Vase',
    description: 'Sleek geometric table vase, ideal for dried pampas grass or fresh minimalist florals.',
    price: 32.00,
    category: 'Home & Living',
    stock: 45,
    imageUrls: ['https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=800&auto=format&fit=crop']
  },
  {
    name: 'Bamboo Storage Basket',
    description: 'Natural woven bamboo basket for organizing blankets, laundry, or living room items.',
    price: 28.99,
    category: 'Home & Living',
    stock: 60,
    imageUrls: ['https://images.unsplash.com/photo-1610824771380-390c72f79f11?q=80&w=800&auto=format&fit=crop']
  },
  {
    name: 'Premium Linen Bed Sheets',
    description: 'Breathable 100% French linen queen sheet set in soft neutral grey.',
    price: 145.00,
    category: 'Home & Living',
    stock: 20,
    imageUrls: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop']
  },
  {
    name: 'Hand-Carved Wooden Bowl',
    description: 'Decorative walnut wood bowl, perfect as a centerpiece or fruit display.',
    price: 42.00,
    category: 'Home & Living',
    stock: 25,
    imageUrls: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop']
  },
  {
    name: 'Ultrasonic Essential Oil Diffuser',
    description: 'Whisper-quiet aromatherapy diffuser with warm LED ambient lighting.',
    price: 38.50,
    category: 'Home & Living',
    stock: 55,
    imageUrls: ['https://images.unsplash.com/photo-1608528577891-eb05ebac5f56?q=80&w=800&auto=format&fit=crop']
  },
  {
    name: 'Minimalist Wall Clock',
    description: 'Silent sweep modern wall clock with a sleek black frame and no numbers.',
    price: 29.99,
    category: 'Home & Living',
    stock: 70,
    imageUrls: ['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800&auto=format&fit=crop']
  },
  {
    name: 'Indoor Potted Succulent',
    description: 'Low-maintenance live succulent plant in a premium concrete planter.',
    price: 22.00,
    category: 'Home & Living',
    stock: 90,
    imageUrls: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop']
  }
];

const importData = async () => {
  try {
    // Clear out any existing products to prevent duplicates
    await Product.deleteMany();

    // Insert the sample dataset
    await Product.insertMany(sampleProducts);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();