import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetails({ addToCart }) {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="container" style={{ padding: '100px 0' }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: '100px 0' }}>Product not found</div>;

  return (
    <section className="product-page">
      <div className="container">
        <div className="product-page-grid">
          <div className="product-page-image-wrapper">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-page-image" 
            />
          </div>
          <div className="product-page-content">
            <span className="product-page-category">{product.category}</span>
            <h1 className="product-page-title">{product.name}</h1>
            <p className="product-page-price">₹{product.price}</p>
            <p className="product-page-description">{product.description}</p>
            <div className="product-page-buttons">
              <button 
                className="btn btn-primary" 
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
              <Link to="/cart" className="btn btn-dark">
                Go To Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
