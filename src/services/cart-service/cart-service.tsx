import { generalRoutes } from "../../utils/routes/general.routes";
import { getUserInfo } from "../basic-service";

const BASE_URL = generalRoutes.BASE_URL;

export const createOrder = async (data: any) => {
    const token = localStorage.getItem("token");

    try {
        const user = await getUserInfo(token!); // Esperar a que se resuelva la promesa

        let products: any = [];

        // Obtener los productos del carrito
        const response = await fetch(`http://localhost:8080/api/cart/${user.id}`);
        if (!response.ok) {
            throw new Error("Error al obtener los productos del carrito");
        }
        products = await response.json();

        // Crear el array de items para la orden
        const items = products.map((product: any) => ({
            product: {
                id: product.product.id,
            },
            children: {
                id: 1,
            },
        }));

        // Crear la solicitud de creación de la orden
        const createRequest = {
            user: {
                id: user.id,
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
        await fetch(`http://localhost:8080/api/cart/${user.id}`);
        return res;
    } catch (error) {
        console.error("Error al crear una orden:", error);
        throw error;
    }
};
