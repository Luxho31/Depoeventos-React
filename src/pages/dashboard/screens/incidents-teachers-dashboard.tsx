import { Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import IncidentsTeachersModal from "../modals/incidents-teachers-modal-dashboard";
import { MdOutlineDescription } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";

const DATA = [
    {
        id: 1,
        course: "Curso 1",
        schedule: "Lunes 10:00 a 12:00",
        location: "Sede 1",
        teacher: "Profesor 1",
        students: ["Alumno 1", "Alumno 2"],
    },
    {
        id: 2,
        course: "Curso 2",
        schedule: "Martes 10:00 a 12:00",
        location: "Sede 2",
        teacher: "Profesor 2",
        students: ["Alumno 3", "Alumno 4"],
    }
]
function IncidentsTeachersDashboard() {
    // const [videosData, setIncidentsTeachersData] = useState<any[]>([]);
    const [, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openCreateIncidentModal, setOpenCreateIncidentModal] = useState<boolean>(false);
    const { userRole } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (userRole && userRole.some((role) => role === "TEACHER" || role === "ADMIN")) {
            handleReload();
        } else {
            navigate("/dashboard");
        }
    }, [userRole]);

    useEffect(() => {
        const timeoutId = setTimeout(() => handleReload(), 400);
        return () => clearTimeout(timeoutId);
    }, [currentPage]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const handleReload = async () => {
        setLoading(true);
        try {
            // const response = await getAllIncidents();
            // setIncidentsData(response);
        } catch (error) {
            console.error("Error al cargar los videos:", error);
        } finally {
            setLoading(false);
        }
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page - 1);
    };

    return (
        <div className="h-full">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between shadow-md sm:rounded-lg">
                    <h1 className="text-base text-gray-500 ml-10">Incidentes de profesores</h1>
                    <button className="flex items-center justify-center gap-x-2 py-2 px-4 rounded mr-10 border"
                        onClick={() => setOpenCreateIncidentModal(true)}
                    >
                        <p>Crear incidente</p> <FaRegPlusSquare />
                    </button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr className="w-fit">
                                <th scope="col" className="px-6 py-3">
                                    Curso
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Horario
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sede
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Alumno/s
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Detalle
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                DATA.map((data) => (
                                    <tr key={data.id} className="border-b border-gray-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{data.course}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{data.schedule}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{data.location}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {data.students.map((student) => (
                                                    <div key={student}>{student}</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <>
                                                <button onClick={showModal} className=" font-bold py-2 px-4 rounded border hover:bg-gray-200">
                                                    <MdOutlineDescription />
                                                </button>
                                                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                                    <p>Some contents...</p>
                                                    <p>Some contents...</p>
                                                    <p>Some contents...</p>
                                                </Modal>
                                            </>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <IncidentsTeachersModal
                open={openCreateIncidentModal}
                setOpen={setOpenCreateIncidentModal}
                handleReload={handleReload}
            />
            <Pagination
                className="mt-4"
                current={currentPage + 1}
                // total={videosData.length}
                pageSize={10}
                onChange={onPageChange}
                showSizeChanger={false}
            />
        </div>
    );
}

export default IncidentsTeachersDashboard;
