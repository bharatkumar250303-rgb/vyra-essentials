import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Prebook from './models/Prebook.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;
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
    {
        slug: 'single-use-hair-mask',
        name: 'Single-Use Hair Mask',
        category: 'Hair Care',
        price: null,
        image: '/products/single-use-hair-mask.webp',
        description: 'A single-use rice and keratin hair inner treatment cream with keratin, provitamin B5 and hyaluron. Designed for use before straightening, curling or coloring.'
    },
    {
        slug: 'cooling-toner-pad',
        name: 'Cooling Toner Pad',
        category: 'Skin Care',
        price: null,
        image: '/products/cooling-toner-pad.webp',
        description: 'Real Centella Cica cooling water-fit toner pads for calming, soothing and moisturizing care. Each pack includes 4 pads with 10 ml of toner.'
    },
    {
        slug: 'hair-brush-cleaner',
        name: 'Hair Brush Cleaner',
        category: 'Hair Care',
        price: null,
        image: '/products/hair-brush-cleaner.webp',
        description: 'A compact hair brush cleaner with firm bristles for lifting trapped hair, lint and buildup from styling brushes and combs.'
    },
    {
        slug: 'sebum-nose-strips',
        name: 'Pore-Refining Sebum Nose Strips',
        category: 'Skin Care',
        price: null,
        image: '/products/sebum-nose-strips.webp',
        description: 'Single-use sebum nose strip made for sensitive skin. Helps remove blackheads and impurities, absorb excess sebum, and shrink and refine pores with a gentle botanical-extract formula.'
    },
    {
        slug: 'retinol-pore-lifting-toner-pad',
        name: 'Retinol Pore Lifting Toner Pad',
        category: 'Skin Care',
        price: null,
        image: '/products/retinol-pore-lifting-toner-pad.webp',
        description: 'Retinol toner pads formulated to plump and smooth the skin while supporting deep-pore and lifting care. Use across the face after cleansing or as a 10-minute spot treatment.'
    },
    {
        slug: 'hydrocolloid-dressing-roll',
        name: 'Hydrocolloid Dressing Roll',
        category: 'Acne Care',
        price: null,
        image: '/products/hydrocolloid-dressing-roll.webp',
        description: 'Medical-grade hydrocolloid dressing roll that supports natural healing, protects against dirt and absorbs excess moisture. Breathable, comfortable and customizable in size and shape.'
    },
    {
        slug: 'anti-aging-butterfly-mask',
        name: 'Anti-Aging Butterfly Mask',
        category: 'Eye Care',
        price: null,
        image: '/products/anti-aging-butterfly-mask.webp',
        description: 'Pro-xylane eye-zone butterfly masks for fine lines and anti-wrinkle care. Each box includes 5 masks enriched with pro-xylane, alcohol, triple hyaluronic acid, collagen and ectoin.'
    },
    {
        slug: 'yogurt-sunscreen',
        name: 'Yogurt Single-Use Sunscreen',
        category: 'Sun Care',
        price: null,
        image: '/products/yogurt-sunscreen.webp',
        description: 'Single-use yogurt sunscreen with SPF 50+ PA++++ and vitamin C. Lightweight, non-sticky and made for clear, bright-looking skin with 0% UV, 0% alcohol and 0% chemical claims on the pack.'
    }
];

async function seedDatabase() {
    try {
        const slugs = initialProducts.map(product => product.slug);
        await Product.deleteMany({ slug: { $nin: slugs } });
        await Product.bulkWrite(initialProducts.map(product => ({
            updateOne: {
                filter: { slug: product.slug },
                update: { $set: product },
                upsert: true
            }
        })));
        console.log('Product catalog synced.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// API Routes
app.post('/api/prebook', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            // Check if this email already prebooked the same product
            const existing = await Prebook.findOne({
                email: req.body.email,
                productSlug: req.body.productSlug
            });
            if (existing) {
                return res.status(409).json({ message: 'already_prebooked' });
            }
            const newPrebook = new Prebook(req.body);
            await newPrebook.save();
        } else {
            console.log('Database not connected. Mock saved prebook:', req.body);
        }
        res.status(201).json({ message: 'Successfully prebooked!' });
    } catch (error) {
        // Handle duplicate key error from the unique index as a fallback
        if (error.code === 11000) {
            return res.status(409).json({ message: 'already_prebooked' });
        }
        console.error('Prebook error:', error);
        res.status(500).json({ message: 'Failed to register prebooking.' });
    }
});

app.get('/api/products', async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        console.log('Database not connected, serving mock products.');
        return res.json(initialProducts);
    }
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.json(initialProducts);
    }
});

app.get('/api/products/:slug', async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        console.log(`Database not connected, serving mock product for ${req.params.slug}.`);
        const product = initialProducts.find(p => p.slug === req.params.slug);
        return product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
    }
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
