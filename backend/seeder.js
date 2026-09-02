const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const connectDB = require('./src/config/db');

// Load environment variables and connect to the database
dotenv.config();
connectDB();

const sampleProducts = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 299.99,
    category: 'Electronics',
    stock: 45,
    imageUrls: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'],
  },
  {
    name: 'Minimalist Mechanical Keyboard',
    description: 'Compact 75% layout with tactile switches and customizable RGB backlighting.',
    price: 129.99,
    category: 'Electronics',
    stock: 20,
    imageUrls: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80'],
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Breathable mesh back with adjustable lumbar support and 4D armrests.',
    price: 199.50,
    category: 'Furniture',
    stock: 12,
    imageUrls: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80'],
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall vacuum insulated flask that keeps drinks cold for 24 hours.',
    price: 24.99,
    category: 'Accessories',
    stock: 100,
    imageUrls: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80'],
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