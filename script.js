// Customer Portal Script – Phase C1 to C16

const BASE_URL = "https://suriyawan-saffari-backend.onrender.com";

// ✅ DOM Load
document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome-msg");
  const status = document.getElementById("status-msg");
  if (welcome) welcome.innerText = "🛒 Welcome to Suriyawan Saffari!";
  if (status) status.innerText = "Connected to backend ✅";

  loadProducts();      // C2
  loadCustomerData();  // C3
});

// ✅ Load Products – Phase C2
function loadProducts() {
  fetch(`${BASE_URL}/api/customer/products`)
    .then(res => res.json())
    .then(data => {
      console.log("🧾 Products:", data);
      showProducts(data.products);
    })
    .catch(err => {
      console.error("❌ Error loading products:", err);
      setStatus("Failed to load products ❌");
    });
}

// ✅ Load Customer Info – Phase C3
function loadCustomerData() {
  fetch(`${BASE_URL}/api/customer/info`, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      console.log("🙋‍♂️ Customer Info:", data);
      setWelcome(`Hello, ${data.name || "Customer"} 👋`);
    })
    .catch(() => setWelcome("Welcome Guest!"));
}

// ✅ Show Products – Phase C4
function showProducts(products = []) {
  const container = document.createElement("div");
  container.className = "product-list";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${product.name}</h2>
      <p>Price: ₹${product.price}</p>
      <button onclick="orderProduct('${product._id}')">Order Now</button>
    `;
    container.appendChild(card);
  });

  document.body.appendChild(container);
}

// ✅ Order Product – Phase C5
function orderProduct(productId) {
  const confirmOrder = confirm("Confirm order for this product?");
  if (!confirmOrder) return;

  fetch(`${BASE_URL}/api/customer/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      alert("🧾 Order placed successfully! ID: " + data.orderId);
    })
    .catch(() => alert("❌ Failed to place order"));
}

// ✅ Set Welcome Text
function setWelcome(text) {
  const el = document.getElementById("welcome-msg");
  if (el) el.innerText = text;
}

// ✅ Set Status Text
function setStatus(text) {
  const el = document.getElementById("status-msg");
  if (el) el.innerText = text;
}

// ✅ Referral Bonus Display – Phase C6
function showReferralInfo() {
  alert("Refer & Earn ₹10! Share your code after your first delivery.");
}

// ✅ Track Delivery – Phase C7
function trackOrder(orderId) {
  fetch(`${BASE_URL}/api/customer/track/${orderId}`, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      alert(`📦 Order Status: ${data.status}`);
    })
    .catch(() => alert("❌ Failed to track order"));
}

// ✅ AI Assistant Chat – Phase C8 to C11
document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.createElement("div");
  chatContainer.id = "chatbox";
  chatContainer.innerHTML = `
    <h3>🤖 Suriyawan Saffari AI Assistant</h3>
    <input type="text" id="chatInput" placeholder="Ask anything...">
    <button onclick="askAI()">Send</button>
    <div id="chatResponse" style="margin-top:10px; color:#333;"></div>
  `;
  document.body.appendChild(chatContainer);
});

function askAI() {
  const query = document.getElementById("chatInput").value;
  if (!query) return;

  fetch(`${BASE_URL}/api/ai/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: query }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("chatResponse").innerText = "🧠 " + data.reply;
    })
    .catch(() => {
      document.getElementById("chatResponse").innerText = "❌ AI failed to respond.";
    });
}

// ✅ Logout – Phase C12
function logoutCustomer() {
  fetch(`${BASE_URL}/api/customer/logout`, {
    method: "POST",
    credentials: "include"
  }).then(() => {
    alert("🔒 You have been logged out.");
    location.reload();
  });
}

// ✅ Future features placeholders – Phase C13–C16
// C13: Wishlist
// C14: Wallet
// C15: Offers
// C16: Feedback
function placeholderFeature(name) {
  alert(`🚧 ${name} feature coming soon!`);
}
