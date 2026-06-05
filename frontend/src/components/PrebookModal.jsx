import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

function PrebookModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/prebook`, {
        ...formData,
        productSlug: product.slug,
        productName: product.name
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to prebook. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>×</button>
        {submitted ? (
          <div className="modal-success">
            <h2>Thank You!</h2>
            <p>Your interest in <strong>{product.name}</strong> has been registered. We'll contact you when it's available!</p>
            <button className="btn btn-primary mt-4" onClick={handleClose}>Close</button>
          </div>
        ) : (
          <>
            <h2>Prebook {product.name}</h2>
            <p>Register your interest to get early access.</p>
            <form onSubmit={handleSubmit} className="prebook-form">
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input type="tel" placeholder="Phone Number (Optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default PrebookModal;
