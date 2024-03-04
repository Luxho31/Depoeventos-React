import { generalRoutes } from "../../../utils/routes/general.routes.ts"

const BASE_URL = generalRoutes.BASE_URL;

type User = {
    firstName?: String,
    lastName?: String,
    motherLastName?: String,
    documentType?: String,
    documentNumber?: String,
    contactNumber?: String,
    emergencyContactNumber?: String,
    address?: String,
    birthDate?: String,
    country?: String,
    username?: String,
    password?: String
}

export const registerUser = async (user: User) => {
    try {
        const response = await fetch(`${BASE_URL}/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Error al registrarse');
        }

        const userData = await response.json();

        if (userData.token) {
            localStorage.setItem('token', userData.token);
        } else {
            console.error('Token no encontrado en los datos de usuario');
        }

        return userData;
    } catch (error) {
        console.error('Error al registrarse:', error);
        throw error;
    }
};