import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

// Crear un nuevo video
export const createVideo = async (body: any) => {
  try {
    await fetch(`${BASE_URL}/api/video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error al enviar el video:", error);
    throw error;
  }
};

// Obtener todos los videos
export const getAllVideos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/video`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error al cargar los videos:", error);
    throw error;
  }
};

// Actualizar el estado de un video (alternar `isShowed`)
export const toggleVideoStatus = async (id: number) => {
  try {
    await fetch(`${BASE_URL}/api/video/update?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error al actualizar el estado del video:", error);
    throw error;
  }
};

// Obtener todos los videos aprobados (isShowed = true)
export const getAllApprovedVideos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/video/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error al cargar los videos aprobados:", error);
    throw error;
  }
};
