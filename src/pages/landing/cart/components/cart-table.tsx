import { Empty, Popconfirm } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { useCart } from "../../../../context/CartProvider";

export default function CartTable() {
  const { products, getTotalPrice, clearCart, removeProduct } = useCart();

  function formatAges(ages: string[]): string {
    return ages
      .map((age) => `${age} ${parseInt(age) === 1 ? "año" : "años"}`)
      .join(", ");
  }

  function formatGrades(grades: string[]): string {
    const gradeNames: any = {
      "1": "1er grado",
      "2": "2do grado",
      "3": "3er grado",
      "4": "4to grado",
      "5": "5to grado",
      "6": "6to grado",
      "7": "7mo grado / 1ero secundaria",
      "8": "8vo grado / 2do secundaria",
      "9": "9no grado / 3ero secundaria",
      "10": "10mo grado / 4to secundaria",
      "11": "11vo grado / 5to secundaria",
      
      "Nido": "Nido",
      "Pre-kinder": "Pre-kinder",
      "Kinder": "Kinder",
    };

    return grades.map((grade: any) => gradeNames[grade] || grade).join(", ");
  }

  return (
    <div className="border rounded-3xl shadow-md p-8 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Carrito</h2>
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
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden"></th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alumno
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grado / Edad
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
                  {/* <td className="px-6 py-4 whitespace-nowrap max-sm:hidden">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="!h-14 !w-10 bg-gray-300 rounded-xl"
                    />
                  </td> */}

                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.children.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div>
                      <p>{formatGrades(product.grades)}
                      </p>
                      <p>{formatAges(product.ages)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    S/. {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <IoIosClose
                      className="text-red-500 text-3xl cursor-pointer"
                      onClick={() => removeProduct(product.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-6 py-4 text-center whitespace-nowrap"
                  colSpan={5}
                >
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No hay elementos"
                  />
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
