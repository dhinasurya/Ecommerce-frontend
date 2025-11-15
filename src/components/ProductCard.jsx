import { cartService } from "../services/api";

export default function ProductCard({ product }) {
  const userId = 1; // temporary fixed user

  const handleAdd = () => {
    cartService
      .addToCart(product.id, 1)
      .then(() => alert("Added to cart!"))
      .catch((err) => console.error(err));
  };

  return (
    <div style={card}>
      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>
      <p>Stock: {product.available_quantity}</p>

      <button onClick={handleAdd} style={btn}>
        Add to Cart
      </button>
    </div>
  );
}

const card = {
  padding: "1rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

const btn = {
  marginTop: "1rem",
  padding: "0.5rem 1rem",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};