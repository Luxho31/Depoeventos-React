import { createContext, useContext, useEffect, useState } from 'react';

type Product = {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    // Otros campos del producto desde el backend
};

type CartContextType = {
    products: Product[];
    addToCart: (product: Product) => void;
    getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un proveedor CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: any) => {
    const [products, setProducts] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setProducts(prevProducts => [...prevProducts, product]);
    };

    const getTotalPrice = () => {
        return products.reduce((acc, product) => acc + product.price, 0);
    }


    return (
        <CartContext.Provider value={{ products, addToCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};