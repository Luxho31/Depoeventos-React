// authContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { generalRoutes } from "../utils/routes/general.routes.ts";

const BASE_URL = generalRoutes.BASE_URL;

interface AuthContextType {
  isAuthenticated: boolean;
  cargando: boolean;
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
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [cargando, setCargando] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // console.log(isAuthenticated);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     verifyToken(token)
  //     console.log(verifyToken(token));
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token)
        .then(isValid => {
          if (isValid) {
            setIsAuthenticated(true);
            console.log("Autenticado correctamente");
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem("token");
            console.log("El token no es valido");
          }
          // Establece cargando en false cuando haya terminado la verificación
          setCargando(false);
        })
        .catch(error => {
          console.error("Error al verificar el token:", error);
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          // También establece cargando en false en caso de error
          setCargando(false);
        });
    } else {
      // Si no hay token, establece cargando en false también
      setCargando(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const userData = await response.json();

      if (userData.token) {
        localStorage.setItem("token", userData.token);
        setIsAuthenticated(true);
      } else {
        console.error("Token no encontrado en los datos de usuario");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const register = async (user: User) => {
    try {
      const response = await fetch(`${BASE_URL}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const userData = await response.json();

      if (userData.token) {
        localStorage.setItem("token", userData.token);
        setIsAuthenticated(true);
      } else {
        console.error("Token no encontrado en los datos de usuario");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/verifyToken/${token}`);
  
      if (response.ok) {
        return true;
      } else {
        // Si el servidor responde con un estado no exitoso, lanzamos un error
        throw new Error(`Error al verificar el token: ${response.statusText}`);
      }
    } catch (error) {
      // Capturamos cualquier error de red u otros errores que puedan ocurrir
      console.error("Error al verificar el token:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
