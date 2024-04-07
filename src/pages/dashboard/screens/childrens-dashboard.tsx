import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { HiMiniPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import {
    deleteChildren,
    getChildrensByUserId,
} from "../../../services/children-service";
import ChildrenModal from "../modals/childrens-modals-dashboard";

type ChildrenData = {
    id: number;
    name: string;
    lastName: string;
    motherLastName: string;
    birthdate: string;
    documentType: string;
    documentNumber: string;
    emergencyContactPhone: string;
    gender: string;
    isStudent: boolean;
    school: string;
    grade: string;
    section: string;
    isClubMember: boolean;
    club: string;
    membershipCardNumber: string;
    memberName: string;
    memberLastName: string;
    memberMotherLastName: string;
};

export default function ChildrensDashboard() {
    const [childrenData, setChildrenData] = useState<ChildrenData[]>([]);
    const [, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editId, setEditId] = useState<number | undefined>(undefined);
    const { userRole } = useAuth();
    const usersPerPage: number = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const specificRoles = ["USER", "ADMIN"];
        if (userRole && userRole.some((role) => specificRoles.includes(role))) {
            setLoading(true);
            getChildrensByUserId()
                .then((data: ChildrenData[]) => {
                    setChildrenData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al obtener disciplinas:", error);
                    setLoading(false);
                });
        } else {
            navigate("/dashboard"); // Redirige si el usuario no tiene un rol permitido
        }
    }, [userRole]);

    const handleReload = () => {
        try {
            setLoading(true);
            getChildrensByUserId().then((data) => {
                setChildrenData(data);
            });
        } catch (error) {
            console.error("Error al recargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    const openCreateChildrenModal = () => {
        setOpenCreateModal(true);
    };

    const openEditChildrenModal = (id: number) => {
        setEditId(id);
        setOpenEditModal(true);
    };

    const handleRemoveChildren = async (id: number) => {
        try {
            setLoading(true);
            await deleteChildren(id);
            handleReload();
        } catch (error) {
            console.error("Error al eliminar disciplina:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSearch = () => {
        // Actualiza la página actual a 1 después de la búsqueda
        setCurrentPage(1);
    };

    const onPageChange = (page: number) => {
        // Mantén la búsqueda al cambiar de página
        // const filteredUsers = childrenData.filter((children) =>
        //   children.name.toLowerCase().includes(searchTerm.toLowerCase())
        // );
        // const indexOfLastUser: number = page * usersPerPage;
        // const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
        // const currentUsers: ChildrenData[] = filteredUsers.slice(
        //   indexOfFirstUser,
        //   indexOfLastUser
        // );

        childrenData.filter((children) =>
            children.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setCurrentPage(page);
    };

    const indexOfLastUser: number = currentPage * usersPerPage;
    const indexOfFirstUser: number = indexOfLastUser - usersPerPage;

    const filteredUsers = childrenData.filter((children) =>
        children.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentUsers: ChildrenData[] = filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    return (
        <div className="h-screen">
            <div className="flex justify-between">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <Input
                            id="table-search-users"
                            placeholder="Buscar por nombre"
                            className="w-full rounded-xl p-1  ml-2"
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
                <div className="flex justify-between items-center mb-5">
                    <Button
                        onClick={openCreateChildrenModal}
                        className="flex items-center gap-x-2"
                    >
                        <HiMiniPlus className="text-lg" />
                        Crear Hijo
                    </Button>
                    <ChildrenModal
                        type="create"
                        id={undefined}
                        open={openCreateModal}
                        setOpen={setOpenCreateModal}
                        handleReload={handleReload}
                    />
                    <ChildrenModal
                        type="edit"
                        id={editId}
                        open={openEditModal}
                        setOpen={setOpenEditModal}
                        handleReload={handleReload}
                    />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Hijo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha de Nacimiento
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Documento
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Número de emergencia
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
                                <td
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                                >
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">
                                            {user.name} {user.lastName}{" "}
                                            {user.motherLastName}
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            {user.gender}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{user.birthdate}</td>
                                <td
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                                >
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">
                                            {user.documentNumber}
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            {user.documentType}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{user.birthdate}</td>
                                <td className="flex px-6 py-4 gap-x-2">
                                    <button
                                        className="bg-slate-300 rounded-md p-1"
                                        onClick={() =>
                                            openEditChildrenModal(user.id)
                                        }
                                    >
                                        <FaEdit className="text-xl text-gray-700" />
                                    </button>
                                    <Popconfirm
                                        title="Eliminar hijo?"
                                        description="Esta acción no se puede deshacer."
                                        onConfirm={() =>
                                            handleRemoveChildren(user.id)
                                        }
                                        okText="Si"
                                        cancelText="No"
                                        okButtonProps={{
                                            className:
                                                "bg-red-500 text-white !hover:bg-red-600",
                                        }}
                                        icon={
                                            <QuestionCircleOutlined
                                                style={{ color: "red" }}
                                            />
                                        }
                                    >
                                        <button className="bg-red-300 rounded-md p-1">
                                            <FaRegTrashAlt className="text-xl text-gray-700" />
                                        </button>
                                    </Popconfirm>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                className="mt-4"
                current={currentPage}
                total={filteredUsers.length}
                pageSize={usersPerPage}
                onChange={onPageChange}
                showSizeChanger={false}
            />
        </div>
    );
}
