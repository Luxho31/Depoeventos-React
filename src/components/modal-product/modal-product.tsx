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
  grades: any;
  ages: any;
  id: number;
  photo: string;
  name: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  campus: {
    map(arg0: (campus: any) => any): unknown;
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

  const courseNames = product.courses.map((course) => course.name);
  const campusNames: string[] = (
    product.campus as unknown as { name: string }[]
  ).map((campus) => campus.name);

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
              <div className="text-gray-900 font-bold text-3xl flex items-center gap-x-2 max-sm: ">
                <div className="flex items-center justify-center max-sm:hidden">
                  <Tooltip
                    title={`Cupos disponibles: ${
                      product.maxStudents - product.currentStudents
                    }`}
                    placement="top"
                  >
                    <InfoCircleOutlined className="text-base text-gray-500" />
                  </Tooltip>
                </div>
                <h2 className="text-xl">{product.name}</h2>
              </div>

              <p className="text-green-700 font-bold text-xl">
                ${product.price}
              </p>
            </div>
            <ul className=" text-gray-400 text-md list-disc max-sm:text-xs ">
              <li>
                Se enseñan los siguientes cursos: {courseNames.join(", ")}.
              </li>
              <li>
                {product.courses.length > 1
                  ? "Los cursos son impartidos en: "
                  : "El curso es impartido en: "}
                {campusNames.join(", ")} ({product.category.name}) y comprende
                los siguientes grados {product.grades.join(", ")} (
                {product.ages
                  .sort((a: number, b: number) => a - b)
                  .map((age: number, index: number, array: number[]) => {
                    if (index === array.length - 1) {
                      return age + " años";
                    } else {
                      return age + " años, ";
                    }
                  })
                  .join(" ")}
                ).
              </li>
            </ul>
            <div className="mb-4 flex justify-around gap-y-2 max-sm: mt-3">
              <div className="flex gap-x-2 text-gray-600 text-sm max-sm:text-xs max-sm:flex-col">
                <p className="font-semibold">Inicio de clases:</p>
                <p>{product.startDate}</p>
              </div>

              <div className="flex gap-x-2 text-gray-600 text-sm max-sm:text-xs max-sm:flex-col">
                <p className="font-semibold">Fin de clases:</p>
                <p>{product.endDate}</p>
              </div>
            </div>
            {isAuthenticated ? (
              <div className="flex items-center mb-5">
                <label htmlFor="" className="me-2 max-sm:text-[0.75rem]">
                  Alumnos:
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  className="w-full h-10"
                  placeholder="Selecciona los hijos a matricular"
                  onChange={handleChange}
                  value={children
                    .filter((child: Children) => child.selected)
                    .map((child: Children) => child.name)}
                  options={children.map((child: Children) => ({
                    value: child.name,
                    label: child.name,
                  }))}
                  // Agregar la clase text-sm solo en dispositivos sm o más pequeños
                  rootClassName="max-sm:text-xs"
                />
              </div>
            ) : (
              <></>
            )}
            <div className="flex justify-center ">
              <button
                className={
                  children.length > 0
                    ? "flex items-center bg-blue-500 px-10 py-3 rounded-lg text-white hover:bg-blue-600 max-sm:text-sm max-sm:px-4 max-sm:py-2"
                    : "flex items-center bg-blue-500 px-10 py-3 rounded-lg text-white hover:bg-slate-600 max-sm:text-sm max-sm:px-4 max-sm:py-2"
                }
                onClick={
                  isAuthenticated
                    ? children.length > 0
                      ? handleAddToCart
                      : () => navigate("/dashboard/childrens")
                    : () => navigate("/login")
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
