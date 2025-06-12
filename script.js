// Customer Portal Script

// 👇 Backend base URL
const BASE_URL = "https://suriyawan-saffari-backend.onrender.com";

// Example - Customer Dashboard Load
document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome-msg");
  if (welcome) {
    welcome.innerText = "🛒 Customer Dashboard Connected to Backend!";
  }

  // Example - Fetch product data from backend
  fetch(`${BASE_URL}/api/customer/products`)
    .then(res => res.json())
    .then(data => {
      console.log("🧾 Products:", data);
    })
    .catch(err => {
      console.error("❌ Error connecting to backend:", err);
    });
});
