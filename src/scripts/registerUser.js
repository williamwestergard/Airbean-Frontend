const form = document.getElementById("register-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Ensure the page doesn't reload

  const formData = new FormData(form);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const address = formData.get("address").trim();

  // Basic validation
  if (!name || !email || !address) {
    alert("Vänligen fyll i alla fält.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Vänligen ange en giltig e-postadress.");
    return;
  }

  const data = { name, email, address };

  // Submit to backend
  fetch("https://airbean-backend-k7pq.onrender.com/api/user/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((user) => {
      if (user) {
        console.log("User created:", user);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Create the order after user creation
        createOrder(user.id); // Ensure user id is passed for order creation
      } else {
        alert("Något gick fel vid skapandet av användaren.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ett fel uppstod. Försök igen senare.");
    });
});

// Create order after user registration
// Create order after user registration
// Create order after user registration
function createOrder(userId) {
  const data = { user_id: userId, items: [] }; // Empty array for items initially

  console.log("Creating order with data:", data);

  fetch("https://airbean-backend-k7pq.onrender.com/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((order) => {
      if (order && order.orderId) {
        console.log("Order created:", order);
        // ✅ Save orderId to localStorage after successful order creation
        localStorage.setItem("orderId", order.orderId);
        console.log("Order ID saved in localStorage:", order.orderId);

        // Clear the addedProducts in localStorage
        localStorage.removeItem("addedProducts");

        // ✅ Redirect to products page after successful order creation
        window.location.href = "../pages/products.html";
      } else {
        alert("Något gick fel vid skapandet av beställningen.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ett fel uppstod. Försök igen senare.");
    });
}
