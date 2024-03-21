import { generalRoutes } from "../utils/routes/general.routes";
import { getUserInfo } from "./basic-service";

const BASE_URL = generalRoutes.BASE_URL;

export const updateUserInfo = async (data: any, id: any) => {
  try {
    const response = await fetch(`${BASE_URL}/updateUser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error al actualizar datos de usuario:", error);
    throw error;
  }
};

export const uploadProfileImage = async (file: File) => {
  try {
    const token = localStorage.getItem("token");
    const user = await getUserInfo(token);
    const formData = new FormData();
    formData.append("file", file); // Cambiado 'avatar' por 'file' según el requerimiento
    const response = await fetch(
      `${BASE_URL}/api/uploadProfilePicture/${user.username}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error al subir la imagen");
    }
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};


