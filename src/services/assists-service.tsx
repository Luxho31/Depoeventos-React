import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const createAssist = async (assist: any) => {
  try {
    await fetch(`${BASE_URL}/api/assists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assist),
    });
  } catch (error) {
    console.error("Error al crear asistencia:", error);
    throw error;
  }
};

export const getAssistsByDateAndCourseHandler = async (
  id: string,
  date: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/assists/${id}/${date}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener asistencias por fecha y curso:", error);
    throw error;
  }
};
