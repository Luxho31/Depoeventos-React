import { Button, Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaEye } from "react-icons/fa";
import { HiMiniPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllCampuses } from "../../../services/campuses-service";
import { getAllCategories } from "../../../services/categories-service";
import { getAllDisciplines } from "../../../services/disciplines-service";
import { getAllProducts } from "../../../services/products-service";
import ProductModal from "../modals/products-modals-dashboard";

type ProductData = {
    campus: Campus[];
    category: Category;
    courses: Course[];
    grades: string[];
    ages: string[];
    id: number;
    name: string;
    description: string;
    price: number;
};
type Category = {
    id: number;
    name: string;
};
type Course = {
    id: number;
    name: string;
};

type Campus = {
    id: number;
    name: string;
    description: string;
};

export default function DiciplinesDashboard() {
    const [productData, setProductData] = useState<ProductData[]>([]);
    const [, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editId, setEditId] = useState<number | undefined>(undefined);
    const [seeId, setSeeId] = useState<number | undefined>(undefined);
    const [openSeeModal, setOpenSeeModal] = useState(false);

    const [campuses, setCampuses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [disciplines, setDisciplines] = useState([]);

    const { userRole } = useAuth();
    const usersPerPage: number = 5;

    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect" + userRole);
        const specificRole: string = "ADMIN";
        if (userRole && userRole.some((role) => role === specificRole)) {
            setLoading(true);
            getAllData();
            getAllProducts()
                .then((data: ProductData[]) => {
                    setProductData(data);
                    setLoading(false);
                })
                .catch((error: Error) => {
                    console.error("Error al obtener disciplinas:", error);
                    setLoading(false);
                });
        } else {
            navigate("/dashboard");
        }
    }, [userRole]);

    const getAllData = async () => {
        try {
            setLoading(true);
            await Promise.all([
                getAllDisciplines(),
                getAllCampuses(),
                getAllCategories(),
            ]).then(([disciplinesData, campusesData, categoriesData]) => {
                setDisciplines(disciplinesData);
                setCampuses(campusesData);
                setCategories(categoriesData);
            });
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReload = () => {
        try {
            setLoading(true);
            getAllProducts().then((data: ProductData[]) => {
                setProductData(data);
            });
        } catch (error) {
            console.error("Error al recargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };


    const openCreateProductModal = () => {
        setOpenCreateModal(true);
    };

    const openEditProductModal = (id: number) => {
        setEditId(id);
        setOpenEditModal(true);
    };

    const openSeeProductModal = (id: number) => {
        setSeeId(id);
        setOpenSeeModal(true);
    };

    const handleSearch = () => {
        setCurrentPage(1);
    };

    const onPageChange = (page: number) => {
        productData.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setCurrentPage(page);
    };

    const indexOfLastUser: number = currentPage * usersPerPage;
    const indexOfFirstUser: number = indexOfLastUser - usersPerPage;

    const filteredUsers = productData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentUsers: ProductData[] = filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    return (
        <div className="h-screen">
            <button
                onClick={openCreateProductModal}
                className="sm:hidden bg-blue-400 hover:bg-blue-500 absolute bottom-10 right-12 p-3 border shadow-lg rounded-full z-30"
            >
                <HiMiniPlus className="text-white text-2xl" />
            </button>
            <div className="flex justify-between">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
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
                <div className="flex justify-between items-center mb-5">
                    <Button
                        onClick={openCreateProductModal}
                        className="max-sm:hidden flex items-center gap-x-2"
                    >
                        <HiMiniPlus className="text-lg" />
                        Crear Productos
                    </Button>
                    <ProductModal
                        type="create"
                        id={undefined}
                        open={openCreateModal}
                        setOpen={setOpenCreateModal}
                        handleReload={handleReload}
                        campuses={campuses}
                        categories={categories}
                        disciplines={disciplines}
                    />
                    <ProductModal
                        type="edit"
                        id={editId}
                        open={openEditModal}
                        setOpen={setOpenEditModal}
                        handleReload={handleReload}
                        campuses={campuses}
                        categories={categories}
                        disciplines={disciplines}
                    />
                    <ProductModal
                        type="see"
                        id={seeId}
                        open={openSeeModal}
                        setOpen={setOpenSeeModal}
                        handleReload={handleReload}
                        campuses={campuses}
                        categories={categories}
                        disciplines={disciplines}
                    />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Grado - Edad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cursos
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sede - Categoria
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Operaciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user: any, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">S/.{user.price}</td>
                                <td className="px-6 py-4">
                                    {user.grades.join(", ")} -{" "}
                                    {user.ages.join(", ")}
                                </td>
                                <td className="px-6 py-4">
                                    {user.courses
                                        .map((c: Course) => {
                                            return <p>{c.name}</p>;
                                        })
                                        .slice(0, 3)}
                                </td>
                                <td className="px-6 py-4">
                                    {user.categories.map((c: Category) => {
                                        return <p className="">{c.name}</p>;
                                    })}
                                    {user.campus.map((c: Category) => {
                                        return <p>{c.name}</p>;
                                    })}
                                </td>
                                <td className="flex px-6 py-4 gap-x-2">
                                    <button
                                        className="bg-slate-300 rounded-md p-1"
                                        onClick={() =>
                                            openSeeProductModal(user.id)
                                        }
                                    >
                                        <FaEye className="text-xl text-gray-700" />
                                    </button>
                                    <button
                                        className="bg-slate-300 rounded-md p-1"
                                        onClick={() =>
                                            openEditProductModal(user.id)
                                        }
                                    >
                                        <FaEdit className="text-xl text-gray-700" />
                                    </button>
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
