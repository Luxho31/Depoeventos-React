import * as jose from 'jose';
import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

interface UserInfoProps {
  firstName: string,
  lastName: string,
  motherLastName: string,
  documentType: string,
  documentNumber: string,
  contactNumber: string,
  emergencyContactNumber: string,
  address: string,
  birthDate: string,
  country: string,
}

export const updateUserInfo = async (data: UserInfoProps, id: number) => {
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
    const userData = jose.decodeJwt(token!);
    const user = userData.sub;

    const formData = new FormData();
    formData.append("file", file, file.name);
    const response = await fetch(
      `${BASE_URL}/api/uploadProfilePicture/${user}`,
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


