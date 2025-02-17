import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

function IncidentsTeachersDashboard() {
    const [loading, setLoading] = useState<boolean>(false);
    const { userRole } = useAuth();

    const navigate = useNavigate();

    const specificRole: string = "ADMIN";
    useEffect(() => {
        if (userRole && userRole.some((role) => role === specificRole)) {
            handleReload();
        } else {
            navigate("/dashboard");
        }
    }, [userRole]);

    const handleReload = async () => {
        setLoading(true);
        try {

        } catch (error) {
            console.error("Error al cargar las incidencias", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <p className="m-4 font-semibold text-xl">
                    Incidencias de los profesores
                </p>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">



                </div>
            </div>
        </div>
    );
}

export default IncidentsTeachersDashboard;
