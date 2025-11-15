import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { login } = useAuth(); // auto-login after register
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/auth/register", { username, email, password })
      .then((res) => {
        login(res.data.token); 
        navigate("/");
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Registration failed");
      });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button type="submit" style={btn}>Register</button>
      </form>
    </div>
  );
}

const input = {
  display: "block",
  width: "100%",
  marginBottom: "1rem",
  padding: "0.5rem",
};

const btn = {
  padding: "0.5rem 1rem",
  background: "green",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
};
