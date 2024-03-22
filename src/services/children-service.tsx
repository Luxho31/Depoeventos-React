import { generalRoutes } from "../utils/routes/general.routes";

import * as jose from 'jose';

const BASE_URL = generalRoutes.BASE_URL;

type ChildrenType = {
  name?: string;
};

export const createChildren = async (form: ChildrenType) => {
  try {
    const token = localStorage.getItem("token");
    const claims = jose.decodeJwt(token!);
    const userId = claims.userId;
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
    const token = localStorage.getItem("token");
    const claims = jose.decodeJwt(token!);
    const userId = claims.userId;
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
    const claims = jose.decodeJwt(token!);
    const userId = claims.userId;
    const response = await fetch(`${BASE_URL}/api/children/${userId}`, {
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
