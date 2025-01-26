import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const createComplaintsBook = async (body: any) => {
    try {
        await fetch(`${BASE_URL}/api/complaints-book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    } catch (error) {
        console.error("Error al crear libro de reclamaciones:", error);
        throw error;
    }
};

export const getAllComplaintsBooks = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/complaints-book`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error al obtener libros de reclamaciones:", error);
        throw error;
    }
};

export const getComplaintsBookById = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/api/complaints-book/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        console.error(`Error al obtener libro de reclamaciones con ID ${id}:`, error);
        throw error;
    }
};

export const updateComplaintsBookStatus = async (id: number, status: string) => {
    try {
        await fetch(`${BASE_URL}/api/complaints-book/status/${id}/${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error al actualizar el estado del libro de reclamaciones con ID ${id}:`, error);
        throw error;
    }
};
