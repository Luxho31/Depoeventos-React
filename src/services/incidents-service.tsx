import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const getAllIncidents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/incidents/all`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las incidencias:", error);
    throw error;
  }
};

export const getIncidentsByTeacher = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/incidents/by-teacher/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las incidencias del profesor:", error);
    throw error;
  }
};

export const getCoursesByTeacher = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/by-teacher/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los cursos del profesor:", error);
    throw error;
  }
};

export const createIncident = async (incident: any) => {
  try {
    await fetch(`${BASE_URL}/api/incidents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(incident),
    });
  } catch (error) {
    console.error("Error al crear la incidencia:", error);
    throw error;
  }
};
