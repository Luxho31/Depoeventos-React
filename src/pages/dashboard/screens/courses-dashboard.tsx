import { Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllCourseRegistration } from "../../../services/Inscriptions-service";
import CoursesModal from "../modals/courses-modals-dashboard";

type ProductType = {
  id?: number;
  name?: string;
  campuses: {
    map: (arg0: (campus: CampusType) => JSX.Element) => JSX.Element[];

    id?: number;
    name?: string;
  };
  category: {
    id?: number;
    name?: string;
  };
};

type CampusType = {
  id?: number;
  name?: string;
  description?: string;
};

type ChildrenType = {
  id?: number;
  name?: string;
  lastName?: number;
  motherLastName?: string;
};

// type UserType = {
//     id?: number;
//     firstName?: string;
//     lastName?: number;
//     motherLastName?: string;
//     contactNumber?: string;
// }

type CourseRegistrationData = {
  id: number;
  inscriptionDate: string;
  product: ProductType;
  children: ChildrenType;
  //   user: UserType;
};

export default function CoursesDashboard() {
  const [courseRegistrationData, setCourseRegistrationData] = useState<
    CourseRegistrationData[]
  >([]);
  const [, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [seeId, setSeeId] = useState<number | undefined>(undefined);
  const [openSeeModal, setOpenSeeModal] = useState(false);
  const { userRole } = useAuth();
  const usersPerPage: number = 5;
  const navigate = useNavigate();
  const specificRoles: string[] = ["USER", "ADMIN"];

  useEffect(() => {
    if (userRole && userRole.some((role) => specificRoles.includes(role))) {
      setLoading(true);
      getAllCourseRegistration()
        .then((data: CourseRegistrationData[]) => {
          console.log(data);
          setCourseRegistrationData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener matriculas por curso:", error);
          setLoading(false);
        });
    } else {
      navigate("/dashboard");
    }
  }, [userRole]);

  const openSeeCourseModal = (id: number) => {
    setSeeId(id);
    setOpenSeeModal(true);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    courseRegistrationData.filter((courseRegistration) =>
      courseRegistration.inscriptionDate
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setCurrentPage(page);
  };

  const indexOfLastUser: number = currentPage * usersPerPage;
  const indexOfFirstUser: number = indexOfLastUser - usersPerPage;

  const filteredUsers = courseRegistrationData.filter((courseRegistration) =>
    courseRegistration.inscriptionDate
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const currentUsers: CourseRegistrationData[] = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const campusNames = (campuses: any[]) => {
    return campuses.map((campus) => campus.name).join(", ");
  };

  const categoriesNames = (categories: any[]) => {
    return categories.map((category) => category.name).join(", ");
  }

  const inscriptionDateFormated = (inscriptionDate: string) => {
    return new Date(inscriptionDate).toLocaleDateString();
  }

  return (
    <div className="h-screen">
      <div className="flex justify-between">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <CoursesModal
            id={seeId}
            open={openSeeModal}
            setOpen={setOpenSeeModal}
          />
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
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                Sede
              </th>
              <th scope="col" className="px-6 py-3">
                Categoría
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
            {currentUsers.map((user: any, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{inscriptionDateFormated(user.inscriptionDate)}</td>
                <td className="px-6 py-4">{user.product.name}</td>

                <td className="px-6 py-4">
                  <>{campusNames(user.product.campuses)}</>
                </td>

                <td className="px-6 py-4">{categoriesNames(user.product.category)}</td>
                <td className="px-6 py-4">
                  {user.children.name} {user.children.lastName}{" "}
                  {user.children.motherLastName}
                </td>
                <td className="flex px-6 py-4 gap-x-2">
                  <button
                    className="bg-slate-300 rounded-md p-1"
                    onClick={() => openSeeCourseModal(user.id)}
                  >
                    <FaEye className="text-xl text-gray-700" />
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
