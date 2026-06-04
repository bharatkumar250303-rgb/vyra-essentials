import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { useState, useEffect } from 'react';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.slug === product.slug);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (slug, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity < 1) {
        return prevCart.filter((item) => item.slug !== slug);
      }
      return prevCart.map((item) =>
        item.slug === slug ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeFromCart = (slug) => {
    setCart((prevCart) => prevCart.filter((item) => item.slug !== slug));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:slug" element={<ProductDetails addToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
