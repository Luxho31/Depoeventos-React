import { generalRoutes } from "../utils/routes/general.routes";
import { getUserInfo } from "./basic-service";

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

export const updateChildren = async (form: ChildrenType, id?: number) => {
  try {
    await fetch(`${BASE_URL}/api/children/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });
    getChildrensByUserId();
  } catch (error) {
    console.error("Error al actualizar un hijo:", error);
    throw error;
  }
};

export const getChildrensByUserId = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = await getUserInfo(token);
    const response = await fetch(`${BASE_URL}/api/children/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    const dataWithKeys = data.map((item: any, index: any) => ({
      ...item,
      key: index,
    }));
    return dataWithKeys;
  } catch (error) {
    console.error("Error al obtener los hijos:", error);
    throw error;
  }
};

export const getChildrenById = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = await getUserInfo(token);
    const response = await fetch(`${BASE_URL}/api/children/getOnlyChildren/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    const dataWithKeys = data.map((item: any, index: any) => ({
      ...item,
      key: index,
    }));
    return dataWithKeys;
  } catch (error) {
    console.error("Error al obtener los hijos:", error);
    throw error;
  }
}
