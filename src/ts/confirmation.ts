import type { CartItem, Customer, Order } from "./types.js";


// 4. Retrieve the saved order
const savedOrder = localStorage.getItem("confirmedOrder");

const order: Order | null = savedOrder
    ? JSON.parse(savedOrder) as Order
    : null;

// 5. Find the HTML elements
const orderReference = document.querySelector<HTMLElement>(
    "#order-reference"
);

const confirmedCustomer = document.querySelector<HTMLDivElement>(
    "#confirmed-customer"
);

const confirmedProducts = document.querySelector<HTMLDivElement>(
    "#confirmed-products"
);

const confirmedTotal = document.querySelector<HTMLElement>(
    "#confirmed-total"
);

// 6. Check whether an order exists
if (!order) {
    alert("No order was found.");
    window.location.href = "index.html";

} else if (
    !orderReference ||
    !confirmedCustomer ||
    !confirmedProducts ||
    !confirmedTotal
) {
    console.error("Some confirmation page elements could not be found.");

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
