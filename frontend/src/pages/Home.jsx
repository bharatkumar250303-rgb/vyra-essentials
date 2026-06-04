import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-tag">Premium Korean Beauty</span>
            <h1 className="hero-title">Modern Skincare Meets Everyday Luxury</h1>
            <p className="hero-subtitle">
              Discover premium skincare, wellness and beauty products inspired by Korean beauty innovation.
            </p>
          </div>
          <div className="hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop" 
              className="hero-image" 
              alt="Hero"
            />
          </div>
        </div>
      </section>

      <section className="featured-products" id="products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div className="product-card" key={product.slug}>
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">₹{product.price}</p>
                    <div className="button-group">
                      <Link to={`/product/${product.slug}`} className="btn btn-dark">
                        View Product
                      </Link>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => addToCart(product)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
