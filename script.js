const BASE_URL_CUSTOMER = "https://suriyawan-saffari-backend.onrender.com";

fetch(`${BASE_URL_CUSTOMER}/api/customer/products`)
  .then(res => res.json())
  .then(data => console.log("Customer Products:", data))
  .catch(err => console.error("Customer error:", err));
