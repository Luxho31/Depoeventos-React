import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error al obtener datos de usuarios:", error);
    throw error;
  }
};
