import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";

type Product = {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    // Otros campos del producto desde el backend
};

type ModalProps = {
    product: Product;
    onClose: () => void;
};

export default function ModalProduct({ product, onClose }: ModalProps) {
    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-white rounded-lg w-[60rem] h-[60%] relative">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
                    X
                </button>
                <div className="flex h-full">
                    <div className="w-[40%]">
                        <img className="w-full h-full object-cover object-center p-4" src={product.image} alt={product.title} />
                    </div>
                    <div className="flex flex-col justify-between w-[60%] px-10 py-10">
                        <div className="flex justify-between items-center h-32">
                            <h2 className="text-gray-900 font-bold text-3xl">{product.title}</h2>
                            <p className="text-gray-700 font-bold text-3xl">${product.price}</p>
                        </div>
                        <div className="h-full">
                            <p className="text-gray-600 text-base">{product.description}</p>
                        </div>
                        <div className="flex justify-end">
                            <button className="flex items-center bg-blue-500 px-10 py-3 rounded-lg text-white hover:bg-blue-600">
                                <FaCartPlus className="me-2 text-lg" />
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
