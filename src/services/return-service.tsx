import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const createReturn = async (body: any, id: any) => {
  try {
    await fetch(`${BASE_URL}/api/inscription/return-inscription/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error al crear la devolución:", error);
    throw error;
  }
};

export const getAllReturns = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/return`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log("")
    throw error;
  }
};
