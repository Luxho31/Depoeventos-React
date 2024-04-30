import { toast } from "sonner";
import { generalRoutes } from "../../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

type orderType = {
  id: number;
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
  product: Product;
};

type Campus = {
  id: number;
  name: string;
  description: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
};

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

export const createOrder = async (value:any) => {
  try {
    const userId = localStorage.getItem("userId");
    console.log(value);

    // let products = [];

    // Obtener los productos del carrito
    const response = await fetch(`${BASE_URL}/api/cart/${userId}`);
    if (!response.ok) {
      throw new Error("Error al obtener los productos del carrito");
    }
    const products = await response.json();

    // Crear el array de items para la orden
    const items = products.map((product: Product) => ({
      product: {
        id: product.product.id,
      },
      children: {
        id: product.children.id,
      },
    }));

    // Crear la solicitud de creación de la orden
    const createRequest = {
      user: {
        id: userId,
      },
      items: items,
      discount: value,
    };

    // Enviar la solicitud de creación de la orden
    const orderResponse = await fetch(`${BASE_URL}/api/orders`, {
      method: "POST",
      body: JSON.stringify(createRequest),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (orderResponse.status === 409) {
      toast.error("Tienes productos en el carrito que ya no tienen cupo");
      return;
    }

    const orderData = await orderResponse.json();

    return orderData;
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


export const getOrderById = async (orderId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/${orderId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de ordenes:", error);
  }
};

export const getPaymentInfo = async (paymentId?: number) => {
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer APP_USR-2950921415816545-041000-cdbbeac3aa53eccdfadbe2a50f88e8db-1195435341`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// export const updateOrder = async (form: orderType, orderId?: number) => {
//   try {
//     await fetch(`${BASE_URL}/api/orders/${orderId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });
//     getAllOrders();
//   } catch (error) {
//     console.error(error);
//   }
// };
