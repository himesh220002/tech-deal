// frontend/src/api/auth.js
const API_BASE = "http://localhost:5000/api/auth";

async function handleResponse(res) {
  try {
    return await res.json();
  } catch {
    return { message: "Server error", status: res.status };
  }
}

export async function signup(email, password) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  console.log("📨 Signup response:", data);

  return data;
}

export async function logout(email) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/logout`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,
     },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function getProtected(token) {
  const res = await fetch(`http://localhost:5000/api/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}


