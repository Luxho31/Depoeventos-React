import { Input, Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import {
    getAllCourseRegistration,
    getAllRegistration,
} from "../../../services/Inscriptions-service";

type ProductType = {
    id?: number;
    name?: string;
    campus: {
        id?: number;
        name?: string;
    };
    category: {
        id?: number;
        name?: string;
    };
};

type ChildrenType = {
    id?: number;
    name?: string;
    lastName?: number;
    motherLastName?: string;
};

type UserType = {
    id?: number;
    firstName?: string;
    lastName?: number;
    motherLastName?: string;
    contactNumber?: string;
};

type RegistrationData = {
    id: number;
    inscriptionDate: string;
    product: ProductType;
    children: ChildrenType;
    user: UserType;
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
            getAllRegistration()
                .then((data: RegistrationData[]) => {
                    setRegistrationData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al obtener matriculas:", error);
                    setLoading(false);
                });
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
            registration.product
                .name!.toLowerCase()
                .includes(searchTerm.toLowerCase())
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
        registration.product
            .name!.toLowerCase()
            .includes(searchTerm.toLowerCase())
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
                        {/* <h2>Filtros:</h2>
                        <Select
                            placeholder="Seleccionar Producto"
                            className="w-full h-14"
                            options={products.map((product: any) => {
                                return {
                                    value: product.id,
                                    label: product.name,
                                };
                            })}
                        />
                        <Select
                            placeholder="Seleccionar Sede"
                            className="w-full h-14"
                            options={campuses.map((campus: any) => {
                                return {
                                    value: campus.id,
                                    label: campus.name,
                                };
                            })}
                        />
                        <Select
                            placeholder="Seleccionar Categoria"
                            className="w-full h-14"
                            options={categories.map((category: any) => {
                                return {
                                    value: category.id,
                                    label: category.name,
                                };
                            })}
                        /> */}
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
                                Fecha de inscripción
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Producto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sede/Categoría
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hijo
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
                                <td className="px-6 py-4">
                                    {user.inscriptionDate}
                                </td>
                                <td className="px-6 py-4">
                                    {user.product.name}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-base font-semibold">
                                        {user.product.campus.name}
                                    </div>
                                    <div className="font-normal text-gray-500">
                                        {user.product.category.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.children.name}{" "}
                                    {user.children.lastName}{" "}
                                    {user.children.motherLastName}
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
