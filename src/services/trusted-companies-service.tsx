import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const createTrustedCompany = async (body: any) => {
  try {
    await fetch(`${BASE_URL}/api/trusted-companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error al crear empresa de confianza:", error);
    throw error;
  }
};

export const getAllTrustedCompanies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/trusted-companies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error al obtener empresa de confianza:", error);
    throw error;
  }
};

// Actualizar el estado de un video (alternar `isShowed`)
export const toggleCompanyStatus = async (id: number) => {
  try {
    await fetch(`${BASE_URL}/api/trusted-companies/update?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error al actualizar empresa de confianza:", error);
    throw error;
  }
};

export const getAllApprovedTrustedCompanies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/trusted-companies/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error al cargar empresas de confianza:", error);
    throw error;
  }
};
