import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

type CampusType = {
  id: number;
};

type CategoryType = {
  id: number;
};

type CourseType = {
  id: number;
};

type productType = {
  name: string;
  description: string;
  price: number;
  startDate: string;
  maxStudents: number;
  campus: CampusType;
  category: CategoryType;
  courses: CourseType[];
};

export const createProduct = async (form: productType) => {
  try {
    await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.error("Error al crear un producto:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    const data = await response.json();

    console.log("Productos obtenidos:", data);

    return data;
  } catch (error) {
    console.error("Error al obtener datos de productos:", error);
    throw error;
  }
};
