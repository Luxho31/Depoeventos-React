import { generalRoutes } from "../../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

type ForgotPassword = {
  email: string;
};

export const sendMessage = async (emailData: ForgotPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: emailData.email }),
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
