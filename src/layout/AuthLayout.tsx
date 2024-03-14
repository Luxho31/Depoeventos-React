import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "../context/AuthProvider"
import { Spin } from 'antd';

export default function AuthLayout() {
    const { isAuthenticated, cargando } = useAuth()

    if (cargando) return <Spin fullscreen />;

    return (
        <>
            {!isAuthenticated ? (

                <Outlet />
            ) : (
                <Navigate to="/" />
            )}
        </>
    )
}
