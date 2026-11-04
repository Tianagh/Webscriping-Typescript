import type { CartItem, Customer, Order } from "./types.js";


// 4. Retrieve saved cart data
let cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
);

// 5. Check whether the cart is empty
if (cartItems.length === 0) {
    alert("Your shopping cart is empty. Please add products before checkout.");
    window.location.href = "cart.html";
}

// 6. Find HTML elements
const checkoutItems = document.querySelector<HTMLDivElement>(
    "#checkout-items"
);

const checkoutTotal = document.querySelector<HTMLElement>(
    "#checkout-total"
);

// 7. Display the order summary
function displayOrderSummary(): void {

    if (!checkoutItems || !checkoutTotal) {
        console.error("Checkout elements could not be found.");
        return;
    }

    checkoutItems.innerHTML = "";

    let totalPrice = 0;

    if (cartItems.length === 0) {
        checkoutItems.textContent = "Your shopping cart is empty.";
        checkoutTotal.textContent = "GH₵0.00";
        return;
    }

    cartItems.forEach(function (item) {

        const productElement = document.createElement("div");
        productElement.classList.add("checkout-product");

        const productDetails = document.createElement("div");

        const productName = document.createElement("h4");
        productName.textContent = item.name;

        const productQuantity = document.createElement("p");
        productQuantity.textContent = "Quantity: " + item.quantity;

        const productPrice = document.createElement("p");
        productPrice.textContent =
            "GH₵" + (item.price * item.quantity).toFixed(2);

        productDetails.append(productName, productQuantity);
        productElement.append(productDetails, productPrice);

        checkoutItems.appendChild(productElement);

        totalPrice += item.price * item.quantity;
    });

    checkoutTotal.textContent = "GH₵" + totalPrice.toFixed(2);
}

// 8. Display the order summary
displayOrderSummary();

// 9. Find the checkout form
const checkoutForm = document.querySelector<HTMLFormElement>(
    "#checkout-form"
);

// 10. Handle form submission
if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Collect customer information
        const customerName = document.querySelector<HTMLInputElement>(
            "#customer-name"
        )?.value.trim() || "";

        const customerPhone = document.querySelector<HTMLInputElement>(
            "#customer-phone"
        )?.value.trim() || "";

        const customerEmail = document.querySelector<HTMLInputElement>(
            "#customer-email"
        )?.value.trim() || "";

        const deliveryAddress = document.querySelector<HTMLTextAreaElement>(
            "#delivery-address"
        )?.value.trim() || "";

        // Validate required information
        if (!customerName || !customerPhone || !deliveryAddress) {
            alert("Please complete all required fields.");
            return;
        }

        // Prepare the customer
        const customer: Customer = {
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            address: deliveryAddress
        };

        // Prepare the order
        const order: Order = {
            reference: "TI-" + Date.now(),
            customer: customer,
            products: cartItems,

            total: cartItems.reduce(function (sum, item) {
                return sum + (item.price * item.quantity);
            }, 0),

            orderDate: new Date().toLocaleString()
        };

        // Save the order
        localStorage.setItem(
            "confirmedOrder",
            JSON.stringify(order)
        );

        // Clear the shopping cart
        localStorage.removeItem("cart");

        console.log("Customer Order:", order);

        // Redirect to confirmation page
        window.location.href = "confirmation.html";
    });
}
