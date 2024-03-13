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

    console.log("Categorias obtenidas:", data);

    const dataWithKeys = data.map((item: any, index: any) => ({
      ...item,
      key: index,
    }));

    return dataWithKeys;
  } catch (error) {
    console.error("Error al obtener datos de categorias:", error);
    throw error;
  }
};
