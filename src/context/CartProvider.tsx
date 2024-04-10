import { createContext, useContext, useEffect, useState } from "react";
import { generalRoutes } from "../utils/routes/general.routes.ts";

const BASE_URL = generalRoutes.BASE_URL;

type Product = {
  children: ChildrenData;
  id: number;
  name: string;
  price: number;
  description: string;
  startDate: string;
  maxStudents: number;
  photo: string;
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

type ChildrenData = {
  id: number;
  name: string;
  lastName: string;
  motherLastName: string;
  birthdate: string;
  documentType: string;
  documentNumber: string;
  emergencyContactPhone: string;
  gender: string;
  isStudent: boolean;
  school: string;
  grade: string;
  section: string;
  isClubMember: boolean;
  club: string;
  membershipCardNumber: string;
  memberName: string;
  memberLastName: string;
  memberMotherLastName: string;
};

type Course = {
  id: number;
  name: string;
  description: string;
};

type CartData = {
  id: number;
  product: {
    photo: string;
    name: string;
    price: number;
    description: string;
  };
  children: ChildrenData;
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

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error;
        }
        const response = await fetch(`${BASE_URL}/api/cart/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los productos del carrito");
        }
        const data = await response.json();
        const mappedProducts: Product[] = data.map((item: CartData) => ({
          id: item.id,
          name: item.product.name,
          price: item.product.price,
          photo: item.product.photo,
          description: item.product.description,
          children: item.children,
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
      }
    };

    fetchData();
  }, [token, userId]);

  // Función para agregar un producto al carrito
  const addToCart = async (product: Product, childrenIds: number[]) => {
    try {
      if (!token) {
        throw new Error("No se ha iniciado sesión");
      }
      for (const childId of childrenIds) {
        const body = {
          productId: product.id,
          userId: userId,
          childrenId: childId,
        };
        const response = await fetch(`${BASE_URL}/api/cart`, {
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

      updateCart();
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  const updateCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/cart/${userId}`);
      if (!response.ok) {
        throw new Error("Error al obtener los productos del carrito");
      }
      const data = await response.json();
      const mappedProducts: Product[] = data.map((item: CartData) => ({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        photo: item.product.photo,
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
      const response = await fetch(
        `${BASE_URL}/cart/deleteAll/${userId}`,
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
        `${BASE_URL}/cart/${cartItem}`,
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
