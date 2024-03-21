import { generalRoutes } from "../utils/routes/general.routes";
import { getUserInfo } from "./basic-service";

const BASE_URL = generalRoutes.BASE_URL;

export const getAllRegistration = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/inscription`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllCourseRegistration = async () => {
    try {
        const token = localStorage.getItem("token");
        const user = await getUserInfo(token);
        const response = await fetch(`${BASE_URL}/api/inscription/${user.id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
