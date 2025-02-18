import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

function AssistsDashboard() {
    const [, setLoading] = useState(false);
    const { userRole } = useAuth();
    const navigate = useNavigate();
    const specificRole = "ADMIN";

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
            // Aquí puedes cargar datos desde una API
        } catch (error) {
            console.error("Error al cargar los cursos", error);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    };

    const courses = [
        {
            id: 1,
            name: "Actividades artísticas",
            description: "Descripción del curso 1",
            startDate: "2025-10-01",
            endDate: "2025-10-31",
            total_assists: 10,
        },
        {
            id: 2,
            name: "Fotografía",
            description: "Descripción del curso 2",
            startDate: "2025-11-01",
            endDate: "2025-11-30",
            total_assists: 20,
        },
        {
            id: 3,
            name: "Diseño gráfico",
            description: "Descripción del curso 3",
            startDate: "2025-12-01",
            endDate: "2025-12-31",
            total_assists: 30,
        },
    ];

    return (
        <div className="h-full p-4 max-sm:p-0 ">
            <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
                <p className="m-4 text-xl font-medium max-sm:text-lg">
                    Asistencias <span className="text-sm text-gray-500">({getCurrentDate()})</span>
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
                    {courses.map((course) => (
                        <li key={course.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
                            <h3 className="text-gray-900 text-base font-medium max-sm:text-base">
                                {course.name} <span className="text-sm text-gray-500 max-sm:text-xs">({course.total_assists} personas)</span>
                            </h3>
                            <p className="text-gray-500 text-sm max-sm:hidden">{course.description}</p>
                            <div className="flex flex-wrap justify-between text-sm text-gray-900">
                                <p><strong>Inicio:</strong> {course.startDate}</p>
                                <p><strong>Final:</strong> {course.endDate}</p>
                            </div>
                            <button
                                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                                onClick={() => navigate(`/dashboard/assists/${course.id}`)}
                            >
                                Ver
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AssistsDashboard;
