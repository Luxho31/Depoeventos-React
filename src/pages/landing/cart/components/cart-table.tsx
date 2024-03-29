import { FaInbox, FaRegTrashCan } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { useCart } from "../../../../context/CartProvider";
import { Popconfirm } from "antd";

export default function CartTable() {
    const { products, getTotalPrice, clearCart, removeProduct } = useCart();

    return (
        <div className="border rounded-3xl shadow-md p-8 ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Carrito</h2>
                {products.length > 0 && (
                    <Popconfirm
                        title="¿Estás seguro de que deseas limpiar el carrito?"
                        onConfirm={clearCart}
                        okText="Sí"
                        okButtonProps={{ className: "bg-blue-700" }}
                        cancelText="No"
                    >
                        <button className="bg-transparent text-red-500 flex items-center p-2 rounded">
                            <FaRegTrashCan className="me-2" />
                            <span>Limpiar carrito</span>
                        </button>
                    </Popconfirm>
                )}
            </div>
            <div className=" overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Producto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Alumno
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={product.photo}
                                            alt={product.name}
                                            className="w-20 h-auto bg-gray-300 rounded-xl"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.children.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        S/. {product.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <IoIosClose
                                            className="text-red-500 text-3xl cursor-pointer"
                                            onClick={() =>
                                                removeProduct(product.id)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="px-6 py-4 text-center whitespace-nowrap"
                                    col-span="5"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <FaInbox className="text-8xl text-gray-200" />
                                        <span className="text-gray-400">
                                            No hay elementos
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
                <p className="text-gray-500">Total:</p>
                <p className="text-xl font-bold">S/. {getTotalPrice()}</p>
            </div>
        </div>
    );
}
