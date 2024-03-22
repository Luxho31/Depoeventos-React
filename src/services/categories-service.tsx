import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

type categoryType = {
  name?: string;
  description?: string;
};
export const createCategory = async (form: categoryType) => {
  try {
    await fetch(`${BASE_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.error("Error al crear una categoria:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/categories`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de categorias:", error);
    throw error;
  }
};

export const updateCategory = async (form: categoryType, id?: number) => {
  try {
    await fetch(`${BASE_URL}/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.error("Error al actualizar una categoria:", error);
    throw error;
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/categories/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de categorias:", error);
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    await fetch(`${BASE_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {
    console.error("Error al eliminar una categoria:", error);
    throw error;
  }
};
