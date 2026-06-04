import { Link } from 'react-router-dom';

function Cart({ cart, updateQuantity, removeFromCart }) {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = subtotal > 3000 ? 500 : 0;
  const finalTotal = subtotal - discount;

  return (
    <>
      <header className="navbar" style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1>Your Cart</h1>
        <Link to="/" className="cart-btn btn btn-dark" style={{ display: 'inline-block', marginTop: '10px' }}>
          Continue Shopping
        </Link>
      </header>

      <section className="cart-page">
        <div className="container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty.</h2>
            </div>
          ) : (
            <>
              <div id="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.slug}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-info">
                      <h2>{item.name}</h2>
                      <p>Price: ₹{item.price}</p>
                      <p>Subtotal: ₹{item.price * item.quantity}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.slug, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.slug, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.slug)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="total-box">
                {discount > 0 && <p style={{ fontSize: '18px', color: '#00a2a2', marginBottom: '10px' }}>Discount applied: -₹{discount}</p>}
                Total: ₹<span id="total-price">{finalTotal}</span>
                <br />
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;
