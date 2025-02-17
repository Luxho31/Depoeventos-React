import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

function AssistsDashboard() {
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
    }

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
    ]

    return (
        <div className="h-full">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <p className="m-4 font-semibold text-xl">
                    Asistencias <span className="text-sm text-gray-500">({getCurrentDate()})</span>
                </p>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {/* Lista de Cursos */}
                    <ul
                        role="list"
                        className="grid grid-cols-2 gap-4 m-4"
                    >
                        {courses.map((course) => (

                            <li
                                key={course.id}
                                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
                            >
                                <div className="w-full flex items-center justify-between p-6 space-x-6">
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="text-gray-900 text-sm font-semibold truncate">
                                                {course.name} {" "}
                                                <span
                                                    className="text-gray-500 text-sm font-normal"
                                                >({course.total_assists} personas)</span>
                                            </h3>
                                        </div>
                                        <p className="mt-1 text-gray-500 text-sm truncate">
                                            {course.description}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="flex gap-x-2">
                                            <p className="text-sm font-medium text-gray-900">
                                                Inicio:
                                            </p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {course.startDate}
                                            </p>
                                        </div>
                                        <div className="flex gap-x-2">
                                            <p className="text-sm font-medium text-gray-900">
                                                Final:
                                            </p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {course.endDate}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={() => navigate(`/dashboard/assists/${course.id}`)}
                                        >
                                            Ver
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AssistsDashboard;
