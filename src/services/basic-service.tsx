import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const getUserInfo = async (token: any) => {
  try {
    const response = await fetch(`${BASE_URL}/api/userInfo/${token}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de usuarios:", error);
    throw error;
  }
};
