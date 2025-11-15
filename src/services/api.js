import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  list: () => API.get("/products"),
  add: (payload) => API.post("/products", payload),
};

export const cartService = {
  getCart: (userId) => API.get(`/users/${userId}/cart`),
  createCart: (userId) => API.post(`/users/${userId}/cart`),
  addToCart: (userId, productId, quantity = 1) =>
    API.post(`/users/${userId}/cart/add`, { product_id: productId, quantity }),
  removeFromCart: (userId, productId, quantity = 1) =>
    API.post(`/users/${userId}/cart/remove`, { product_id: productId, quantity }),
  checkout: (userId) => API.post(`/users/${userId}/cart/checkout`),
};

export const orderService = {
  list: (userId) => API.get(`/users/${userId}/orders`),
};