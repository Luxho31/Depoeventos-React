import { generalRoutes } from "../../../utils/routes/general.routes.ts"

const BASE_URL = generalRoutes.BASE_URL;

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const userData = await response.json();

        if (userData.token) {
            localStorage.setItem('token', userData.token);
        } else {
            console.error('Token no encontrado en los datos de usuario');
        }

        return userData;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};