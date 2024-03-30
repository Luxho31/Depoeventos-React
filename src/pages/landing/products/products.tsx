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
    photo: string;
    name: string;
    price: number;
    description: string;
    startDate: string;
    maxStudents: number;
    campus: Campus;
    category: Category;
    startDateInscription: string;
    endDateInscription: string;
    courses: Course[];
    children: Children;
};

type Campus = {
    id: number;
    name: string;
    description: string;
}

type Category = {
    id: number;
    name: string;
    description: string;
}

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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const [productData, setProductData] = useState<Product[]>([]);
    const [filteredData, setFilteredData] = useState<Product[]>([]);
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



    const applyFilters = () => {
        let filtered = productData;

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

        setFilteredData(filtered);
    };

    const resetFilter = () => {
        setFilteredData(productData);

        // Verifica si los elementos existen antes de asignarles valores
        setSelectedCategories([]);
        setSelectedCampuses([]);
    };

    return (
        <div className="mt-8 mb-24 lg:mt-20 w-[80%] max-xl:w-full max-xl:px-16 min-h-[84vh] m-auto">
            <h1 className="text-3xl font-bold mb-8 text-center lg:text-left">
                Productos
            </h1>

            <div className="flex flex-col min-[1180px]:flex-row lg:gap-x-8">
                <div className="w-full lg:w-auto lg:min-w-[300px]">
                    <div className="flex items-center justify-between mb-4 select-none">
                        <h2 className="text-lg font-semibold">Filtros</h2>
                        <IoFilter />
                    </div>
                    <Collapse defaultActiveKey={["1"]}>
                        <Panel header="Categorías" key="1">
                            <Checkbox.Group
                                value={selectedCategories}
                                className="flex flex-col gap-y-2 sm:gap-y-4"
                                onChange={(values) =>
                                    setSelectedCategories(values)
                                }
                            >
                                {categoryData.map((category: Category) => (
                                    <Checkbox
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>
                        </Panel>
                        <Panel header="Sedes" key="2">
                            <Checkbox.Group
                                value={selectedCampuses}
                                className="flex flex-col gap-y-2 sm:gap-y-4"
                                onChange={(values) =>
                                    setSelectedCampuses(values)
                                }
                            >
                                {campusData.map((campus: Campus) => (
                                    <Checkbox key={campus.id} value={campus.id}>
                                        {campus.name}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>
                        </Panel>
                    </Collapse>

                    <div className="flex flex-col sm:flex-row justify-between mt-8">
                        <button
                            onClick={applyFilters}
                            className="border w-full sm:w-auto text-center sm:text-left border-blue-500 rounded-lg py-2 px-4 mb-4 sm:mb-0 sm:mr-4 hover:bg-blue-400"
                        >
                            Aplicar
                        </button>
                        <button
                            onClick={resetFilter}
                            className="border w-full sm:w-auto text-center sm:text-left border-red-500 rounded-lg py-1 px-2 hover:bg-red-400"
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div className="w-full lg:flex-1">
                    {filteredData.length && (
                        <h2 className="text-lg font-semibold mb-4">
                            Se encontraron {filteredData.length} elementos
                        </h2>
                    )}
                    <div className="grid grid-cols-1 min-[820px]:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 min-[1750px]:grid-cols-3 gap-8">
                        {filteredData.map((product: Product) => (
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
                <ModalProduct
                    product={selectedProduct}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
