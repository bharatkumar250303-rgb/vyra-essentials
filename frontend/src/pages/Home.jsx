import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PrebookModal from '../components/PrebookModal';
import { API_BASE_URL } from '../config/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrebookClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const formatPrice = (price) => (
    typeof price === 'number' ? `₹${price}` : 'Price on launch'
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);
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
                  <Link to={`/product/${product.slug}`} className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-img" />
                  </Link>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <Link to={`/product/${product.slug}`} className="product-name-link">
                      <h3 className="product-name">{product.name}</h3>
                    </Link>
                    <p className="product-price">{formatPrice(product.price)}</p>
                    <div className="button-group">
                      <button className="btn btn-primary" onClick={() => handlePrebookClick(product)}>
                        Prebook
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <PrebookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
}

export default Home;
