import { useEffect, useState } from "react";
import CardProduct from "../../../components/card-product/card-product";
import ModalProduct from "../../../components/modal-product/modal-product";
import { getAllProducts } from "../../../services/products-service";
import { getAllCategories } from "../../../services/categories-service";
import { useAuth } from "../../../context/AuthProvider";
import { getAllCampuses } from "../../../services/campuses-service";

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

    if (selectedCategoryId !== 0) {
      filtered = filtered.filter((product: Product) => product.category.id === selectedCategoryId);
    }

    if (selectedCampusId !== 0) {
      filtered = filtered.filter((product: Product) => product.campus.id === selectedCampusId);
    }

    setFilteredData(filtered);
  };

  const resetFilter = () => {
    console.log("Ingreso a categoryId = 0");
    setFilteredData(productData)
    const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement | null;
    const campusSelect = document.getElementById("campusSelect") as HTMLSelectElement | null;

    // Verifica si los elementos existen antes de asignarles valores
    if (categorySelect) {
      categorySelect.value = "0";
    }

    if (campusSelect) {
      campusSelect.value = "0";
    }
  }

  return (
    <div className="mt-20 w-[80%] m-auto">
      <h1 className="text-3xl font-bold mb-8">Productos</h1>
      <div>
        {/* Filtro por categoría */}
        <select id="categorySelect" onChange={(e) => setSelectedCategoryId(parseInt(e.target.value))}>
          <option value="0">Todas las categorías</option>
          {categoryData.map((category: any) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>

        {/* Filtro por campus */}
        <select id="campusSelect" onChange={(e) => setSelectedCampusId(parseInt(e.target.value))}>
          <option value="0">Todos los campus</option>
          {campusData.map((campus: any) => (
            <option value={campus.id}>{campus.name}</option>
          ))}
        </select>

        {/* Boton Resetear Filtros */}
        <button onClick={applyFilters} className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-400">Aplicar</button>
        <button onClick={resetFilter} className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-400">Resetear Filtros</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredData.map((product: any) => (
          <CardProduct
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
  );
}
