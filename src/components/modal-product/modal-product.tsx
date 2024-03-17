import { Select, SelectProps } from "antd";
import { motion } from "framer-motion";
import { FaCartPlus, FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";

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

type Option = {
  value: string;
  label: string;
};

type ModalProps = {
  product: Product;
  onClose: () => void;
};

export default function ModalProduct({ product, onClose }: ModalProps) {
  const { isAuthenticated, cargando } = useAuth();
  const { addToCart } = useCart();

  if (cargando) {
    return "cargando...";
  }

  const navigate = useNavigate();

  const options: Option[] = [{ value: "hola", label: "hola" }];

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      onClose();
      navigate("/login");
    } else {
      console.log("Agregando al carrito:", product);
      addToCart(product);
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
          <div className="w-[40%]">
            <img
              className="w-full h-full object-cover object-center p-4"
              src="{product.product.image}"
              alt={product.name}
            />
          </div>
          <div className="flex flex-col justify-between w-[60%] px-10 py-10">
            <div className="flex justify-between items-center h-32">
              <h2 className="text-gray-900 font-bold text-3xl">
                {product.name}
              </h2>
              <p className="text-gray-700 font-bold text-3xl">
                ${product.price}
              </p>
            </div>
            <div className="">
              <p className="text-gray-600 text-base">{product.description}</p>
            </div>
            {isAuthenticated ? (
              <div className="flex items-center">
                <label htmlFor="" className="me-2">
                  Alumnos:
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Por favor, selecciona los hijos a matricular"
                  onChange={handleChange}
                  options={options}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="flex justify-center">
              <button
                className="flex items-center bg-blue-500 px-10 py-3 rounded-lg text-white hover:bg-blue-600"
                onClick={handleAddToCart}
              >
                {isAuthenticated ? (
                  <FaCartPlus className="me-2 text-lg" />
                ) : (
                  <FaUserLock className="me-2 text-lg" />
                )}
                {isAuthenticated
                  ? "Agregar al carrito"
                  : "Inicia sesión para comprar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
