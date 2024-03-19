import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";
import { generalRoutes } from "../../utils/routes/general.routes";
import { getUserInfo } from "../basic-service";

const BASE_URL = generalRoutes.BASE_URL;

export const createOrder = async (data: any) => {
    const token = localStorage.getItem("token");
    const user = getUserInfo(token!);

    try {
        let products: any = [];

        // Obtener los productos del carrito
        await fetch(`http://localhost:8080/api/cart/${user}`).then((data: any) => {
            products = data
        });


        // Crear el array de items para la orden
        const items = products.map((product: any) => ({
            product: {
                id: product.id,
            },
            children: {
                id: 1,
            },
        }));

        // Crear la solicitud de creación de la orden
        const createRequest = {
            user: {
                id: user,
            },
            paymentMethod: data.paymentMethod,
            items: items,
        };

        // Enviar la solicitud de creación de la orden
        const orderResponse = await fetch(`${BASE_URL}/api/orders`, {
            method: "POST",
            body: JSON.stringify(createRequest),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!orderResponse.ok) {
            throw new Error("Error al crear una orden");
        }
        const res = await orderResponse.json();
        return res;
    } catch (error) {
        console.error("Error al crear una orden:", error);
        throw error;
    }
};

// export const uploadOrderImage = async (email: string, file: File) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file); // Cambiado 'avatar' por 'file' según el requerimiento
//     const response = await fetch(`${BASE_URL}/api/uploadProfilePicture/${email}`, {
//       method: "POST",
//       body: formData,
//     });
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     } else {
//       throw new Error(data.message || "Error al subir la imagen");
//     }
//   } catch (error) {
//     console.error("Error al subir la imagen:", error);
//     throw error;
//   }
// };
