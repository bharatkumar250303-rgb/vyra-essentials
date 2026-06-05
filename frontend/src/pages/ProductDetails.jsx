import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PrebookModal from '../components/PrebookModal';
import { API_BASE_URL } from '../config/api';

const PERKS = [
  { icon: '🌿', label: 'Clean Formula' },
  { icon: '🇰🇷', label: 'K-Beauty Origin' },
  { icon: '📦', label: 'Early Access' },
];

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (price) => (
    typeof price === 'number' ? `₹${price}` : 'Price on launch'
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="product-page-grid">
            <div className="product-card product-card-loading" style={{ borderRadius: 'var(--radius-lg)', height: 480 }}>
              <div className="product-image-container" style={{ height: '100%', aspectRatio: 'unset' }} />
            </div>
            <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span className="loading-line short" />
              <span className="loading-line" style={{ height: 48, borderRadius: 8 }} />
              <span className="loading-line muted" />
              <span className="loading-line muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page">
        <div className="container" style={{ textAlign: 'center', paddingTop: 60 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Product not found.</p>
          <Link to="/" className="btn btn-secondary" style={{ marginTop: 24, maxWidth: 200, margin: '24px auto 0' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="product-page">
      <div className="container">
        <div className="product-page-grid">

          {/* Image */}
          <div className="product-page-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="product-page-image"
            />
          </div>

          {/* Content */}
          <div className="product-page-content">
            <Link to="/" className="product-page-back">
              ← Back to collection
            </Link>

            <span className="product-page-category">{product.category}</span>

            <h1 className="product-page-title">{product.name}</h1>

            <div className="product-page-price-tag">
              <span className="product-page-price-tag-dot" />
              {formatPrice(product.price)}
            </div>

            <div className="product-page-divider" />

            <p className="product-page-description">{product.description}</p>

            <div className="product-page-perks">
              {PERKS.map((perk) => (
                <span className="product-page-perk" key={perk.label}>
                  <span className="product-page-perk-icon">{perk.icon}</span>
                  {perk.label}
                </span>
              ))}
            </div>

            <div className="product-page-buttons">
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                Prebook Early Access
              </button>
              <Link to="/" className="btn btn-ghost">
                View All Products
              </Link>
            </div>
          </div>

        </div>
      </div>

      <PrebookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} />
    </section>
  );
}

export default ProductDetails;
