// const API_BASE = "http://localhost:5000/api";
const API_BASE = "https://tech-deal-backend.onrender.com/api";


export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}
