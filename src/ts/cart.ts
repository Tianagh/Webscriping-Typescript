import type { CartItem } from "./types.js";

// 2. Retrieve saved cart data
let cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
);

// 3. Find HTML elements
const cartItemsContainer = document.querySelector<HTMLDivElement>(
    "#cart-items"
);

const cartTotal = document.querySelector<HTMLElement>(
    "#cart-total"
);

const cartCount = document.querySelector<HTMLElement>(
    "#cart-count"
);

// 4. Display the shopping cart
function displayCart(): void {

    if (!cartItemsContainer || !cartTotal || !cartCount) {
        console.error("Some cart HTML elements could not be found.");
        return;
    }

    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;
    let totalQuantity = 0;

    // Check whether the cart is empty
    if (cartItems.length === 0) {
        cartItemsContainer.textContent = "Your cart is currently empty.";
        cartTotal.textContent = "GH₵0.00";
        cartCount.textContent = "0";
        return;
    }

    // Display each product
    cartItems.forEach(function (item) {

        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity;

        const productElement = document.createElement("div");
        productElement.classList.add("cart-item");

        const details = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "GH₵" + item.price.toFixed(2);

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        // Increase quantity
        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";

        increaseButton.addEventListener("click", function () {
            item.quantity++;

            localStorage.setItem("cart", JSON.stringify(cartItems));

            displayCart();
        });

        // Decrease quantity
        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";

        decreaseButton.addEventListener("click", function () {
            if (item.quantity > 1) {
                item.quantity--;

                localStorage.setItem("cart", JSON.stringify(cartItems));

                displayCart();
            }
        });

        // Remove product
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            cartItems = cartItems.filter(function (cartItem) {
                return cartItem.name !== item.name;
            });

            localStorage.setItem("cart", JSON.stringify(cartItems));

            displayCart();
        });

        details.append(
            name,
            price,
            quantity,
            decreaseButton,
            increaseButton,
            removeButton
        );

        productElement.appendChild(details);
        cartItemsContainer.appendChild(productElement);
    });

    // Update total price
    cartTotal.textContent = "GH₵" + totalPrice.toFixed(2);

    // Update navbar cart quantity
    cartCount.textContent = totalQuantity.toString();
}

// 5. Run when the cart page loads
displayCart();
