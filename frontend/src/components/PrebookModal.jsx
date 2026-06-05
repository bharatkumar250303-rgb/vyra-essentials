import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { FiX, FiCheckCircle, FiStar, FiFeather, FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';

function PrebookModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [alreadyPrebooked, setAlreadyPrebooked] = useState(false);
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
      if (err.response?.status === 409) {
        setAlreadyPrebooked(true);
      } else {
        console.error(err);
        alert('Failed to prebook. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setAlreadyPrebooked(false);
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose} aria-label="Close modal">
          <FiX />
        </button>

        {submitted ? (
          /* ── Success State ─────────────────── */
          <div className="modal-success">
            <div className="modal-success-icon">
              <FiCheckCircle style={{ color: 'var(--accent-color)' }} />
            </div>
            <h2>You're in!</h2>
            <p>
              We've registered your interest in <strong>{product.name}</strong>.
              We'll notify you first when it goes live!
            </p>
            <button className="btn btn-primary mt-4" onClick={handleClose}>
              Done
            </button>
          </div>

        ) : alreadyPrebooked ? (
          /* ── Already Prebooked State ───────── */
          <div className="modal-success">
            <div className="modal-success-icon modal-already-icon">
              <FiStar style={{ color: 'var(--gold-accent)' }} />
            </div>
            <h2>Already registered!</h2>
            <p>
              Your email is already on the waitlist for <strong>{product.name}</strong>.
              We'll be in touch when it launches!
            </p>
            <button className="btn btn-primary mt-4" onClick={handleClose}>
              Got it
            </button>
          </div>

        ) : (
          /* ── Form State ────────────────────── */
          <>
            <div className="modal-header-bar">
              <div className="modal-icon">
                <FiFeather style={{ color: 'var(--accent-color)' }} />
              </div>
              <div>
                <h2>Prebook</h2>
                <p className="modal-product-name">{product.name}</p>
              </div>
            </div>

            <p>Register your interest and get early access before we launch publicly.</p>

            <form onSubmit={handleSubmit} className="prebook-form">
              <div className="form-field">
                <span className="form-field-icon">
                  <FiUser style={{ verticalAlign: 'middle' }} />
                </span>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  autoComplete="name"
                />
              </div>

              <div className="form-field">
                <span className="form-field-icon">
                  <FiMail style={{ verticalAlign: 'middle' }} />
                </span>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  autoComplete="email"
                />
              </div>

              <div className="form-field">
                <span className="form-field-icon">
                  <FiPhone style={{ verticalAlign: 'middle' }} />
                </span>
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  autoComplete="tel"
                />
              </div>

              <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
                {loading ? 'Submitting…' : 'Register My Interest'}
              </button>

              <p className="form-note">
                <FiLock style={{ marginRight: '6px', transform: 'translateY(-1px)', display: 'inline-block', verticalAlign: 'middle' }} />
                Your info is safe with us. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default PrebookModal;
