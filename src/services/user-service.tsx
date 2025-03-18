import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const getAllUsers = async (page: number, searchTerm?: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/users?page=${page}&size=10&sort=id&desc${
        searchTerm ? `&searchTerm=${searchTerm}` : ""
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de usuarios:", error);
    throw error;
  }
};

export const getAllTeacher = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de usuarios:", error);
    throw error;
  }
};
export const updateRole = async (id: number, role: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/role/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([role]),
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error al actualizar el rol del usuario:", error);
    throw error;
  }
};

