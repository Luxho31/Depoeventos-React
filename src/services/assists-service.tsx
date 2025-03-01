import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const getAssists = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/assists/${token}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de asistencias:", error);
    throw error;
  }
};

export const createAssist = async (token: string, assist: any) => {
    try {
        const response = await fetch
        (`${BASE_URL}/api/assists/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(assist),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear asistencia:", error);
        throw error;
    }
}

export const updateAssist = async (token: string, assist: any) => {
    try {
        const response = await fetch
        (`${BASE_URL}/api/assists/${token}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(assist),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar asistencia:", error);
        throw error;
    }
}

export const deleteAssist = async (token: string, assistId: string) => {
    try {
        const response = await fetch
        (`${BASE_URL}/api/assists/${token}/${assistId}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar asistencia:", error);
        throw error;
    }
}

