
// Retrieve saved cart data from localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Check whether the shopping cart is empty
if (cartItems.length === 0) {
    alert("Your shopping cart is empty. Please add products before checkout.");

    window.location.href = "cart.html";
}

// Find the HTML elements
const checkoutItems = document.querySelector("#checkout-items");
const checkoutTotal = document.querySelector("#checkout-total");

// Display the order summary
function displayOrderSummary() {

    checkoutItems.innerHTML = "";

    let totalPrice = 0;

    // Check if the cart is empty
    if (cartItems.length === 0) {
        checkoutItems.textContent = "Your shopping cart is empty.";
        checkoutTotal.textContent = "GH₵0.00";
        return;
    }

    // Display each product
    cartItems.forEach(function (item) {

        const productElement = document.createElement("div");
        productElement.classList.add("checkout-product");

        const productDetails = document.createElement("div");

        const productName = document.createElement("h4");
        productName.textContent = item.name;

        const productQuantity = document.createElement("p");
        productQuantity.textContent = "Quantity: " + item.quantity;

        const productPrice = document.createElement("p");
        productPrice.textContent = "GH₵" + (item.price * item.quantity).toFixed(2);

        productDetails.append(productName, productQuantity);
        productElement.append(productDetails, productPrice);

        checkoutItems.appendChild(productElement);

        totalPrice += item.price * item.quantity;

    });

    // Display the final total
    checkoutTotal.textContent = "GH₵" + totalPrice.toFixed(2);
}

// Run the function
displayOrderSummary();


// Find the checkout form
const checkoutForm = document.querySelector("#checkout-form");

// Handle form submission
checkoutForm.addEventListener("submit", function (event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Collect customer information
    const customerName = document.querySelector("#customer-name").value.trim();
    const customerPhone = document.querySelector("#customer-phone").value.trim();
    const customerEmail = document.querySelector("#customer-email").value.trim();
    const deliveryAddress = document.querySelector("#delivery-address").value.trim();

    // Check required information
    if (!customerName || !customerPhone || !deliveryAddress) {
        alert("Please complete all required fields.");
        return;
    }

    // Prepare the order
    const order = {
        reference: "TI-" + Date.now(),

        customer: {
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            address: deliveryAddress
        },

        products: cartItems,
        total: cartItems.reduce(function (sum, item) {
            return sum + (item.price * item.quantity);
        }, 0),

        orderDate: new Date().toLocaleString()
    };

    // Save the order for the confirmation page
    localStorage.setItem("confirmedOrder", JSON.stringify(order));

    // Clear the shopping cart
    localStorage.removeItem("cart");

    // Redirect to confirmation page
    window.location.href = "confirmation.html";


    // Display order confirmation
    alert(
        "Thank you, " + order.customer.name +
        "! Your order has been prepared successfully."
    );

    console.log("Customer Order:", order);

});

