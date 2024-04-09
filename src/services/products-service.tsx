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
  endDate: string;
  maxStudents: number;
  campus: CampusType[];
  category: CategoryType;
  products: CourseType[];
  gender: string;
  ages: string[];
  grades: string[];
};

export const createProduct = async (form: any) => {
  try {
    console.log("Form Service -> ", form);
    const body = {
      ...form,
    };
    const productResponse = await fetch(`${BASE_URL}/api/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const response = await productResponse.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error al crear un producto:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener datos de productos:", error);
    throw error;
  }
};

export const updateProduct = async (form: productType, id?: number) => {
  try {
    await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });
    getAllProducts();
  } catch (error) {
    console.error("Error al actualizar un producto:", error);
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos producto:", error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    getAllProducts();
  } catch (error) {
    console.error("Error al eliminar un producto:", error);
    throw error;
  }
};

export const uploadProductImage = async (productId: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      `${BASE_URL}/api/products/uploadProductPicture/${productId}`,
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
    console.error("Error al subir la imagen del producto:", error);
  }
};
