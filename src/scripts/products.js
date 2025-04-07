let orderId = localStorage.getItem("orderId"); // ✅ Load orderId at the top

// ✅ Track added product IDs from localStorage
const addedProducts = new Set(
  JSON.parse(localStorage.getItem("addedProducts")) || []
);

// Function to update the button state in localStorage
function updateButtonState(productId, isAdded) {
  if (isAdded) {
    addedProducts.add(productId);
  } else {
    addedProducts.delete(productId);
  }
  localStorage.setItem("addedProducts", JSON.stringify([...addedProducts]));
}

// Fetch products and update UI
fetch("https://airbean-backend-k7pq.onrender.com/api/products")
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

      const toggleButton = document.createElement("button");
      toggleButton.type = "button";
      toggleButton.classList.add("product-info-order-button");

      // Set button text and style based on localStorage data
      if (addedProducts.has(product.id)) {
        toggleButton.textContent = "Ta bort";
        toggleButton.classList.add("remove-btn");
      } else {
        toggleButton.textContent = "Lägg till";
        toggleButton.classList.add("add-btn");
      }

      toggleButton.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await createOrderIfNotExists();

        const isAdded = addedProducts.has(product.id);

        if (!isAdded) {
          // ➕ Lägg till produkt
          try {
            const res = await fetch(
              `https://airbean-backend-k7pq.onrender.com/api/order/${orderId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  product_id: product.id,
                  quantity: 1,
                }),
              }
            );

            if (!res.ok) throw new Error("Fel vid tillägg");

            const updatedOrder = await res.json();
            console.log("Produkt tillagd:", updatedOrder);

            // Update localStorage
            updateButtonState(product.id, true);
            toggleButton.textContent = "Ta bort";
            toggleButton.classList.add("remove-btn");
            toggleButton.classList.remove("add-btn");
          } catch (error) {
            console.error("Fel vid tillägg av produkt:", error);
          }
        } else {
          // ❌ Ta bort produkt
          try {
            const res = await fetch(
              `https://airbean-backend-k7pq.onrender.com/api/order/${orderId}/product/${product.id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!res.ok) throw new Error("Fel vid borttagning");

            const updatedOrder = await res.json();
            console.log("Produkt borttagen:", updatedOrder);

            // Update localStorage
            updateButtonState(product.id, false);
            toggleButton.textContent = "Lägg till";
            toggleButton.classList.add("add-btn");
            toggleButton.classList.remove("remove-btn");
          } catch (error) {
            console.error("Fel vid borttagning av produkt:", error);
          }
        }
      });

      productInfoLowerRow.appendChild(price);
      productInfoLowerRow.appendChild(toggleButton);

      productSection.appendChild(productInfoUpperRow);
      productSection.appendChild(productInfoLowerRow);

      productList.appendChild(productSection);
    });
  })
  .catch((error) => console.log("Problem att hitta produkt", error));

// ✅ Create an order if not already stored
async function createOrderIfNotExists() {
  console.log("Checking if order exists...");
  if (!orderId) {
    console.log("No orderId found, creating a new order...");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      alert("Användare saknas. Logga in eller registrera dig först.");
      return;
    }

    // Create a new order and reset the added products state in localStorage
    const newOrderResponse = await fetch(
      "https://airbean-backend-k7pq.onrender.com/api/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      }
    );

    if (!newOrderResponse.ok) {
      alert("Något gick fel vid skapandet av beställning.");
      return;
    }

    const newOrder = await newOrderResponse.json();
    orderId = newOrder.id;
    localStorage.setItem("orderId", orderId);

    // Reset the added products state when a new order is created
    localStorage.removeItem("addedProducts");

    // Re-initialize the addedProducts set to an empty set
    addedProducts.clear();
  }
}
window.addEventListener("load", function () {
  // Call the function to refresh the button states on the products page
  refreshButtonStates();
});

// Function to manually refresh button states based on `addedProducts`
function refreshButtonStates() {
  const addedProducts = new Set(
    JSON.parse(localStorage.getItem("addedProducts")) || []
  );
  const productList = document.getElementById("product-list-container");

  if (!productList) return;

  const buttons = productList.querySelectorAll("button");
  buttons.forEach((button) => {
    const productId = button.closest(".product-item-container").dataset
      .productId;
    if (addedProducts.has(Number(productId))) {
      button.textContent = "Ta bort";
      button.classList.add("remove-btn");
      button.classList.remove("add-btn");
    } else {
      button.textContent = "Lägg till";
      button.classList.add("add-btn");
      button.classList.remove("remove-btn");
    }
  });
}
