import { generalRoutes } from "../utils/routes/general.routes";

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
        const userId = localStorage.getItem("userId");
        const response = await fetch(`${BASE_URL}/api/inscription/${userId}`, {
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
