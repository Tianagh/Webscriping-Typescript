
import type { Product } from "./types.js";

const STORAGE_KEY = "tianas_inn_products";

// Load products from browser storage
export async function getProducts(): Promise<Product[]> {
    try {
        const savedProducts = localStorage.getItem(STORAGE_KEY);

        if (savedProducts) {
            return JSON.parse(savedProducts) as Product[];
        }

        // Load the original products for the first time
        const response = await fetch("./products.json");

        if (!response.ok) {
            throw new Error("Could not load products.");
        }

        const products: Product[] = await response.json();

        // Save the original products in browser storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

        return products;

    } catch (error) {
        console.error("Error loading products:", error);
        return [];
    }
}


// Save products to browser storage
export function saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
