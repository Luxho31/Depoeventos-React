import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

type contactUsType = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  isAcceptedPrivacyPolicy: boolean;
};
export const sendMessage = async (form: contactUsType) => {
  try {
    await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    throw error;
  }
};
