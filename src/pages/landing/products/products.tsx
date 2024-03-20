import { useEffect, useState } from "react";
import ModalProduct from "../../../components/modal-product/modal-product";
import { getAllCampuses } from "../../../services/campuses-service";
import { getAllCategories } from "../../../services/categories-service";
import { getAllProducts } from "../../../services/products-service";

import { Checkbox, Collapse } from "antd";
import { IoFilter } from "react-icons/io5";
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
  children: any;
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

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCampuses, setSelectedCampuses] = useState<number[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        // const currentDate = new Date();
        // const filteredProducts = data.filter((product: Product) => {
        //   const startDate = new Date(product.startDate);
        //   const endDate = new Date(startDate);
        //   endDate.setMonth(endDate.getMonth() + 6);
        //   return currentDate >= startDate && currentDate <= endDate;
        // });
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

  // const handleFilterCategory = (categoryId: number) => {
  //   if (categoryId === 0) {
  //     setFilteredData(productData)
  //   } else {
  //     const filtered = productData.filter((product: Product) => product.category.id === categoryId);
  //     setFilteredData(filtered);
  //   }
  // };

  // const handleFilterCampus = (campusId: number) => {
  //   if (campusId === 0) {
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
    setFilteredData(productData);

    // Verifica si los elementos existen antes de asignarles valores
    setSelectedCategories([]);
    setSelectedCampuses([]);
  };

  return (
    <div className="mt-20 w-[80%] min-h-[84vh] m-auto">
      <h1 className="text-3xl font-bold mb-8">Productos</h1>

      <div className="flex gap-x-24">
        <div className="w-96">
          <div className="flex items-center gap-x-2 mb-4 select-none">
            <h2 className="text-lg font-semibold">Filtros</h2>
            <IoFilter />
          </div>
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Categorías" key="1">
              <Checkbox.Group
                value={selectedCategories}
                className="flex flex-col gap-y-4"
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
                className="flex flex-col gap-y-4"
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
            <button
              onClick={applyFilters}
              className="border w-40 text-black border-blue-500  rounded-lg py-2 px-4 hover:bg-blue-400"
            >
              Aplicar
            </button>
            <button
              onClick={resetFilter}
              className="border w-fit border-red-500 text-black rounded-lg py-1 px-2 hover:bg-red-400"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full h-full">
          {filteredData.length && (
            <h2 className="text-lg font-semibold mb-4">
              Se encontraron {filteredData.length} elementos
            </h2>
          )}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredData.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleCardClick(product)}
              />
            ))}
            {/* {filteredData.length === 0 ? (
                        <h2>Se encontraron {filteredData.length} elementos</h2>
                    ) : (
                        ""
                    )} */}
          </div>
        </div>
        {selectedProduct && (
          <ModalProduct product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
