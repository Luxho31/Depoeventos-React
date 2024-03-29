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
import {
  deleteProduct,
  getAllProducts,
} from "../../../services/products-service";
import ProductModal from "../modals/products-modals-dashboard";

type ProductData = {
  id: number;
  name: string;
  description: string;
};

export default function DiciplinesDashboard() {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
    console.log("useEffect" + userRole)
    const specificRole: string = "ADMIN";
    if (userRole && userRole.some((role) => role === specificRole)) {
      setLoading(true);
      getAllData()
      getAllProducts()
        .then((data: ProductData[]) => {
          setProductData(data);
          setLoading(false);
        })
        .catch((error: any) => {
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
      getAllProducts().then((data: any) => {
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

  const handleRemoveProduct = async (id: number) => {
    try {
      setLoading(true);
      await deleteProduct(id);
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
    const filteredUsers = productData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastUser: number = page * usersPerPage;
    const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
    const currentUsers: ProductData[] = filteredUsers.slice(
      indexOfFirstUser,
      indexOfLastUser
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
                prefix={<CiSearch className="site-form-item-icon me-1" />}
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
              className="flex items-center gap-x-2"
            >
              <HiMiniPlus className="text-lg" />
              Crear Productos
            </Button>
            <ProductModal
              type="create"
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
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.description}</td>
                <td className="flex px-6 py-4 gap-x-2">
                  <button
                    className="bg-slate-300 rounded-md p-1"
                    onClick={() => openSeeProductModal(user.id)}
                  >
                    <FaEye className="text-xl text-gray-700" />
                  </button>
                  <button
                    className="bg-slate-300 rounded-md p-1"
                    onClick={() => openEditProductModal(user.id)}
                  >
                    <FaEdit className="text-xl text-gray-700" />
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
