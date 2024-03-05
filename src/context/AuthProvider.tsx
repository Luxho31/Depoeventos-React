// authContext.tsx

import { createContext, useContext, useEffect, useState } from 'react';
import { generalRoutes } from "../utils/routes/general.routes.ts";

const BASE_URL = generalRoutes.BASE_URL;

interface AuthContextType {
	isAuthenticated: boolean;
	login: (username: string, password: string) => Promise<void>;
	register: (user: User) => Promise<void>;
	logout: () => void;
}

interface User {
	firstName?: string;
	lastName?: string;
	motherLastName?: string;
	documentType?: string;
	documentNumber?: string;
	contactNumber?: string;
	emergencyContactNumber?: string;
	address?: string;
	birthDate?: string;
	country?: string;
	username?: string;
	password?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }: any) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsAuthenticated(!!token);
	}, []);

	const login = async (username: string, password: string) => {
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
				setIsAuthenticated(true);
			} else {
				console.error('Token no encontrado en los datos de usuario');
			}
		} catch (error) {
			console.error('Error al iniciar sesión:', error);
			throw error;
		}
	};

	const register = async (user: User) => {
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
				setIsAuthenticated(true);
			} else {
				console.error('Token no encontrado en los datos de usuario');
			}
		} catch (error) {
			console.error('Error al registrarse:', error);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
