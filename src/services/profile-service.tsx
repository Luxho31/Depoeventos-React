import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const updateUserInfo = async (data: any, id: any) => {
  try {
    const response = await fetch(`${BASE_URL}/updateUser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error al actualizar datos de usuario:", error);
    throw error;
  }
};
