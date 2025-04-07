let orderId = localStorage.getItem("orderId"); // ✅ Load orderId at the top

fetch("http://localhost:4001/api/products")
  .then((response) => response.json())
  .then((data) => {
    const productList = document.getElementById("product-list-container");

    data.forEach((product) => {
      const productSection = document.createElement("section");
      productSection.classList.add("product-item-container");

      const productInfoUpperRow = document.createElement("article");
      productInfoUpperRow.classList.add("product-info-upper-row");

      const name = document.createElement("h2");
      name.textContent = `${product.title}`;
      const desc = document.createElement("p");
      desc.classList.add("product-info-desc");
      desc.textContent = `${product.desc}`;

      productInfoUpperRow.appendChild(name);
      productInfoUpperRow.appendChild(desc);

      const productInfoLowerRow = document.createElement("article");
      productInfoLowerRow.classList.add("product-info-lower-row");

      const price = document.createElement("p");
      price.classList.add("product-info-price");
      price.textContent = `${product.price} kr`;

      const button = document.createElement("button");
      button.type = "button"; // 👈 prevents form submit
      button.classList.add("product-info-order-button");
      button.textContent = `Lägg till`;

      button.addEventListener("click", async (e) => {
        e.preventDefault(); // 👈 prevents form submission if inside a <form>
        e.stopPropagation(); // 👈 extra safe

        await createOrderIfNotExists(); // ensure order exists first

        fetch(`http://localhost:4001/api/order/${orderId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product.id,
            quantity: 1,
          }),
        })
          .then((res) => res.json())
          .then((updatedOrder) => {
            console.log("Product added to order:", updatedOrder);
            alert(`${product.title} lades till i din beställning!`);
          })
          .catch((error) =>
            console.error("Fel vid tillägg av produkt:", error)
          );
      });

      productInfoLowerRow.appendChild(price);
      productInfoLowerRow.appendChild(button);

      productSection.appendChild(productInfoUpperRow);
      productSection.appendChild(productInfoLowerRow);

      productList.appendChild(productSection);
    });
  })
  .catch((error) => console.log("Problem att hitta produkt", error));

// ✅ Create an order if not already stored
async function createOrderIfNotExists() {
  console.log("Checking if order exists..."); // Add this log
  if (!orderId) {
    console.log("No orderId found, creating a new order..."); // Add this log

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      alert("Användare saknas. Logga in eller registrera dig först.");
      return;
    }
  }
}
