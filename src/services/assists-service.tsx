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
  id: number,
  date: string,
  courseId: number
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/assists/${id}/course/${courseId}/date/${date}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      if (response.status === 400) {
        return null;
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener asistencias por fecha y curso:", error);
    throw error;
  }
};
