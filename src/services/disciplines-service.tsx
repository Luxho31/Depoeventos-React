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
    console.error("Error al crear un hijo:", error);
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

    console.log("Disciplinas obtenidas:", data);

    const dataWithKeys = data.map((item: any, index: any) => ({
      ...item,
      key: index,
    }));

    return dataWithKeys;
  } catch (error) {
    console.error("Error al obtener datos de usuarios:", error);
    throw error;
  }
};
