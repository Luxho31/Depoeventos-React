import { Button, Input, Pagination, Popconfirm, Select } from "antd";
import CustomTable from "../../../components/tables/custom-table";
import { CiSearch } from "react-icons/ci";
import DisciplineModal from "../modals/disciplines-modals-dashboard";
import { HiMiniPlus } from "react-icons/hi2";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

type RegistrationData = {
    id: number;
    name: string;
    description: string;
};

export default function RegistrationsDashboard() {
    const [registrationData, setRegistrationData] = useState<
        RegistrationData[]
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
            // getAllRegistration()
            //     .then((data: RegistrationData[]) => {
            //         setRegistrationData(data);
            //         setLoading(false);
            //     })
            //     .catch((error) => {
            //         console.error("Error al obtener matriculas:", error);
            //         setLoading(false);
            //     });
        } else {
            navigate("/dashboard");
        }
    }, [userRole]);

    const handleReload = () => {
        try {
            setLoading(true);
            // getAllRegistrations().then((data) => {
            //   setRegistrationData(data);
            // });
        } catch (error) {
            console.error("Error al recargar matriculas:", error);
        } finally {
            setLoading(false);
        }
    };

    const openSeeRegistrationModal = (id: number) => {
        setSeeId(id);
        setOpenSeeModal(true);
    };

    const handleSearch = () => {
        // Actualiza la página actual a 1 después de la búsqueda
        setCurrentPage(1);
    };

    const onPageChange = (page: number) => {
        // Mantén la búsqueda al cambiar de página
        const filteredUsers = registrationData.filter((registration) =>
            registration.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const indexOfLastUser: number = page * usersPerPage;
        const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
        const currentUsers: RegistrationData[] = filteredUsers.slice(
            indexOfFirstUser,
            indexOfLastUser
        );

        setCurrentPage(page);
    };

    const indexOfLastUser: number = currentPage * usersPerPage;
    const indexOfFirstUser: number = indexOfLastUser - usersPerPage;

    const filteredUsers = registrationData.filter((registration) =>
        registration.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentUsers: RegistrationData[] = filteredUsers.slice(
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
                    <div className="flex justify-between items-center gap-x-4 mb-5">
                        <h2>Filtros:</h2>
                        <Select
                            // defaultValue="Todos los productos"
                            placeholder="Por producto"
                            style={{ width: 150 }}
                            // onChange={handleChange}
                            options={[
                              { value: "Todos los productos", label: "Todos los productos" },
                              { value: "Producto", label: "Producto" },
                                { value: "Yiminghe", label: "yiminghe" },
                                {
                                    value: "disabled",
                                    label: "Disabled",
                                    disabled: true,
                                },
                            ]}
                        />
                        <Select
                            defaultValue="lucy"
                            style={{ width: 120 }}
                            // onChange={handleChange}
                            options={[
                                { value: "jack", label: "Jack" },
                                { value: "lucy", label: "Lucy" },
                                { value: "Yiminghe", label: "yiminghe" },
                                {
                                    value: "disabled",
                                    label: "Disabled",
                                    disabled: true,
                                },
                            ]}
                        />
                        {/* <RegistrationModal
                                type="see"
                                id={seeId}
                                open={openSeeModal}
                                setOpen={setOpenSeeModal}
                                handleReload={handleReload}
                            /> */}
                    </div>
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
                                            openSeeRegistrationModal(user.id)
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
