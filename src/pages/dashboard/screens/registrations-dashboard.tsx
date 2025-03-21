import {
  Button,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Pagination,
  Select,
  Spin,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEye, FaShoppingBag, FaUser } from "react-icons/fa";
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
import { BiSliderAlt } from "react-icons/bi";
import ReturnModal from "../modals/returns-modals-dashboard";

type ProductType = {
  id?: number;
  name?: string;
  campuses: [
    {
      id?: number;
      name?: string;
    }
  ];
  categories: [
    {
      id?: number;
      name?: string;
    }
  ];
};

type ChildrenType = {
  id?: number;
  name?: string;
  lastName?: string;
  motherLastName?: string;
};

type UserType = {
  id?: number;
  firstName?: string;
  lastName?: string;
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
  const [registrationData, setRegistrationData] = useState<RegistrationData[]>(
    []
  );
  const [, setLoading] = useState<boolean>(false);
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false);
  const [loadingExcel, setLoadingExcel] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [seeId, setSeeId] = useState<number | undefined>(undefined);
  const [openSeeModal, setOpenSeeModal] = useState(false);
  const [openChildrenModal, setOpenChildrenModal] = useState(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);
  const [, setWindowWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [fullData, setFullData] = useState<RegistrationData[]>([]);
  const { userRole } = useAuth();
  const usersPerPage: number = 10;
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState<any>({});
  const [form] = Form.useForm();

  useEffect(() => {
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

  // Función para manejar el cambio en el tamaño de la ventana
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth >= 300) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openSeeRegistrationModal = (id: number) => {
    setSeeId(id);
    setOpenSeeModal(true);
  };

  const openSeeRegistrationChildrenModal = (id: number) => {
    setSeeId(id);
    setOpenChildrenModal(true);
  };

  const openCreateReturnModal = (id: number) => {
    setSeeId(id);
    setOpenReturnModal(true);
  };

  const handleReload = () => {
    getAllRegistration()
      .then((data: RegistrationData[]) => {
        setRegistrationData(data);
        setFullData(data);
      })
      .catch((error) => {
        console.error("Error al obtener matriculas:", error);
      });
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

  const removeDiacritics = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredUsers = registrationData.filter((registration) => {
    const searchTermNormalized = removeDiacritics(searchTerm.toLowerCase());
    const searchTerms = searchTermNormalized.split(" ");
    const foundInProduct =
      registration.product &&
      registration.product.name &&
      removeDiacritics(registration.product.name.toLowerCase()).includes(
        searchTermNormalized
      );

    const foundInChildren =
      registration.children &&
      ((registration.children.name &&
        removeDiacritics(registration.children.name.toLowerCase()).includes(
          searchTermNormalized
        )) ||
        (registration.children.lastName &&
          removeDiacritics(
            registration.children.lastName.toLowerCase()
          ).includes(searchTermNormalized)));

    const foundInSearchTerms = searchTerms.every(
      (term) =>
        registration.children &&
        ((registration.children.name &&
          removeDiacritics(registration.children.name.toLowerCase()).includes(
            term
          )) ||
          (registration.children.lastName &&
            removeDiacritics(
              registration.children.lastName.toLowerCase()
            ).includes(term)))
    );

    return foundInProduct || foundInChildren || foundInSearchTerms;
  });

  const currentUsers: RegistrationData[] = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const getInscriptionsWithFiltersForm = async (values: any) => {
    try {
      setLoadingFilters(true);

      if (values.rangeTime) {
        values.startDate = values.rangeTime[0];
        values.endDate = values.rangeTime[1];
        if (values.startDate && values.endDate) {
          values.startDate = new Date(values.startDate.$d)
            .toISOString()
            .split("T")[0];
          values.endDate = new Date(values.endDate.$d)
            .toISOString()
            .split("T")[0];
        }
      }
      delete values.rangeTime;
      console.log(values.startDate, values.endDate);

      const selectedProductIds = [];
      if (!values.productIds) {
        values.productIds = [];
      } else {
        for (const name of values.productIds) {
          const ids = fullData
            .filter((data) => data.product.name === name)
            .map((data) => data.product.id);
          selectedProductIds.push(...ids);
        }
      }

      const updatedValues = {
        ...values,
        productIds: selectedProductIds,
      };
      const response = await getInscriptionsWithFilters(updatedValues);
      setRegistrationData(response);
      setFilterValues(updatedValues);
    } catch (error) {
      console.error("Error al obtener matriculas con filtros:", error);
    } finally {
      setLoadingFilters(false);
    }
    onClose();
  };

  const downloadData = async () => {
    try {
      setLoadingExcel(true);
      console.log("filterValues", filterValues);
      await generateExcel(filterValues);
    } catch (error) {
      console.error("Error al descargar matriculas:", error);
    } finally {
      setLoadingExcel(false);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const inscriptionDateFormated = (inscriptionDate: string) => {
    const date = new Date(inscriptionDate.replace(/ PET/, ""));
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } else {
      return "Fecha inválida";
    }
  };

  const { RangePicker } = DatePicker;

  return (
    <div className="h-screen">
      <button
        onClick={showDrawer}
        className="sm:hidden bg-blue-400 hover:bg-blue-500 absolute bottom-10 right-12 p-3 border shadow-lg rounded-full z-30"
      >
        <BiSliderAlt className="text-white text-2xl" />
      </button>
      <div className="flex justify-between">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white">
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

        {/* Filtros */}
        {/* Por producto */}
        <Form
          layout="inline"
          className="flex gap-x-1"
          style={{ minWidth: 200 }}
          onFinish={getInscriptionsWithFiltersForm}
          form={form}
        >
          <Drawer title="Filtros" onClose={onClose} open={open}>
            <Form
              layout="inline"
              className="flex flex-col gap-y-4"
              style={{ minWidth: 200 }}
              onFinish={getInscriptionsWithFiltersForm}
            >
              <Form.Item name="productIds" className="text-black w-full">
                <Select
                  className="text-black"
                  placeholder="Filtrar por producto"
                  allowClear
                  showSearch
                  style={{ minWidth: 200 }} // Ajustar el ancho mínimo
                  mode="multiple"
                  onChange={async (selectedNames) => {
                    const selectedIds = [];
                    for (const name of selectedNames) {
                      const ids = fullData
                        .filter((data) => data.product.name === name)
                        .map((data) => data.product.id);
                      selectedIds.push(...ids);
                    }
                    await form.setFieldsValue({ productIds: selectedIds });
                  }}
                >
                  {fullData
                    .reduce((uniqueProducts: ProductType[], data) => {
                      if (
                        !uniqueProducts.some(
                          (product) => product.name === data.product.name
                        )
                      ) {
                        uniqueProducts.push(data.product);
                      }
                      return uniqueProducts;
                    }, [])
                    .map((product: ProductType) => (
                      <Select.Option
                        key={product.id}
                        value={product.name} // Ahora usamos el nombre como valor
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
                  placeholder="Filtrar por categoria"
                  allowClear
                  showSearch
                  style={{ minWidth: 200 }}
                  mode="multiple"
                >
                  {fullData
                    .reduce((uniqueCategories: any[], data) => {
                      data.product.categories.forEach((category) => {
                        if (
                          !uniqueCategories.some((c) => c.id === category.id)
                        ) {
                          uniqueCategories.push(category);
                        }
                      });
                      return uniqueCategories;
                    }, [])
                    .map((category: CategoryType) => (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              {/* Por sede */}
              <Form.Item name="campusesIds" className="text-black w-full">
                <Select
                  className="text-black"
                  placeholder="Filtrar por campus"
                  allowClear
                  showSearch
                  style={{ minWidth: 200 }}
                  mode="multiple"
                >
                  {fullData
                    .reduce((uniqueCampuses: any[], data) => {
                      data.product.campuses.forEach((campus) => {
                        if (!uniqueCampuses.some((c) => c.id === campus.id)) {
                          uniqueCampuses.push(campus);
                        }
                      });
                      return uniqueCampuses;
                    }, [])
                    .map((campus: CampusType) => (
                      <Select.Option key={campus.id} value={campus.id}>
                        {campus.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              {/* Por edades */}
              <Form.Item name="ages">
                <Select
                  mode="multiple"
                  placeholder="Filtrar por edad"
                  style={{ minWidth: 200 }}
                  options={Array.from({ length: 17 }, (_, i) => ({
                    label: `${i + 1} año(s)`,
                    value: `${i + 1}`,
                  }))}
                />
              </Form.Item>

              {/* Por grado */}
              <Form.Item name="grades">
                <Select
                  placeholder="Filtrar por grado"
                  mode="multiple"
                  style={{ minWidth: 200 }}
                  options={[
                    { value: "Nido", label: "Nido" },
                    { value: "Pre-Kinder", label: "Pre-Kinder" },
                    { value: "Kinder", label: "Kinder" },
                    { value: "1", label: "1er grado" },
                    { value: "2", label: "2do grado" },
                    { value: "3", label: "3er grado" },
                    { value: "4", label: "4to grado" },
                    { value: "5", label: "5to grado" },
                    { value: "6", label: "6to grado" },
                    { value: "7", label: "7mo grado / 1ero secundaria" },
                    { value: "8", label: "8vo grado / 2do secundaria" },
                    { value: "9", label: "9no grado / 3ero secundaria" },
                    { value: "10", label: "10mo grado / 4to secundaria" },
                    { value: "11", label: "11vo grado / 5to secundaria" },
                  ]}
                />
              </Form.Item>

              {/* Por sexo */}
              <Form.Item name="gender" className="text-black">
                <Select
                  placeholder="Filtrar por sexo"
                  mode="multiple"
                  style={{ minWidth: 200 }}
                  options={[
                    { value: "Masculino", label: "Masculino" },
                    { value: "Femenino", label: "Femenino" },
                    { value: "Mixto", label: "Mixto" },
                  ]}
                />
              </Form.Item>

              <Divider />

              {/* Tiempo rango */}
              <Form.Item name="rangeTime" className="text-black">
                <RangePicker
                  placeholder={["Fecha de inicio", "Fecha de fin"]}
                  className="w-full"
                />
              </Form.Item>

              {/* Botón de descarga */}
              <div className="flex items-center justify-between max-sm:flex-col">
                <Form.Item className="max-sm:w-full">
                  <button type="submit" className="rounded-md p-1 w-full">
                    {loadingFilters ? (
                      <div className="flex items-center justify-center gap-x-2 border hover:border-blue-500 rounded-lg px-4 py-2 hover:text-blue-500">
                        <Spin indicator={<LoadingOutlined />} />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-x-2 border hover:border-blue-500 rounded-lg px-4 py-2 hover:text-blue-500">
                        <IoSend className="text-xl" />
                        <span>Aplicar filtros</span>
                      </div>
                    )}
                  </button>
                </Form.Item>

                <Form.Item className="max-sm:w-full">
                  <Tooltip title="Primero debes filtrar." placement="bottom">
                    <button
                      className="rounded-md p-1 w-full"
                      onClick={() => downloadData()}
                    >
                      {loadingExcel ? (
                        <div className="flex items-center justify-center gap-x-2 border hover:border-blue-500 rounded-lg px-4 py-2 hover:text-blue-500">
                          <Spin indicator={<LoadingOutlined />} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-x-2 border hover:border-green-600 rounded-lg px-4 py-2 hover:text-green-600">
                          <IoDownload className="text-xl" />
                          <span>Exportar a Excel</span>
                        </div>
                      )}
                    </button>
                  </Tooltip>
                </Form.Item>
              </div>
            </Form>
          </Drawer>
        </Form>

        {/* Drawer */}
        <Button
          onClick={showDrawer}
          className="flex items-center gap-x-1 px-6 max-sm:hidden"
        >
          <BiSliderAlt />
          <h2 className="text-sm">Filtros</h2>
        </Button>

        {/* Drawer */}
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
          <ReturnModal
            id={seeId}
            open={openReturnModal}
            setOpen={setOpenReturnModal}
            handleReload={handleReload}
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
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {inscriptionDateFormated(user.inscriptionDate)}
                </td>
                <td className="px-6 py-4">{user.product.name}</td>
                <td className="px-6 py-4">
                  {user.product.campuses.map((campus, index) => (
                    <span key={campus.id}>
                      {campus.name}
                      {index !== user.product.campuses.length - 1 && ", "}
                    </span>
                  ))}
                  {" / "}
                  {user.product.categories.map((category: any, index: any) => (
                    <span key={category.id}>
                      {category.name}
                      {index !== user.product.categories.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-1">
                    <span>{user.children.name}</span>
                    <span>{user.children.lastName}</span>
                    <span>{user.children.motherLastName}</span>
                  </div>
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
                  <Tooltip title="Devolver">
                    <button
                      className="bg-slate-300 rounded-md p-1"
                      onClick={() => openCreateReturnModal(user.id)}
                    >
                      <FaShoppingBag className="text-xl text-gray-700" />
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
