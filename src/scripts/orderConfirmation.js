const orderId = localStorage.getItem("orderId");

if (orderId) {
  document.getElementById("order-id").textContent = orderId;
} else {
  console.warn("Ingen orderId hittades i localStorage.");
  document.getElementById("order-id").textContent = "Okänd";
}
