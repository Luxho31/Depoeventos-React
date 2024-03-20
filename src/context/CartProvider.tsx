import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

type Product = {
  children: any;
  id: number;
  name: string;
  price: number;
  description: string;
  startDate: string;
  maxStudents: number;
  campus: {
    id: number;
    name: string;
    description: string;
  };
  category: {
    id: number;
    name: string;
    description: string;
  };
  startDateInscription: string;
  endDateInscription: string;
  courses: Course[];
};

type Course = {
  id: number;
  name: string;
  description: string;
};

type CartContextType = {
  products: Product[];
  addToCart: (product: Product, children: number[]) => Promise<void>;
  getTotalPrice: () => number;
  clearCart: () => void;
  removeProduct: (cartItem: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un proveedor CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: any) => {
  const { getUserId } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error("No se ha encontrado un token de autenticación");
        }
        const user = await getUserId(token!);
        const response = await fetch(`http://localhost:8080/api/cart/${user}`);
        if (!response.ok) {
          throw new Error("Error al obtener los productos del carrito");
        }
        const data = await response.json();
        const mappedProducts: Product[] = data.map((item: any) => ({
          id: item.id,
          name: item.product.name,
          price: item.product.price,
          description: item.product.description,
          children: item.children,
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
      }
    };

    fetchData();
  }, [token, getUserId]);

  // Función para agregar un producto al carrito
  const addToCart = async (product: Product, childrenIds: number[]) => {
    try {
      const userId = await getUserId(token!);
      // Iterar sobre cada hijo seleccionado y realizar una solicitud HTTP individual
      for (const childId of childrenIds) {
        const body = {
          productId: product.id,
          userId: userId,
          childrenId: childId,
        };
        const response = await fetch("http://localhost:8080/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error("Error al guardar el producto en el carrito");
        }
      }
      // Actualizar el estado de productos combinando los productos existentes con el nuevo producto
      // setProducts((prevProducts) => [...prevProducts, product]);
      updateCart();
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  const updateCart = async () => {
    try {
      const user = await getUserId(token!);
      const response = await fetch(`http://localhost:8080/api/cart/${user}`);
      if (!response.ok) {
        throw new Error("Error al obtener los productos del carrito");
      }
      const data = await response.json();
      const mappedProducts: Product[] = data.map((item: any) => ({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        description: item.product.description,
        children: item.children,
      }));
      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  };

  const clearCart = async () => {
    try {
      const user = await getUserId(token!);
      const response = await fetch(
        `http://localhost:8080/api/cart/deleteAll/${user}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al limpiar el carrito");
      }

      setProducts([]);
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
    }
  };

  const removeProduct = async (cartItem: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/${cartItem}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el producto del carrito");
      }

      updateCart();
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  // Función para obtener el precio total del carrito
  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      return typeof product.price === "number" ? total + product.price : total;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        getTotalPrice,
        clearCart,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
