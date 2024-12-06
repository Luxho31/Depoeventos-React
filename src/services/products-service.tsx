import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

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

export const getAllActiveProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/active`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener datos de productos activos:", error);
    throw error;
  }
};

export const getAllActiveProductsByCampus = async (campusId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/active/${campusId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener datos de productos activos:", error);
    throw error;
  }
};

export const updateProduct = async (form: any, id?: number) => {
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
    formData.append("file", file, file.name);
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

export const cloneProduct = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/clone/${id}`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al clonar un producto:", error);
    throw error;
  }
};

export const updateProductsDateRange = async (form: any) => {
  try {
    await fetch(`${BASE_URL}/api/products/updateTime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.error(
      "Error al actualizar un rango de fechas de productos:",
      error
    );
    throw error;
  }
};
