import { generalRoutes } from "../../utils/routes/general.routes";
import { getUserInfo } from "../basic-service";

const BASE_URL = generalRoutes.BASE_URL;

type orderType = {
  id: number;
  paymentMethod: string;
  bankName: string;
  operationNumber: string;
  date: string;
  totalPrice: number;
  status: string;
};

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
      bankName: data.bankName,
      operationNumber: data.operationNumber,
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

export const getAllOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();

    const dataWithKeys = data.map((item: any, index: any) => ({
      ...item,
      key: index,
    }));

    return dataWithKeys;
  } catch (error) {
    console.error("Error al obtener datos de ordenes:", error);
    throw error;
  }
};

export const uploadVoucherImage = async (orderId: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      `${BASE_URL}/api/orders/uploadVoucherPicture/${orderId}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data; // Retorna los datos recibidos del servidor si la carga es exitosa
    }
    // else {
    //     throw new Error(data.message || "Error al subir la imagen del voucher");
    // }
  } catch (error) {
    console.error("Error al subir la imagen del voucher:", error);
    // throw error;
  }
};

export const getOrderById = async (orderId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/${orderId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de ordenes:", error);
  }
};

export const updateOrder = async (form: orderType, orderId?: number) => {
  try {
    await fetch(`${BASE_URL}/api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    getAllOrders();
  } catch (error) {
    console.error(error);
  }
};
