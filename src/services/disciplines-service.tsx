import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

type disciplineType = {
  name?: string;
  description?: string;
  image?: string;
};
export const createDiscipline = async (form: disciplineType) => {
  try {
    await fetch(`${BASE_URL}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.error("Error al crear una disciplina:", error);
    throw error;
  }
};

export const getAllDisciplines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/courses`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de disciplinas:", error);
    throw error;
  }
};

export const updateDiscipline = async (form: disciplineType, id?: number) => {
  try {
    await fetch(`${BASE_URL}/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.error("Error al actualizar una disciplina:", error);
    throw error;
  }
};

export const getDisciplineById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/courses/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de disciplinas:", error);
    throw error;
  }
};

export const deleteDiscipline = async (id: number) => {
  try {
    await fetch(`${BASE_URL}/api/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {
    console.error("Error al eliminar una disciplina:", error);
    throw error;
  }
};
