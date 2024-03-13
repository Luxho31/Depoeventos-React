import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

type ChildrenType = {
  name?: string;
};

export const createChildren = async (form: ChildrenType) => {
  try {
    const token = localStorage.getItem("token");
    const user = await getUserInfo(token);
    await fetch(`${BASE_URL}/api/children/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.error("Error al crear un hijo:", error);
    throw error;
  }
};

export const getUserInfo = async (token: any) => {
  try {
    const response = await fetch(`${BASE_URL}/api/userInfo/${token}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data.id);
    return data;
  } catch (error) {
    console.error("Error al obtener datos de usuarios:", error);
    throw error;
  }
};
