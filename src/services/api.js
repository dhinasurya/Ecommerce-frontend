import API from "../api/axios";

// ------------------------------
// PRODUCTS
// ------------------------------
export const productService = {
  list: () => API.get("/products"),
  add: (payload) => API.post("/products", payload),
};

// ------------------------------
// CART (No userId needed, backend uses JWT)
// ------------------------------
export const cartService = {
  getCart: () => API.get("/cart"),
  createCart: () => API.post("/cart"),
  addToCart: (productId, quantity = 1) =>
    API.post("/cart/add", { product_id: productId, quantity }),
  removeFromCart: (productId, quantity = 1) =>
    API.post("/cart/remove", { product_id: productId, quantity }),
  checkout: () => API.post("/cart/checkout"),
};

// ------------------------------
// ORDERS (Also uses JWT user)
// ------------------------------
export const orderService = {
  list: () => API.get("/orders"),
};