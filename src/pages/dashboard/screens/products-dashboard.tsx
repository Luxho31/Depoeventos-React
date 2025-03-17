import { Button, Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import { CiClock1, CiSearch } from "react-icons/ci";
import { FaClone, FaEdit, FaEye } from "react-icons/fa";
import { HiMiniPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllCampuses } from "../../../services/campuses-service";
import { getAllCategories } from "../../../services/categories-service";
import { getAllDisciplines } from "../../../services/disciplines-service";
import {
  cloneProduct,
  getAllActiveProducts,
  getAllProducts,
} from "../../../services/products-service";
import ProductModal from "../modals/products-modals-dashboard";
import { getAllTeacher } from "../../../services/user-service";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [seeId, setSeeId] = useState<number | undefined>(undefined);
  const [openSeeModal, setOpenSeeModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  // const [productType, setProductType] = useState<string>("all");

  const [campuses, setCampuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const { userRole } = useAuth();
  const usersPerPage: number = 10;

  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect" + userRole);
    const specificRole: string = "ADMIN";
    if (userRole && userRole.some((role) => role === specificRole)) {
      setLoading(true);
      getAllData();

      getAllActiveProducts()
        .then((data: ProductData[]) => {
          setProductData(data);
          setLoading(false);
        })
        .catch((error: Error) => {
          console.error("Error al obtener disciplinas:", error);
          setLoading(false);
        });

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
        getAllTeacher(),
      ]).then(
        ([disciplinesData, campusesData, categoriesData, teachersData]) => {
          setDisciplines(disciplinesData);
          setCampuses(campusesData);
          setCategories(categoriesData);
          setTeachers(teachersData);
        }
      );
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = async () => {
    try {
      setLoading(true);
      await getAllProducts().then((data: ProductData[]) => {
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

  const openTimeProductModal = () => {
    setOpenTimeModal(true);
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
  const gradeText = [
    "1er grado",
    "2do grado",
    "3er grado",
    "4to grado",
    "5to grado",
    "6to grado",
    "7mo grado / 1ero secundaria",
    "8vo grado / 2do secundaria",
    "9no grado / 3ero secundaria",
    "10mo grado / 4to secundaria",
    "11vo grado / 5to secundaria",
  ];

  const ageText = [
    "1 año",
    "2 años",
    "3 años",
    "4 años",
    "5 años",
    "6 años",
    "7 años",
    "8 años",
    "9 años",
    "10 años",
    "11 años",
    "12 años",
    "13 años",
    "14 años",
    "15 años",
    "16 años",
  ];

  const mapGradeToText = (grade: string) => {
    if (grade === "Kinder" || grade === "Pre-Kinder" || grade === "Nido")
      return grade;
    const gradeNumber = parseInt(grade);
    return gradeText[gradeNumber - 1] || `${gradeNumber}° grado `;
  };

  const mapAgeToText = (age: string) => {
    const ageNumber = parseInt(age);
    return ageText[ageNumber - 1] || `${ageNumber} años`;
  };
  const validateStatus = (status: boolean) => {
    const basicStyle = "w-3 h-3 rounded-full";
    if (status === true) return basicStyle + " bg-green-500";
    if (status === false) return basicStyle + " bg-red-500";
  };

  const cloneHandle = async (id: number) => {
    try {
      setLoading(true);
      await cloneProduct(id);
      handleReload();
    } catch (error) {
      console.error("Error al clonar producto:", error);
    } finally {
      setLoading(false);
    }
  };
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
              prefix={<CiSearch className="site-form-item-icon me-1 ml-2" />}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch();
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-x-4">
            <Button
              onClick={openCreateProductModal}
              className="max-sm:hidden flex items-center gap-x-2"
            >
              <HiMiniPlus className="text-lg" />
              Crear Productos
            </Button>
            <button
              onClick={openTimeProductModal}
              className="bg-gray-200 rounded-full p-2 shadow-lg hover:bg-gray-300 relative"
            >
              <CiClock1 className="text-xl text-gray-700" />
            </button>
          </div>
          <ProductModal
            type="time"
            id={undefined}
            open={openTimeModal}
            setOpen={setOpenTimeModal}
            handleReload={handleReload}
            campuses={campuses}
            categories={categories}
            disciplines={disciplines}
          />
          <ProductModal
            type="create"
            id={undefined}
            open={openCreateModal}
            setOpen={setOpenCreateModal}
            handleReload={handleReload}
            campuses={campuses}
            categories={categories}
            disciplines={disciplines}
            teachers = {teachers}
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
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Operaciones
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user: any, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">S/.{user.price}</td>
                <td className="px-6 py-4">
                  {user.grades.map((grade: string, index: any) => (
                    <span key={index}>
                      {mapGradeToText(grade)}
                      {index !== user.grades.length - 1 && ", "}
                    </span>
                  ))}
                  {" - "}
                  {user.ages.map((age: string, index: any) => (
                    <span key={index}>
                      {mapAgeToText(age)}
                      {index !== user.ages.length - 1 && ", "}
                    </span>
                  ))}
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
                <td className="px-4 py-2">
                  <div className="flex items-center gap-x-1">
                    <span className={validateStatus(user.active)} />
                    {user.active === false ? "Inactivo" : "Activo"}
                  </div>
                </td>
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
                  <button
                    disabled={loading}
                    className="bg-slate-300 rounded-md p-1"
                    onClick={() => cloneHandle(user.id)}
                  >
                    <FaClone className="text-xl text-gray-700" />
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
