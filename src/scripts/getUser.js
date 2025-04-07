const storedUser = JSON.parse(localStorage.getItem("user"));
const orderId = localStorage.getItem("orderId");

if (storedUser) {
  document.getElementById("username-order").textContent = storedUser.name;
  document.getElementById("address-order").textContent = storedUser.address;
} else {
  console.warn("Ingen användare hittades i localStorage.");
}

// ✅ Fetch and display products + total price
if (orderId) {
  fetch(`http://localhost:4001/api/order/${orderId}`)
    .then((res) => res.json())
    .then((order) => {
      console.log("Fetched order:", order);
      const orderId = localStorage.getItem("orderId");
      console.log("Order ID from localStorage:", orderId);
      const productsContainer = document.getElementById("products-order");
      const totalPriceContainer = document.getElementById("total-price-order");

      if (order && order.items && order.items.length > 0) {
        let productList = "";
        let totalPrice = 0;

        // Fetch product details for each item in the order
        const productPromises = order.items.map((item) => {
          return fetch(`http://localhost:4001/api/products/${item.product_id}`)
            .then((res) => res.json())
            .then((product) => {
              const title = product.title || "Okänd produkt"; // Use product title
              const price = item.price || 0;
              const quantity = item.quantity || 1;
              const itemTotal = price * quantity;

              totalPrice += itemTotal;
              productList += `${title} - ${quantity} st -  ${itemTotal} kr<br>`;
            })
            .catch((error) =>
              console.error("Error fetching product details:", error)
            );
        });

        // After all products are fetched, display the order details
        Promise.all(productPromises)
          .then(() => {
            productsContainer.innerHTML = productList;
            totalPriceContainer.textContent = `${totalPrice} kr`;
          })
          .catch((error) => {
            productsContainer.textContent =
              "Fel vid hämtning av produktinformation.";
            console.error("Error fetching product information:", error);
          });
      } else {
        productsContainer.textContent = "Inga produkter i beställningen.";
        totalPriceContainer.textContent = "0 kr";
      }
    })
    .catch((error) => console.error("Fel vid hämtning av beställning:", error));
} else {
  console.warn("Ingen orderId hittades i localStorage.");
}
