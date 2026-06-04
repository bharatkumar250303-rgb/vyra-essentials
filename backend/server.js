import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vyra';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch(err => {
    console.error('MongoDB connection error. Starting server anyway...', err);
  });

const initialProducts = [
    { slug: 'guasha-brush', name: 'Guasha Brush', category: 'Skin Care', price: 1299, image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=1000&auto=format&fit=crop', description: 'A sculpting facial massage tool designed to support circulation.' },
    { slug: 'sunscreen-blush', name: 'Sunscreen Blush', category: 'Makeup', price: 999, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop', description: 'Radiant blush with skincare-inspired sun protection.' },
    { slug: 'hair-mask', name: 'Single Use Hair Mask', category: 'Hair Care', price: 699, image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop', description: 'Deep nourishment treatment for smooth shiny hair.' },
    { slug: 'gua-sha-body-cream', name: 'Gua Sha Massage Body Cream', category: 'Body Care', price: 1499, image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop', description: 'Hydrating body cream designed for massage rituals.' },
    { slug: 'sheet-mask-tub', name: '1 Day Sheet Mask Tub', category: 'Skin Care', price: 1799, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1000&auto=format&fit=crop', description: 'Daily hydration masks for glowing refreshed skin.' },
    { slug: 'lifting-toner-pads', name: 'Lifting Toner Pads', category: 'Skin Care', price: 1199, image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=1000&auto=format&fit=crop', description: 'Gentle exfoliating toner pads for smoother skin.' },
    { slug: 'collagen-patches', name: 'Dissolvable Collagen Patches', category: 'Treatments', price: 1899, image: 'https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?q=80&w=1000&auto=format&fit=crop', description: 'Collagen patches for targeted nourishment and care.' },
    { slug: 'hydrocolloid-patches', name: 'Hydrocolloid Face Patches', category: 'Acne Care', price: 899, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1000&auto=format&fit=crop', description: 'Protective acne patches designed for recovery.' },
    { slug: 'ear-seeds', name: 'Ear Seeds', category: 'Wellness', price: 799, image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop', description: 'Pressure point wellness patches for relaxation.' },
    { slug: 'led-face-mask', name: 'LED Face Mask', category: 'Beauty Device', price: 4999, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop', description: 'LED skincare device for brighter healthier-looking skin.' }
];

async function seedDatabase() {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(initialProducts);
            console.log('Database seeded with initial products.');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        // Fallback for when Mongo isn't connected
        res.json(initialProducts);
    }
});

app.get('/api/products/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        const product = initialProducts.find(p => p.slug === req.params.slug);
        if (product) res.json(product);
        else res.status(404).json({ message: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});