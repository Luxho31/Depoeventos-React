import { useEffect, useState } from "react";
import CustomTable from "../../../components/tables/custom-table";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Input, Pagination } from "antd";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

type CourseRegistrationData = {
  id: number;
  name: string;
  description: string;
};

export default function CoursesDashboard() {
    const [courseRegistrationData, setCourseRegistrationData] = useState<
        CourseRegistrationData[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [seeId, setSeeId] = useState<number | undefined>(undefined);
    const [openSeeModal, setOpenSeeModal] = useState(false);
    const { userRole } = useAuth();
    const usersPerPage: number = 5;
    const navigate = useNavigate();

    useEffect(() => {
        // const specificRole: string = "USER";
        // if (userRole && userRole.some((role) => role === specificRole)) {
        const specificRoles = ["USER", "ADMIN"];
        if (userRole && userRole.some((role) => specificRoles.includes(role))) {
            setLoading(true);
            // getAllCourseRegistration()
            //     .then((data: CourseRegistrationData[]) => {
            //         setCourseRegistrationData(data);
            //         setLoading(false);
            //     })
            //     .catch((error) => {
            //         console.error("Error al obtener matriculas por curso:", error);
            //         setLoading(false);
            //     });
        } else {
            navigate("/dashboard");
        }
    }, [userRole]);

    const handleReload = () => {
        try {
            setLoading(true);
            // getAllCourseRegistrations().then((data) => {
            //   setCourseRegistrationData(data);
            // });
        } catch (error) {
            console.error("Error al recargar matriculas por curso:", error);
        } finally {
            setLoading(false);
        }
    };

    const openSeeCourseRegistrationModal = (id: number) => {
        setSeeId(id);
        setOpenSeeModal(true);
    };

    const handleSearch = () => {
        // Actualiza la página actual a 1 después de la búsqueda
        setCurrentPage(1);
    };

    const onPageChange = (page: number) => {
        // Mantén la búsqueda al cambiar de página
        const filteredUsers = courseRegistrationData.filter((courseRegistration) =>
            courseRegistration.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const indexOfLastUser: number = page * usersPerPage;
        const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
        const currentUsers: CourseRegistrationData[] = filteredUsers.slice(
            indexOfFirstUser,
            indexOfLastUser
        );

        setCurrentPage(page);
    };

    const indexOfLastUser: number = currentPage * usersPerPage;
    const indexOfFirstUser: number = indexOfLastUser - usersPerPage;

    const filteredUsers = courseRegistrationData.filter((courseRegistration) =>
        courseRegistration.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentUsers: CourseRegistrationData[] = filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    return (
        <div className="h-screen">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between">
                    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                        <label htmlFor="table-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <Input
                                id="table-search-users"
                                placeholder="Buscar por nombre"
                                className="w-full rounded-xl p-1"
                                size="small"
                                prefix={
                                    <CiSearch className="site-form-item-icon me-1" />
                                }
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    handleSearch();
                                }}
                            />
                        </div>
                    </div>
                    {/* <RegistrationModal
                    type="see"
                    id={seeId}
                    open={openSeeModal}
                    setOpen={setOpenSeeModal}
                    handleReload={handleReload}
                /> */}
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Operaciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">
                                    {user.description}
                                </td>
                                <td className="flex px-6 py-4 gap-x-2">
                                    <button
                                        className="bg-slate-300 rounded-md p-1"
                                        onClick={() =>
                                            openSeeCourseRegistrationModal(user.id)
                                        }
                                    >
                                        <FaEye className="text-xl text-gray-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    className="mt-4"
                    current={currentPage}
                    total={filteredUsers.length}
                    pageSize={usersPerPage}
                    onChange={onPageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}
