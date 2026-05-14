const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = process.env.PORT || 5000;



// CART

let cart = [];



// PRODUCTS

const products = [

{
    slug: 'guasha-brush',
    name: 'Guasha Brush',
    category: 'Skin Care',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=1000&auto=format&fit=crop',
    description: 'A sculpting facial massage tool designed to support circulation.'
},

{
    slug: 'sunscreen-blush',
    name: 'Sunscreen Blush',
    category: 'Makeup',
    price: 999,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop',
    description: 'Radiant blush with skincare-inspired sun protection.'
},

{
    slug: 'hair-mask',
    name: 'Single Use Hair Mask',
    category: 'Hair Care',
    price: 699,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop',
    description: 'Deep nourishment treatment for smooth shiny hair.'
},

{
    slug: 'gua-sha-body-cream',
    name: 'Gua Sha Massage Body Cream',
    category: 'Body Care',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop',
    description: 'Hydrating body cream designed for massage rituals.'
},

{
    slug: 'sheet-mask-tub',
    name: '1 Day Sheet Mask Tub',
    category: 'Skin Care',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1000&auto=format&fit=crop',
    description: 'Daily hydration masks for glowing refreshed skin.'
},

{
    slug: 'lifting-toner-pads',
    name: 'Lifting Toner Pads',
    category: 'Skin Care',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=1000&auto=format&fit=crop',
    description: 'Gentle exfoliating toner pads for smoother skin.'
},

{
    slug: 'collagen-patches',
    name: 'Dissolvable Collagen Patches',
    category: 'Treatments',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?q=80&w=1000&auto=format&fit=crop',
    description: 'Collagen patches for targeted nourishment and care.'
},

{
    slug: 'hydrocolloid-patches',
    name: 'Hydrocolloid Face Patches',
    category: 'Acne Care',
    price: 899,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1000&auto=format&fit=crop',
    description: 'Protective acne patches designed for recovery.'
},

{
    slug: 'ear-seeds',
    name: 'Ear Seeds',
    category: 'Wellness',
    price: 799,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop',
    description: 'Pressure point wellness patches for relaxation.'
},

{
    slug: 'led-face-mask',
    name: 'LED Face Mask',
    category: 'Beauty Device',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
    description: 'LED skincare device for brighter healthier-looking skin.'
}

];



// HOME PAGE

app.get('/', (req, res) => {

    res.render('index', {
        products
    });

});



// PRODUCT PAGE

app.get('/product/:slug', (req, res) => {

    const product = products.find(
        item => item.slug === req.params.slug
    );

    if (!product) {

        return res.send('Product not found');

    }

    res.render('product', {
        product
    });

});



// ADD TO CART

app.get('/add-to-cart/:slug', (req, res) => {

    const product = products.find(
        item => item.slug === req.params.slug
    );

    if (product) {

        cart.push(product);

    }

    res.redirect('/cart');

});



// CART PAGE

app.get('/cart', (req, res) => {

    const subtotal = cart.reduce((total, item) => {

        return total + item.price;

    }, 0);

    const discount = subtotal > 3000 ? 500 : 0;

    const finalTotal = subtotal - discount;

    res.render('cart', {
        cart,
        subtotal,
        discount,
        finalTotal
    });

});



app.listen(PORT, () => {

    console.log(`VYRA running on port ${PORT}`);

});