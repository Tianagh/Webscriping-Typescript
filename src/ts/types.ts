
export interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

export interface Customer {
    name: string;
    phone: string;
    email: string;
    address: string;
}

export interface Order {
    reference: string;
    customer: Customer;
    products: CartItem[];
    total: number;
    orderDate: string;
}

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    featured: boolean;
    status: "pending" | "approved" | "rejected";
}
