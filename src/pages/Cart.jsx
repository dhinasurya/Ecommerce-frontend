import { useEffect, useState } from "react";
import { cartService } from "../services/api";

export default function Cart() {
  const userId = 1;
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const loadCart = () => {
    setLoading(true);
    cartService
      .getCart(userId)
      .then((res) => setCart(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart.items.length === 0)
    return <h3 style={{ padding: "2rem" }}>Cart is empty.</h3>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart</h2>
      <p style={{ fontStyle: "italic" }}>Expires in: {cart.expires_in}</p>

      {cart.items.map((item) => (
        <div key={item.product_id} style={itemBox}>
          <h3>{item.product}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: ₹{item.subtotal}</p>

          <button
            disabled={actionLoading}
            onClick={() => {
              setActionLoading(true);
              cartService
                .removeFromCart(userId, item.product_id, 1)
                .then(loadCart)
                .finally(() => setActionLoading(false));
            }}
          >
            Remove 1
          </button>

          <button
            disabled={actionLoading}
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              setActionLoading(true);
              cartService
                .removeFromCart(userId, item.product_id, item.quantity)
                .then(loadCart)
                .finally(() => setActionLoading(false));
            }}
          >
            Remove All
          </button>

          <button
            disabled={actionLoading}
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              setActionLoading(true);
              cartService
                .addToCart(userId, item.product_id, 1)
                .then(loadCart)
                .finally(() => setActionLoading(false));
            }}
          >
            + Add 1
          </button>
        </div>
      ))}

      <h3 style={{ marginTop: "2rem" }}>Total: ₹{cart.total}</h3>

      <button
        disabled={actionLoading}
        style={checkoutBtn}
        onClick={() =>
          cartService.checkout(userId).then(() => {
            alert("Order placed!");
            loadCart();
          })
        }
      >
        Checkout
      </button>
    </div>
  );
}

const itemBox = {
  border: "1px solid #ddd",
  padding: "1rem",
  marginTop: "1rem",
  borderRadius: "8px",
};

const checkoutBtn = {
  marginTop: "1rem",
  padding: "0.7rem 1.2rem",
  background: "green",
  color: "white",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};