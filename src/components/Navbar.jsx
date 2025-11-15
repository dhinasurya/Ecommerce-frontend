import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  console.log(user)

  return (
    <nav style={styles.nav}>
      
      {/* Left Side Menu */}
      <div style={styles.left}>
        <Link to="/" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
      </div>

      {/* Right Side Auth */}
      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.username}>Hi, {user.username}</span>
            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>

    </nav>
  );
}

const styles = {
  nav: {
    padding: "1rem",
    background: "#222",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    display: "flex",
    gap: "2rem",
  },
  right: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  username: {
    color: "#ddd",
    fontSize: "16px",
  },
  logoutBtn: {
    background: "red",
    border: "none",
    color: "white",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
  }
};