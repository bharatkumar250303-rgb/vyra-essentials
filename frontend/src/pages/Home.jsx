import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PrebookModal from '../components/PrebookModal';
import { API_BASE_URL } from '../config/api';
import { FiArrowDown } from 'react-icons/fi';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const handlePrebookClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const formatPrice = (price) => (
    typeof price === 'number' ? `₹${price}` : 'Price on launch'
  );

  const categories = useMemo(() => (
    ['All', ...new Set(products.map((product) => product.category))]
  ), [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

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
      {/* ── HERO ────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1800&auto=format&fit=crop"
            className="hero-image"
            alt="Premium Korean beauty products flatlay"
          />
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-tag">
              <span className="hero-tag-dot" />
              Premium Korean Beauty
            </span>

            <h1 className="hero-title">
              Modern Skincare,<br />
              <em>Everyday Luxury</em>
            </h1>

            <p className="hero-subtitle">
              Curated Korean beauty essentials — skincare, hair care and wellness
              tools crafted for real results.
            </p>

            <div className="hero-actions">
              <a href="#products" className="hero-cta">
                Explore Collection
                <span className="hero-cta-arrow" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiArrowDown />
                </span>
              </a>

              <div className="hero-stat">
                <span className="hero-stat-num">8+</span>
                <span className="hero-stat-label">Products launching</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="hero-scroll-line" />
          Scroll
        </div>
      </section>

      {/* ── PRODUCTS ────────────────────────────────── */}
      <section className="featured-products" id="products">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Launch Collection</span>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <p className="section-subtitle">
              Focused essentials across skincare, hair care and beauty — ready for early access.
            </p>
          </div>

          {loading ? (
            <div className="products-grid">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="product-card product-card-loading" key={index}>
                  <div className="product-image-container" />
                  <div className="product-info">
                    <span className="loading-line short" />
                    <span className="loading-line" />
                    <span className="loading-line muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="category-filter" aria-label="Filter by category">
                {categories.map((category) => (
                  <button
                    className={`filter-chip${activeCategory === category ? ' active' : ''}`}
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <div className="product-card" key={product.slug}>
                    <Link to={`/product/${product.slug}`} className="product-image-container">
                      <img src={product.image} alt={product.name} className="product-img" />
                      <span className="product-badge">{product.category}</span>
                    </Link>
                    <div className="product-info">
                      <span className="product-category">{product.category}</span>
                      <Link to={`/product/${product.slug}`} className="product-name-link">
                        <h3 className="product-name">{product.name}</h3>
                      </Link>
                      <p className="product-description">{product.description}</p>
                      <p className="product-price">{formatPrice(product.price)}</p>
                      <div className="product-card-actions">
                        <Link to={`/product/${product.slug}`} className="btn btn-ghost">
                          Details
                        </Link>
                        <button className="btn btn-primary" onClick={() => handlePrebookClick(product)}>
                          Prebook
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
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
