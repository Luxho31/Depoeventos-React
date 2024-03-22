import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

type ChildrenType = {
  name?: string;
};


export const createChildren = async (form: ChildrenType) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    await fetch(`${BASE_URL}/api/children/${userId}`, {
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

export const deleteChildren = async (childrenId: number) => {
  try {
    const userId = localStorage.getItem("userId");
    await fetch(`${BASE_URL}/api/children/${childrenId}/${userId}`, {
      method: "DELETE"
    })
  } catch (error) {
    console.log(error);
  }
}

export const getChildrensByUserId = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(`${BASE_URL}/api/children/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los hijos:", error);
    throw error;
  }
};

export const getChildrenById = async (childrenId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/children/getOnlyChildren/${childrenId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los hijos:", error);
    throw error;
  }
}
