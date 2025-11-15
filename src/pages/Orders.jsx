import { useEffect, useState } from "react";
import { orderService } from "../services/api";

export default function Orders() {
  const userId = 1;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    setLoading(true);
    orderService
      .list(userId)
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0)
    return <h3 style={{ padding: "2rem" }}>No orders yet.</h3>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Orders</h2>

      {orders.map((order) => (
        <div key={order.order_id} style={orderBox}>
          <h3>
            Order #{order.order_id} — ₹{order.total_amount}
          </h3>
          <p style={{ color: "gray" }}>Placed on: {order.created_at}</p>

          <div style={{ marginTop: "1rem" }}>
            {order.items.map((item, i) => (
              <div key={i} style={itemRow}>
                <strong>{item.product_name}</strong>  
                <span>Qty: {item.quantity}</span>  
                <span>₹{item.subtotal}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const orderBox = {
  padding: "1rem",
  border: "1px solid #ddd",
  marginBottom: "1.5rem",
  borderRadius: "8px",
  background: "#fafafa",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem",
  background: "#fff",
  marginBottom: "0.4rem",
  borderRadius: "5px",
  border: "1px solid #eee",
};