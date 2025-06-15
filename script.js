// Customer Portal Script – D1 to D25

const BASE_URL = "https://suriyawan-saffari-backend.onrender.com";

// ✅ DOM Load document.addEventListener("DOMContentLoaded", () => { const welcome = document.getElementById("welcome-msg"); const status = document.getElementById("status-msg"); if (welcome) welcome.innerText = "🛒 Welcome to Suriyawan Saffari!"; if (status) status.innerText = "Connected to backend ✅";

loadProducts();      // D2 loadCustomerData();  // D3 });

// ✅ Load Products – D2 function loadProducts() { fetch(${BASE_URL}/api/customer/products) .then(res => res.json()) .then(data => { console.log("🧾 Products:", data); showProducts(data.products); }) .catch(err => { console.error("❌ Error loading products:", err); setStatus("Failed to load products ❌"); }); }

// ✅ Load Customer Info – D3 function loadCustomerData() { fetch(${BASE_URL}/api/customer/info, { credentials: "include" }) .then(res => res.json()) .then(data => { console.log("🙋‍♂️ Customer Info:", data); setWelcome(Hello, ${data.name || "Customer"} 👋); }) .catch(() => setWelcome("Welcome Guest!")); }

// ✅ Show Products – D4 function showProducts(products = []) { const container = document.createElement("div"); container.className = "product-list";

products.forEach(product => { const card = document.createElement("div"); card.className = "card"; card.innerHTML = <h2>${product.name}</h2> <p>Price: ₹${product.price}</p> <button onclick="orderProduct('${product._id}')">Order Now</button>; container.appendChild(card); });

document.body.appendChild(container); }

// ✅ Order Product – D5 function orderProduct(productId) { const confirmOrder = confirm("Confirm order for this product?"); if (!confirmOrder) return;

fetch(${BASE_URL}/api/customer/order, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId }), credentials: "include" }) .then(res => res.json()) .then(data => { alert("🧾 Order placed successfully! ID: " + data.orderId); }) .catch(() => alert("❌ Failed to place order")); }

// ✅ Set Welcome Text function setWelcome(text) { const el = document.getElementById("welcome-msg"); if (el) el.innerText = text; }

// ✅ Set Status Text function setStatus(text) { const el = document.getElementById("status-msg"); if (el) el.innerText = text; }

// ✅ Referral Bonus Display – D6 function showReferralInfo() { alert("Refer & Earn ₹10! Share your code after your first delivery."); }

// ✅ Track Delivery – D7 function trackOrder(orderId) { fetch(${BASE_URL}/api/customer/track/${orderId}, { credentials: "include" }) .then(res => res.json()) .then(data => { alert(📦 Order Status: ${data.status}); }) .catch(() => alert("❌ Failed to track order")); }

// ✅ Help Desk Chat – D8 to D11 document.addEventListener("DOMContentLoaded", () => { const chatContainer = document.createElement("div"); chatContainer.id = "chatbox"; chatContainer.innerHTML = <h3>💬 Help Desk</h3> <input type="text" id="chatInput" placeholder="Ask anything..."> <button onclick="askHelpDesk()">Send</button> <div id="chatResponse" style="margin-top:10px; color:#333;"></div>; document.body.appendChild(chatContainer); });

function askHelpDesk() { const query = document.getElementById("chatInput").value; if (!query) return;

fetch(${BASE_URL}/api/helpdesk/ask, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: query }), }) .then(res => res.json()) .then(data => { document.getElementById("chatResponse").innerText = "💬 " + data.reply; }) .catch(() => { document.getElementById("chatResponse").innerText = "❌ Help Desk not available."; }); }

// ✅ Logout – D12 function logoutCustomer() { fetch(${BASE_URL}/api/customer/logout, { method: "POST", credentials: "include" }).then(() => { alert("🔒 You have been logged out."); location.reload(); }); }

// ✅ Wishlist System – D13 function addToWishlist(productId) { fetch(${BASE_URL}/api/customer/wishlist, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId }), credentials: "include" }) .then(res => res.json()) .then(() => alert("💖 Added to wishlist!")) .catch(() => alert("❌ Failed to add to wishlist")); }

// ✅ Wallet – D14 function checkWalletBalance() { fetch(${BASE_URL}/api/customer/wallet, { credentials: "include" }) .then(res => res.json()) .then(data => alert(💰 Wallet Balance: ₹${data.balance})) .catch(() => alert("❌ Wallet not accessible")); }

// ✅ Offers & Coupons – D15 function getAvailableOffers() { fetch(${BASE_URL}/api/customer/offers, { credentials: "include" }) .then(res => res.json()) .then(data => alert("🎁 Available Offers:\n" + data.offers.join("\n"))) .catch(() => alert("❌ No offers found")); }

// ✅ Feedback – D16 function submitFeedback(message) { fetch(${BASE_URL}/api/customer/feedback, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }), credentials: "include" }) .then(() => alert("✅ Feedback submitted. Thank you!")) .catch(() => alert("❌ Failed to submit feedback")); }

