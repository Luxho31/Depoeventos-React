import { generalRoutes } from "../../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const forgotPassword = async (token: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forgot-password/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: `${password}`,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    throw error;
  }
};
