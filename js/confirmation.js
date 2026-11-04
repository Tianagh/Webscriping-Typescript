
// Retrieve the saved order
const order = JSON.parse(localStorage.getItem("confirmedOrder"));

// Find the HTML elements
const orderReference = document.querySelector("#order-reference");
const confirmedCustomer = document.querySelector("#confirmed-customer");
const confirmedProducts = document.querySelector("#confirmed-products");
const confirmedTotal = document.querySelector("#confirmed-total");

// Check whether an order exists
if (!order) {
    alert("No order was found.");
    window.location.href = "index.html";

} else {

    // Display order reference
    orderReference.textContent = order.reference;

    // Display customer information
    confirmedCustomer.innerHTML = `
        <h3>Customer Information</h3>
        <p>Name: ${order.customer.name}</p>
        <p>Phone: ${order.customer.phone}</p>
        <p>Email: ${order.customer.email || "Not provided"}</p>
        <p>Delivery Address: ${order.customer.address}</p>
    `;

    // Display purchased products
    order.products.forEach(function (item) {

        const productElement = document.createElement("div");
        productElement.classList.add("confirmed-product");

        const productName = document.createElement("p");
        productName.textContent = item.name + " x " + item.quantity;

        const productPrice = document.createElement("p");
        productPrice.textContent =
            "GH₵" + (item.price * item.quantity).toFixed(2);

        productElement.append(productName, productPrice);
        confirmedProducts.appendChild(productElement);

    });

    // Display total amount
    confirmedTotal.textContent = "GH₵" + order.total.toFixed(2);
}
