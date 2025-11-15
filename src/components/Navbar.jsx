import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>Products</Link>
            <Link to="/cart" style={styles.link}>Cart</Link>
            <Link to="/orders" style={styles.link}>Orders</Link>
        </nav>
    );
}

const styles = {
  nav: {
    padding: "1rem",
    background: "#222",
    display: "flex",
    gap: "2rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};