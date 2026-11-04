// Get the Add to Cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Get the cart count
const cartCount = document.querySelector("#cart-count");

// Get existing cart data from localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Update the cart quantity displayed in the navbar
function updateCartCount() {

    const totalQuantity = cartItems.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }
}

// Handle Add to Cart clicks
addToCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Find the selected product card
        const productCard = button.closest(".product-card");

        // Get product details
        const productName = productCard.querySelector("h3").textContent.trim();

        const priceText = productCard.querySelector(".product-price").textContent;

        const productPrice = Number(priceText.replace(/[^\d.]/g, ""));

        // Check whether the product is already in the cart
        const existingProduct = cartItems.find(function (item) {
            return item.name === productName;
        });

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cartItems.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }

        // Save cart data in the browser
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Update the cart quantity
        updateCartCount();

        alert(productName + " added to your cart!");

    });

});

// Display the existing cart quantity when the page loads
updateCartCount();