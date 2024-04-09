import { useEffect, useState } from "react";
import ModalProduct from "../../../components/modal-product/modal-product";
import { getAllCampuses } from "../../../services/campuses-service";
import { getAllCategories } from "../../../services/categories-service";
import { getAllProducts } from "../../../services/products-service";

import { Checkbox, Collapse, Slider } from "antd";
import { IoReload } from "react-icons/io5";
import ProductCard from "../../../components/product-card/product-card";
const { Panel } = Collapse;

type Product = {
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

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCampuses, setSelectedCampuses] = useState<number[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<number[]>([1, 18]);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProductData(data);
        setFilteredData(data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });

    getAllCategories()
      .then((data) => {
        setCategoryData(data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });

    getAllCampuses()
      .then((data) => {
        setCampusData(data);
      })
      .catch((error) => {
        console.error("Error al obtener sedes:", error);
      });
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
        selectedCampuses.includes(product.campus.id)
      );
    }

    if (selectedGrades.length > 0) {
      filtered = filtered.filter((product) =>
        product.grades.some((grade) => selectedGrades.includes(grade))
      );
    }
    filtered = filtered.filter((product) =>
      product.ages.some((age) => {
        const ageNumber = parseInt(age); // Convertir la edad de texto a número
        return ageNumber >= selectedAges[0] && ageNumber <= selectedAges[1];
      })
    );
    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setFilteredData(productData);

    setSelectedCategories([]);
    setSelectedCampuses([]);
    setSelectedGrades([]);
    setSelectedAges([1, 18]);
  };

  return (
    <div className="mt-8 mb-24 lg:mt-20 w-[80%] max-xl:w-full max-xl:px-16 min-h-[84vh] m-auto">
      <h1 className="text-2xl font-semibold mb-8 text-center lg:text-left">
        Productos
      </h1>

      <div className="flex flex-col min-[1180px]:flex-row lg:gap-x-8">
        <div className="w-full lg:w-auto lg:min-w-[300px]">
          <div className="flex items-center justify-between mb-4 select-none">
            <h2 className="text-sm font-semibold">Filtros</h2>
            <button
              onClick={resetFilter}
              className="w-full sm:w-auto text-center sm:text-left rounded-lg py-1 px-2 hover:bg-red-400"
            >
              <IoReload />
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
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
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
        <div className="w-full lg:flex-1">
          {filteredData.length | productData.length && (
            <h2 className="text-md text-gray-400 mb-4">
              Se encontraron {filteredData.length} elementos
            </h2>
          )}
          <div className="grid grid-cols-1 min-[820px]:grid-cols-2 lg:grid-cols-3 min-[1750px]:grid-cols-4 min-[1920px]:grid-cols-5 gap-8">
            {filteredData.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleCardClick(product)}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ModalProduct product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}
