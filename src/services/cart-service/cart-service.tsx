import { generalRoutes } from "../../utils/routes/general.routes";

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

type Product = {
  id: number;
  photo: string;
  name: string;
  price: number;
  description: string;
  startDate: string;
  maxStudents: number;
  campus: Campus;
  category: Category;
  startDateInscription: string;
  endDateInscription: string;
  courses: Course[];
  children: Children;
};

type Campus = {
  id: number;
  name: string;
  description: string;
}

type Category = {
  id: number;
  name: string;
  description: string;
}

type Course = {
  id: number;
  name: string;
  description: string;
};

type Children = {
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

export const createOrder = async (data: orderType) => {
  try {

    const userId = localStorage.getItem("userId");

    // let products = [];

    // Obtener los productos del carrito
    const response = await fetch(`http://localhost:8080/api/cart/${userId}`);
    if (!response.ok) {
      throw new Error("Error al obtener los productos del carrito");
    }
    const products = await response.json();

    // Crear el array de items para la orden
    const items = products.map((product: Product) => ({
      product: {
        id: product.id,
      },
      children: {
        // id: 1,
        id: product.children.id,
      },
    }));

    // Crear la solicitud de creación de la orden
    const createRequest = {
      user: {
        id: userId,
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
    const orderData = await orderResponse.json();
    // await fetch(`http://localhost:8080/api/cart/${userId}`);
    console.log(orderData);
    return orderData;
    // Crear la preferencia de MercadoPago
    // const preferenceId = await createMercadoPagoPreference(orderData);

    // return { orderId: orderData.id, preferenceId };
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
    return data;
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
      return data;
    }
  } catch (error) {
    console.error("Error al subir la imagen del voucher:", error);
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
