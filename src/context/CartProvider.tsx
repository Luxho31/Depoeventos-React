import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from '../services/basic-service';
import { useAuth } from './AuthProvider';

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
    const { getUserId } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const token = localStorage.getItem("token");

    const addToCart = async (product: Product) => {
        try {
            const productId = product.id;
            if (!token) {
                throw new Error('No se ha encontrado un token de autenticación');
            }

            await saveItem(productId);

            setProducts(prevProducts => [...prevProducts, product]);
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
    };

    const getTotalPrice = () => {
        return products.reduce((total, product) => {
            return typeof product.price === 'number' ? total + product.price : total;
        }, 0);
    }

    const saveItem = async (productId: number) => {
        try {
            const user = await getUserId(token!);
            const body = {
                productId: productId,
                userId: user,
            };

            const response = await fetch('http://localhost:8080/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el producto en el carrito');
            }
        } catch (error) {
            throw new Error('Error al guardar el producto en el carrito');
        }
    };

    return (
        <CartContext.Provider value={{ products, addToCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
