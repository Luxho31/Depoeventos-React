import { Input, Pagination, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEye, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllRegistration } from "../../../services/Inscriptions-service";
import RegistrationsModal from "../modals/registrations-modals-dashboard";

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

export default function RegistrationsDashboard() {
  const [registrationData, setRegistrationData] = useState<RegistrationData[]>(
    []
  );
  const [, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [seeId, setSeeId] = useState<number | undefined>(undefined);
  const [openSeeModal, setOpenSeeModal] = useState(false);
  const [openChildrenModal, setOpenChildrenModal] = useState(false);
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
      registration.product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="flex items-center justify-between ">
              <Input
                id="table-search-users"
                placeholder="Buscar por nombre"
                className="w-44 rounded-xl p-1"
                size="small"
                prefix={<CiSearch className="site-form-item-icon me-1" />}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch();
                }}
              />
              {/* Filtros */}
              <div className="flex gap-x-4">
                {/* Por producto */}
                <div className="flex items-center gap-x-2">
                  <label htmlFor="campus" className="text-gray-500">
                    Filtrar por producto
                  </label>
                  <Select
                    className="w-1/4 text-black"
                    placeholder="Filtrar por producto"
                    allowClear
                    showSearch
                    style={{ width: 200 }}
                    mode="multiple"
                  >
                    {registrationData.map((data) => (
                      <Select.Option
                        key={data.product.id}
                        value={data.product.name}
                      >
                        {data.product.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                {/* Por categoria */}
                <div className="flex items-center gap-x-2">
                  <label htmlFor="campus" className="text-gray-500">
                    Filtrar por categoría
                  </label>
                  <Select
                    className="w-1/4 text-black"
                    placeholder="Filtrar por categoría"
                    allowClear
                    showSearch
                    mode="multiple"
                    style={{ width: 200 }}
                  >
                    {registrationData.map((data) => (
                      <Select.Option
                        key={data.product.category.id}
                        value={data.product.category.id}
                      >
                        {data.product.category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                {/* Por sede */}
                <div className="flex items-center gap-x-2">
                  <label htmlFor="campus" className="text-gray-500">
                    Filtrar por campus
                  </label>
                  <Select
                    className="w-1/4 text-black"
                    placeholder="Filtrar por campus"
                    allowClear
                    showSearch
                    style={{ width: 200 }}
                  >
                    {registrationData.map((data) =>
                      data.product.campuses.map((campus) => (
                        <Select.Option key={campus.id} value={campus.name}>
                          {campus.name}
                        </Select.Option>
                      ))
                    )}
                  </Select>
                </div>
              </div>
            </div>
          </div>
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
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.inscriptionDate}</td>
                <td className="px-6 py-4">{user.product.name}</td>
                <td className="px-6 py-4">
                  {user.product.campuses.map((campus) => campus.name)} /{" "}
                  {user.product.category.name}
                  <div className="font-normal text-gray-500"></div>
                </td>
                <td className="px-6 py-4">
                  {user.children.name} {user.children.lastName}{" "}
                  {user.children.motherLastName}
                </td>
                <td className="flex px-6 py-4 gap-x-2">
                  <Tooltip title="Datos de matricula">
                    <button
                      className="bg-slate-300 rounded-md p-1"
                      onClick={() => openSeeRegistrationModal(user.id)}
                    >
                      <FaEye className="text-xl text-gray-700" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Datos de alumno">
                    <button
                      className="bg-slate-300 rounded-md p-1"
                      onClick={() => openSeeRegistrationChildrenModal(user.id)}
                    >
                      <FaUser className="text-xl text-gray-700" />
                    </button>
                  </Tooltip>
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
