type Product={
    id: number;
    actualId: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    rating: number;
    reviews: string[];
    stock: number;
    isFeatured: boolean;
}

type Cart ={
    items: Product[];
    totalPrice: number;
    totalItems: number;
}

type User = {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
}

type Order = {
    id: string;
    userId: string;
    items: Product[];
    totalPrice: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}


type Review = {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export type { Review, Order, User, Cart, Product };