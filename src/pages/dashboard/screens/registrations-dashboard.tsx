import { Form, Input, Pagination, Select, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEye, FaUser } from "react-icons/fa";
import { IoDownload, IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import {
    generateExcel,
    getAllRegistration,
    getInscriptionsWithFilters,
} from "../../../services/Inscriptions-service";
import RegistrationsModal from "../modals/registrations-modals-dashboard";
import { LoadingOutlined } from "@ant-design/icons";

type ProductType = {
    id?: number;
    name?: string;
    campuses: [
        {
            id?: number;
            name?: string;
        }
    ];
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

type CampusType = {
    id: number;
    name: string;
};

type CategoryType = {
    id: number;
    name: string;
};

export default function RegistrationsDashboard() {
    const [registrationData, setRegistrationData] = useState<
        RegistrationData[]
    >([]);
    const [, setLoading] = useState<boolean>(false);
    const [loadingFilters, setLoadingFilters] = useState<boolean>(false);
    const [loadingExcel, setLoadingExcel] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [seeId, setSeeId] = useState<number | undefined>(undefined);
    const [openSeeModal, setOpenSeeModal] = useState(false);
    const [openChildrenModal, setOpenChildrenModal] = useState(false);
    const [fullData, setFullData] = useState<RegistrationData[]>([]);
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
                    setFullData(data);
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

    const openSeeRegistrationModal = (id: number) => {
        setSeeId(id);
        setOpenSeeModal(true);
    };

    const openSeeRegistrationChildrenModal = (id: number) => {
        setSeeId(id);
        setOpenChildrenModal(true);
    };

    const handleSearch = () => {
        setCurrentPage(1);
    };

    const onPageChange = (page: number) => {
        registrationData.filter(
            (registration) =>
                registration.product &&
                registration.product.name &&
                registration.product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );

        setCurrentPage(page);
    };

    const indexOfLastUser: number = currentPage * usersPerPage;
    const indexOfFirstUser: number = indexOfLastUser - usersPerPage;

    const filteredUsers = registrationData.filter(
        (registration) =>
            registration.product &&
            registration.product.name &&
            registration.product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const currentUsers: RegistrationData[] = filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    type InscriptionFilters = {
        productIds: number[];
        campusesIds: number[];
        categoriesIds: number[];
        [key: string]: number[];
    };
    const getInscriptionsWithFiltersForm = async (
        values: InscriptionFilters
    ) => {
        try {
            setLoadingFilters(true);
            const response = await getInscriptionsWithFilters(values);
            setRegistrationData(response);
        } catch (error) {
            console.error("Error al obtener matriculas con filtros:", error);
        } finally {
            setLoadingFilters(false);
        }
    };

    const downloadData = async (values: any) => {
        try {
            setLoadingExcel(true);
            await generateExcel(values);
        } catch (error) {
            console.error("Error al descargar matriculas:", error);
        } finally {
            setLoadingExcel(false);
        }
    };

    return (
        <div className="h-screen">
            <div className="flex justify-between">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white">
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
                                <CiSearch className="site-form-item-icon me-1 ml-2" />
                            }
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleSearch();
                            }}
                        />
                    </div>
                </div>

                {/* Filtros */}
                {/* Por producto */}
                <Form
                    layout="inline"
                    className="flex gap-x-1"
                    style={{ minWidth: 200 }}
                    onFinish={getInscriptionsWithFiltersForm}
                >
                    <Form.Item name="productIds" className="text-black">
                        <Select
                            className="text-black"
                            placeholder="Filtrar por producto"
                            allowClear
                            showSearch
                            style={{ minWidth: 200 }} // Ajustar el ancho mínimo
                            mode="multiple"
                        >
                            {fullData
                                .reduce(
                                    (uniqueProducts: ProductType[], data) => {
                                        if (
                                            !uniqueProducts.some(
                                                (product) =>
                                                    product.id ===
                                                    data.product.id
                                            )
                                        ) {
                                            uniqueProducts.push(data.product);
                                        }
                                        return uniqueProducts;
                                    },
                                    []
                                )
                                .map((product: ProductType) => (
                                    <Select.Option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    {/* Por categoria */}
                    <Form.Item name="categoriesIds" className="text-black">
                        <Select
                            className="text-black"
                            placeholder="Filtrar por categoría"
                            allowClear
                            showSearch
                            style={{ minWidth: 200 }}
                            mode="multiple"
                        >
                            {fullData
                                .reduce((uniqueCategories: any[], data) => {
                                    if (
                                        !uniqueCategories.some(
                                            (category) =>
                                                category.id ===
                                                data.product.category.id
                                        )
                                    ) {
                                        uniqueCategories.push(
                                            data.product.category
                                        );
                                    }
                                    return uniqueCategories;
                                }, [])
                                .map((category: CategoryType) => (
                                    <Select.Option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    {/* Por sede */}
                    <Form.Item name="campusesIds" className="text-black">
                        <Select
                            className="text-black"
                            placeholder="Filtrar por campus"
                            allowClear
                            showSearch
                            style={{ minWidth: 200 }}
                            mode="multiple"
                        >
                            {fullData
                                .reduce(
                                    (uniqueCampuses: any[], data) => {
                                        data.product.campuses.forEach(
                                            (campus) => {
                                                if (
                                                    !uniqueCampuses.some(
                                                        (c) =>
                                                            c.id === campus.id
                                                    )
                                                ) {
                                                    uniqueCampuses.push(campus);
                                                }
                                            }
                                        );
                                        return uniqueCampuses;
                                    },
                                    []
                                )
                                .map((campus: CampusType) => (
                                    <Select.Option
                                        key={campus.id}
                                        value={campus.id}
                                    >
                                        {campus.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    {/* Botón de descarga */}
                    <Form.Item>
                        <button type="submit" className="rounded-md p-1 ">
                            {loadingFilters ? <Spin indicator={<LoadingOutlined />} /> : <IoSend className="text-xl text-gray-700 hover:text-blue-500" />}
                        </button>
                    </Form.Item>

                    <Form.Item>
                        <button
                            className="rounded-md p-1"
                            onClick={() => downloadData({})}
                        >
                            {loadingExcel ? <Spin indicator={<LoadingOutlined />} /> : <IoDownload className="text-xl text-gray-700 hover:text-green-500" />}
                        </button>
                    </Form.Item>
                </Form>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className=" flex-column flex-wrap w-full md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <RegistrationsModal
                        id={seeId}
                        open={openSeeModal}
                        setOpen={setOpenSeeModal}
                    />
                    <RegistrationsModal
                        id={seeId}
                        open={openChildrenModal}
                        setOpen={setOpenChildrenModal}
                        type="children"
                    />
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
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
                                Alumno
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
                                <td className="px-6 py-4">
                                    {user.inscriptionDate}
                                </td>
                                <td className="px-6 py-4">
                                    {user.product.name}
                                </td>
                                <td className="px-6 py-4">
                                    {user.product.campuses.map(
                                        (campus) => campus.name
                                    )}{" "}
                                    / {user.product.category.name}
                                    <div className="font-normal text-gray-500"></div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.children.name}{" "}
                                    {user.children.lastName}{" "}
                                    {user.children.motherLastName}
                                </td>
                                <td className="flex px-6 py-4 gap-x-2">
                                    <Tooltip title="Datos de matricula">
                                        <button
                                            className="bg-slate-300 rounded-md p-1"
                                            onClick={() =>
                                                openSeeRegistrationModal(
                                                    user.id
                                                )
                                            }
                                        >
                                            <FaEye className="text-xl text-gray-700" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Datos de alumno">
                                        <button
                                            className="bg-slate-300 rounded-md p-1"
                                            onClick={() =>
                                                openSeeRegistrationChildrenModal(
                                                    user.id
                                                )
                                            }
                                        >
                                            <FaUser className="text-xl text-gray-700" />
                                        </button>
                                    </Tooltip>
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
