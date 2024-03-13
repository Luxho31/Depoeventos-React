import { generalRoutes } from "../utils/routes/general.routes";
import { getUserInfo } from "./basic-service";

const BASE_URL = generalRoutes.BASE_URL;

type ChildrenType = {
  name?: string;
};

export const updateUser = async (form: ChildrenType) => {
  try {
    const token = localStorage.getItem("token");
    const user = await getUserInfo(token);
    await fetch(`${BASE_URL}/api/userInfo/${user.id}`, {
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
