import { useEffect, useState } from "react";
import CardProduct from "../../../components/card-product/card-product";
import ModalProduct from "../../../components/modal-product/modal-product";
import { getAllProducts } from "../../../services/products-service";
import { getAllCategories } from "../../../services/categories-service";
import { useAuth } from "../../../context/AuthProvider";
import { getAllCampuses } from "../../../services/campuses-service";

import { Checkbox, Collapse, Button } from "antd";
import ProductCard from "../../../components/product-card/product-card";
const { Panel } = Collapse;

type Product = {
  id: number;
  // image: string;
  name: string;
  price: number;
  description: string;
  startDate: string;
  maxStudents: number;
  campus: {
    id: number;
    name: string;
    description: string;
  };
  category: {
    id: number;
    name: string;
    description: string;
  };
  startDateInscription: string;
  endDateInscription: string;
  courses: Course[];
};

type Course = {
  id: number;
  name: string;
  description: string;
};

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [campusData, setCampusData] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedCampusId, setSelectedCampusId] = useState(0);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCampuses, setSelectedCampuses] = useState<number[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProductData(data);
        setFilteredData(data)
        console.log("Productos obtenidos:", data);
      })
      .catch((error) => {
        console.error("Error al obtener disciplinas:", error);
      });

    getAllCategories().then((data) => {
      setCategoryData(data);
      console.log("Categorias obtenidas:", data);
    }).catch(error => {
      console.error("Error al obtener categorías:", error);
    });

    getAllCampuses().then((data) => {
      setCampusData(data);
      console.log("Sedes obtenidas:", data);
    }).catch(error => {
      console.error("Error al obtener sedes:", error);
    });
  }, []);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    console.log("Producto seleccionado:", product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // const handleFilterCategory = (categoryId: number) => {
  //   if (categoryId === 0) {
  //     console.log("Ingreso a categoryId = 0");
  //     setFilteredData(productData)
  //   } else {
  //     const filtered = productData.filter((product: Product) => product.category.id === categoryId);
  //     setFilteredData(filtered);
  //   }
  // };

  // const handleFilterCampus = (campusId: number) => {
  //   if (campusId === 0) {
  //     console.log("Ingreso a campusId = 0");
  //     setFilteredData(productData)
  //   } else {
  //     const filtered = productData.filter((product: Product) => product.campus.id === campusId);
  //     setFilteredData(filtered);
  //   }
  // };

  const applyFilters = () => {
    let filtered = productData;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product: Product) =>
        selectedCategories.includes(product.category.id)
      );
    }

    if (selectedCampuses.length > 0) {
      filtered = filtered.filter((product: Product) =>
        selectedCampuses.includes(product.campus.id)
      );
    }

    setFilteredData(filtered);
  };

  const resetFilter = () => {
    console.log("Ingreso a categoryId = 0");
    setFilteredData(productData)
    const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement | null;
    const campusSelect = document.getElementById("campusSelect") as HTMLSelectElement | null;

    // Verifica si los elementos existen antes de asignarles valores
    setSelectedCategories([]);
    setSelectedCampuses([]);
  }

  return (
    <div className="mt-20 w-[80%] m-auto">
      <h1 className="text-3xl font-bold mb-8">Productos</h1>

      <div className="flex gap-x-24">
        <div className="w-96">
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Categorías" key="1">
              <Checkbox.Group
                value={selectedCategories}
                onChange={(values) => setSelectedCategories(values)}
              >
                {categoryData.map((category: any) => (
                  <Checkbox key={category.id} value={category.id}>
                    {category.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Panel>
            <Panel header="Sedes" key="2">
              <Checkbox.Group
                value={selectedCampuses}
                onChange={(values) => setSelectedCampuses(values)}
              >
                {campusData.map((campus: any) => (
                  <Checkbox key={campus.id} value={campus.id}>
                    {campus.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Panel>
          </Collapse>

          {/* Boton Resetear Filtros */}
          <div className="flex justify-between mt-8">
            <button onClick={applyFilters} className="border w-40 text-black border-blue-500  rounded-lg py-2 px-4 hover:bg-blue-400">Aplicar</button>
            <button onClick={resetFilter} className="border w-fit border-red-500 text-black rounded-lg py-1 px-2 hover:bg-red-400">Reset</button>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredData.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))}
          {filteredData.length === 0 ? (
            <h2>Se encontraron {filteredData.length} elementos</h2>
          ) : ("")}
        </div>
        {selectedProduct && (
          <ModalProduct product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
