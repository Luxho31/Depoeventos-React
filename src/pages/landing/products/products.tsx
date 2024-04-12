import { useEffect, useState } from "react";
import ModalProduct from "../../../components/modal-product/modal-product";
import { getAllCampuses } from "../../../services/campuses-service";
import { getAllCategories } from "../../../services/categories-service";
import { getAllProducts } from "../../../services/products-service";

import { LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Collapse, Drawer, Input, Slider, Spin } from "antd";
import { BiSliderAlt } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import ProductCard from "../../../components/product-card/product-card";
const { Panel } = Collapse;

type Product = {
  coursesWithSchedules: any;
  id: number;
  photo: string;
  name: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  campus: Campus;
  category: Category;
  startDateInscription: string;
  endDateInscription: string;
  courses: Course[];
  children: Children;
  gender: string;
  ages: string[];
  grades: string[];
};

type Campus = {
  some: any;
  id: number;
  name: string;
  description: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
};

type Course = {
  id: number;
  name: string;
  description: string;
};

type Children = {
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
  selected: boolean;
};

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [productData, setProductData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [categoryData, setCategoryData] = useState([]);
  const [campusData, setCampusData] = useState([]);
  const [selectedHours, setSelectedHours] = useState<[string, string]>(["00:00", "23:59"]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCampuses, setSelectedCampuses] = useState<number[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<number[]>([1, 18]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [endTimeEnabled, setEndTimeEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllProducts(), getAllCategories(), getAllCampuses()])
      .then(([products, categories, campuses]) => {
        setProductData(products);
        setFilteredData(products);
        setCategoryData(categories);
        setCampusData(campuses);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Función para manejar el cambio en el tamaño de la ventana
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth >= 1024) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const applyFilters = () => {
    let filtered = [...productData];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category.id)
      );
    }

    if (selectedCampuses.length > 0) {
      filtered = filtered.filter((product) =>
        product.campus.some((campus: any) => selectedCampuses.includes(campus.id))
      );
    }

    if (selectedGrades.length > 0) {
      filtered = filtered.filter((product) =>
        product.grades.some((grade) => selectedGrades.includes(grade))
      );
    }
    filtered = filtered.filter((product) =>
      product.ages.some((age) => {
        const ageNumber = parseInt(age);
        return ageNumber >= selectedAges[0] && ageNumber <= selectedAges[1];
      })
    );

    filtered = filtered.filter((product) =>
      product.coursesWithSchedules.some((course: any) =>
        course.schedules.some((schedule: any) => {
          const startHour = schedule.startHour;
          const selectedStartHour = selectedHours[0];
          const selectedEndHour = selectedHours[1] || '23:59';

          console.log("Horario de inicio", startHour)
          console.log("Horario seleccionado", selectedStartHour)
          console.log("Horario seleccionado fin", selectedEndHour)

          return startHour >= selectedStartHour && schedule.endHour <= selectedEndHour;
        })
      )
    );
    console.log("Filtrado por horario", filtered)

    setFilteredData(filtered);
    onClose();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const resetFilter = () => {
    setFilteredData(productData);

    setSelectedCategories([]);
    setSelectedCampuses([]);
    setSelectedGrades([]);
    setSelectedAges([1, 18]);
    setEndTimeEnabled(false);
    setSelectedHours(["00:00", "23:59"]);
  };

  return (
    <div className="mt-20 mb-24 lg:mt-20 lg:w-[80%] w-full px-8 min-h-[84vh] m-auto">
      <h1 className="text-2xl font-semibold mb-8 text-center lg:text-left">
        Productos
      </h1>

      <div className="flex flex-col lg:flex-row lg:gap-x-8">
        <div className="w-full lg:w-auto lg:min-w-[300px]">
          <div className="flex justify-between mb-4 select-none">
            <button
              className="max-lg:w-full flex justify-center items-center gap-x-2 lg:justify-between rounded-tl-lg rounded-bl-lg p-2 max-lg:border-2 transition max-lg:hover:bg-neutral-200"
              onClick={showDrawer}
              disabled={windowWidth >= 1024 ? true : false}
            >
              <BiSliderAlt className="max-sm:hidden" />
              <h2 className="text-sm">Filtros</h2>
            </button>
            <button
              onClick={resetFilter}
              className="max-lg:w-full flex justify-center items-center gap-x-2 lg:justify-end rounded-tr-lg rounded-br-lg lg:rounded-lg p-2 max-lg:border-2 transition hover:bg-neutral-200"
            >
              <IoReload className="max-sm:hidden" />
              <span className="text-sm lg:hidden">Resetear Filtros</span>
            </button>
          </div>

          <div className="hidden lg:block">
            <Collapse defaultActiveKey={[]}>
              <Panel header="Categorías" key="1">
                <Checkbox.Group

                  value={selectedCategories}
                  className="flex flex-col gap-y-2 sm:gap-y-4"
                  onChange={(values) => setSelectedCategories(values)}
                >
                  {categoryData.map((category: Category) => (
                    <Checkbox key={category.id} value={category.id}>
                      {category.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Panel>

              <Panel header="Sedes" key="2">
                <Checkbox.Group
                  value={selectedCampuses}
                  className="flex flex-col gap-y-2 sm:gap-y-4"
                  onChange={(values) => {
                    setSelectedCampuses(values);
                    console.log(values)
                  }}
                >
                  {campusData.map((campus: Campus) => (
                    <Checkbox key={campus.id} value={campus.id}>
                      {campus.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Panel>

              <Panel header="Grados" key="3">
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  <Checkbox.Group
                    value={selectedGrades}
                    className="flex flex-col gap-y-2 sm:gap-y-4"
                    onChange={(values) => setSelectedGrades(values)}
                  >
                    <Checkbox value="Nido">Nido</Checkbox>
                    <Checkbox value="Pre-Kinder">Pre-Kinder</Checkbox>
                    <Checkbox value="Kinder">Kinder</Checkbox>
                    {[...Array(12).keys()].map((index) => (
                      <Checkbox
                        key={`grade-${index + 1}`}
                        value={`${index + 1}ro grado`}
                      >
                        {`${index + 1}ro grado`}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </div>
              </Panel>
              <Panel header="Edades" key="4">
                <Slider
                  range
                  min={1}
                  max={18}
                  value={selectedAges}
                  onChange={(values) => setSelectedAges(values)}
                />
                <p>
                  Edad: {selectedAges[0]}-{selectedAges[1]}
                </p>
              </Panel>
              <Panel header="Horarios" key="5">
                <div className="flex flex-col gap-y-2 sm:gap-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="startHour">Hora de inicio:</label>
                    <button onClick={() => {
                      setEndTimeEnabled(false);
                      setSelectedHours(["00:00", "23:59"]);
                    }}>
                      <IoReload />
                    </button>
                  </div>
                  <Input
                    type="time"
                    id="startHour"
                    value={selectedHours[0]}
                    onChange={(e) => setSelectedHours([e.target.value, selectedHours[1]])}
                  />
                  <div className="flex items-center gap-x-2">
                    <label htmlFor="endHour">Hora de fin:</label>
                    <Checkbox checked={endTimeEnabled} onChange={() => setEndTimeEnabled(!endTimeEnabled)} />
                  </div>
                  <Input
                    type="time"
                    id="endHour"
                    value={selectedHours[1]}
                    onChange={(e) => setSelectedHours([selectedHours[0], e.target.value])}
                    disabled={!endTimeEnabled}
                  />
                </div>
                <p>
                  Horario seleccionado: {selectedHours[0]} - {selectedHours[1] || "Desde la hora de inicio"}
                </p>
              </Panel>

            </Collapse>

            <div className="flex items-center justify-center mt-5">
              <button
                onClick={applyFilters}
                className="w-full border rounded-md py-2 hover:border-blue-400 hover:transition-all"
              >
                Aplicar
              </button>
            </div>
          </div>

          <Drawer
            title="Filtros Productos"
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            style={{ position: "relative" }}
          >
            {/* Botón de cerrar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                marginTop: "15px",
                marginRight: "15px",
              }}
            >
              <button onClick={onClose}>
                <IoIosClose className="text-3xl text-neutral-400 hover:text-neutral-500" />
              </button>
            </div>

            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Categorías" key="1">
                <Checkbox.Group
                  value={selectedCategories}
                  className="flex flex-col gap-y-2 sm:gap-y-4"
                  onChange={(values) => setSelectedCategories(values)}
                >
                  {categoryData.map((category: Category) => (
                    <Checkbox key={category.id} value={category.id}>
                      {category.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Panel>
              <Panel header="Sedes" key="2">
                <Checkbox.Group
                  value={selectedCampuses}
                  className="flex flex-col gap-y-2 sm:gap-y-4"
                  onChange={(values) => setSelectedCampuses(values)}
                >
                  {campusData.map((campus: Campus) => (
                    <Checkbox key={campus.id} value={campus.id}>
                      {campus.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Panel>
              <Panel header="Grados" key="3">
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  <Checkbox.Group
                    value={selectedGrades}
                    className="flex flex-col gap-y-2 sm:gap-y-4"
                    onChange={(values) => setSelectedGrades(values)}
                  >
                    <Checkbox value="Nido">Nido</Checkbox>
                    <Checkbox value="Pre-Kinder">Pre-Kinder</Checkbox>
                    <Checkbox value="Kinder">Kinder</Checkbox>
                    {[...Array(12).keys()].map((index) => (
                      <Checkbox
                        key={`grade-${index + 1}`}
                        value={`${index + 1}ro grado`}
                      >
                        {`${index + 1}ro grado`}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </div>
              </Panel>
              <Panel header="Edades" key="4">
                <Slider
                  range
                  min={1}
                  max={18}
                  value={selectedAges}
                  onChange={(values) => setSelectedAges(values)}
                />
                <p>
                  Edad: {selectedAges[0]}-{selectedAges[1]}
                </p>
              </Panel>
              <Panel header="Horarios" key="5">
                <div className="flex flex-col gap-y-2 sm:gap-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="startHour">Hora de inicio:</label>
                    <button onClick={() => {
                      setEndTimeEnabled(false);
                      setSelectedHours(["00:00", "23:59"]);
                    }}>
                      <IoReload />
                    </button>
                  </div>
                  <Input
                    type="time"
                    id="startHour"
                    value={selectedHours[0]}
                    onChange={(e) => setSelectedHours([e.target.value, selectedHours[1]])}
                  />
                  <div className="flex items-center gap-x-2">
                    <label htmlFor="endHour">Hora de fin:</label>
                    <Checkbox checked={endTimeEnabled} onChange={() => setEndTimeEnabled(!endTimeEnabled)} />
                  </div>
                  <Input
                    type="time"
                    id="endHour"
                    value={selectedHours[1]}
                    onChange={(e) => setSelectedHours([selectedHours[0], e.target.value])}
                    disabled={!endTimeEnabled}
                  />
                </div>
                <p>
                  Horario seleccionado: {selectedHours[0]} - {selectedHours[1] || "Desde la hora de inicio"}
                </p>
              </Panel>
            </Collapse>

            <div className="flex items-center justify-center mt-5">
              <button
                onClick={applyFilters}
                className="w-full border rounded-md py-2 hover:border-blue-400 hover:transition-all"
              >
                Aplicar
              </button>
            </div>
          </Drawer>
        </div>
        <div className="w-full lg:flex-1">
          {loading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          ) : (
            <>
              {filteredData.length || productData.length ? (
                <h2 className="text-md text-gray-400 mb-4">
                  Se encontraron {filteredData.length} elementos
                </h2>
              ) : null}
              <div className="grid grid-cols-1 min-[820px]:grid-cols-2 lg:grid-cols-2 min-[1750px]:grid-cols-4 min-[1920px]:grid-cols-5 gap-8">
                {filteredData.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleCardClick(product)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {selectedProduct && (
        <ModalProduct product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}
