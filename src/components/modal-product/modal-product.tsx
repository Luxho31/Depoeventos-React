import { InfoCircleOutlined } from "@ant-design/icons";
import { Select, Tooltip } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCartPlus, FaCheck, FaHome, FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";
import { getChildrensByUserId } from "../../services/children-service";

type Product = {
    id: number;
    photo: string;
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
    children: Children;
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

type ModalProps = {
    product: Product;
    onClose: () => void;
};

export default function ModalProduct({ product, onClose }: ModalProps) {
    const { isAuthenticated, cargando } = useAuth();
    const { addToCart } = useCart();
    const [children, setChildren] = useState<Children[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChildren = async () => {
            const children = await getChildrensByUserId();
            setChildren(children);
            console.log(product);
        };
        fetchChildren();
    }, []);

    if (cargando) {
        return "cargando...";
    }

    const handleChange = (selectedValues: string[]) => {
        // Actualizar el estado de los hijos para marcar si están seleccionados o no
        const updatedChildren: Children[] = children.map((child: Children) => ({
            ...child,
            selected: selectedValues.includes(child.name), // Marcar como seleccionado si el nombre está en los valores seleccionados
        }));

        // Actualizar el estado de los hijos seleccionados
        setChildren(updatedChildren);
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            onClose();
            navigate("/login");
        } else {
            const selectedChildrenIds = children
                .filter((child: Children) => child.selected)
                .map((selectedChild: Children) => selectedChild.id);

            if (selectedChildrenIds.length === 0) {
                console.error("No se han seleccionado hijos");
                return;
            }

            addToCart(product, selectedChildrenIds);
            onClose();
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-white rounded-lg w-[60rem] h-[60%] relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    X
                </button>
                <div className="flex h-full">
                    <div className="w-[40%] max-sm:hidden">
                        <img
                            className="w-full h-full border-md object-cover object-center p-4"
                            src={product.photo}
                            alt={product.name}
                        />
                    </div>
                    <div className="flex flex-col justify-between w-[60%] max-sm:w-full px-10 py-10">
                        <div className="flex justify-between items-center p-4 mb-4">
                            <div className="text-gray-900 font-bold text-3xl flex items-center gap-x-2">
                                <Tooltip
                                    title={`Cupos disponibles: ${product.maxStudents}`}
                                    placement="top"
                                >
                                    <InfoCircleOutlined className="text-base text-gray-500" />
                                </Tooltip>
                                <h2>{product.name}</h2>
                            </div>

                            <p className="text-green-700 font-bold text-2xl">
                                ${product.price}
                            </p>
                        </div>

                        <div className="mb-4 flex items-center gap-x-2">
                            <FaHome className="text-gray-600 text-lg" />
                            <p className="text-gray-600 text-lg">
                                {product.campus.name} - {product.category.name}
                            </p>
                        </div>
                        <ul className="px-8 py-4">
                            {product.courses.map((course) => (
                                <li
                                    key={course.id}
                                    className="flex items-center mb-4"
                                >
                                    <FaCheck className="text-green-700" />
                                    <p className="ms-4 text-lg font-bold">
                                        {course.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <div className="mb-4">
                            <p className="text-gray-600 text-lg">
                                Inicio de clases: {product.startDate}
                            </p>
                        </div>
                        {/* <div className="mb-4">
              <p className="text-gray-600 text-lg">
                
              </p>
            </div> */}
                        {isAuthenticated ? (
                            <div className="flex items-center">
                                <label htmlFor="" className="me-2">
                                    Alumnos:
                                </label>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    className="w-full h-10"
                                    placeholder="Por favor, selecciona los hijos a matricular"
                                    onChange={handleChange}
                                    value={children
                                        .filter((child: Children) => child.selected)
                                        .map((child: Children) => child.name)} // Especificar los valores seleccionados
                                    options={children.map((child: Children) => ({
                                        value: child.name,
                                        label: child.name,
                                    }))}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="flex justify-center">
                            <button
                                className={
                                    children.length > 0
                                        ? "flex items-center bg-blue-500 px-10 py-3 rounded-lg text-white hover:bg-blue-600"
                                        : "flex items-center bg-blue-500 px-10 py-3 rounded-lg text-white hover:bg-blue-600"
                                }
                                onClick={
                                    children.length > 0
                                        ? handleAddToCart
                                        : () => navigate("/dashboard/childrens")
                                }
                            >
                                {isAuthenticated ? (
                                    <FaCartPlus className="me-2 text-lg" />
                                ) : (
                                    <FaUserLock className="me-2 text-lg" />
                                )}
                                {isAuthenticated
                                    ? children.length > 0
                                        ? "Agregar al carrito"
                                        : "No tienes hijos registrados"
                                    : "Inicia sesión para comprar"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
