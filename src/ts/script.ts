
import type { CartItem, Product } from "./types.js";
import { getProducts } from "./products.js";

// 1. Find the product and cart elements
const productGrid = document.querySelector<HTMLDivElement>(
    "#product-grid"
);

const cartCount = document.querySelector<HTMLElement>(
    "#cart-count"
);

// 2. Retrieve existing cart data
let cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
);

// 3. Update the cart quantity
function updateCartCount(): void {
    const totalQuantity = cartItems.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    if (cartCount) {
        cartCount.textContent = totalQuantity.toString();
    }
}

// 4. Add a product to the shopping cart
function addToCart(product: Product): void {
    const existingProduct = cartItems.find(function (item) {
        return item.name === product.name;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartItems.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    updateCartCount();

    alert(product.name + " added to your cart!");
}

// 5. Display products on the homepage
function displayProducts(products: Product[]): void {
    if (!productGrid) {
        console.error("Product grid could not be found.");
        return;
    }

    productGrid.innerHTML = "";

    products.forEach(function (product) {
        const productCard = document.createElement("article");
        productCard.classList.add("product-card");

        const productImage = document.createElement("div");
        productImage.classList.add("product-image");

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        const category = document.createElement("p");
        category.classList.add("product-category");
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.classList.add("product-price");
        price.textContent = "GH₵" + product.price.toFixed(2);

        const addButton = document.createElement("button");
        addButton.classList.add("add-to-cart");
        addButton.textContent = "ADD TO CART";

        addButton.addEventListener("click", function () {
            addToCart(product);
        });

        productImage.appendChild(image);

        productInfo.append(
            category,
            name,
            price,
            addButton
        );

        productCard.append(
            productImage,
            productInfo
        );

        productGrid.appendChild(productCard);
    });
}

// 6. Load products when the homepage opens
async function initializeStore(): Promise<void> {
    const products = await getProducts();

    displayProducts(
        products.filter(function (product) {
            return product.featured;
        })
    );

    updateCartCount();
}

initializeStore();
