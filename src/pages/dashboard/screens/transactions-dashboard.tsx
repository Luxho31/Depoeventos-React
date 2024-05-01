import { Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllOrders } from "../../../services/cart-service/cart-service";
import TransactionModal from "../modals/transactions-modals-dashboard";

type OrderData = any;

export default function TransactionsDashboard() {
  const [orderData, setOrderData] = useState<OrderData[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editId] = useState<number | undefined>(undefined);
  const [seeId, setSeeId] = useState<number | undefined>(undefined);
  const [openSeeModal, setOpenSeeModal] = useState(false);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { userRole } = useAuth();

  const navigate = useNavigate();

  const specificRole: string = "ADMIN";

  useEffect(() => {
    if (userRole && userRole.some((role) => role === specificRole)) {
      handleReload(0);
    } else {
      navigate("/dashboard");
    }
  }, [userRole]);

  useEffect(() => {
    const timeoutId = setTimeout(() => handleReload(currentPage), 400);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, currentPage]);

  const handleReload = (page: number) => {
    setLoading(true);
    getAllOrders(page, searchTerm)
      .then((data: any) => {
        setOrderData(data.content);
        setCurrentPage(page);
        setTotalElements(data.totalElements);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error reloading orders:", error);
        setLoading(false);
      });
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const openSeeTransactionModal = (id: number) => {
    setSeeId(id);
    setOpenSeeModal(true);
  };



  const validateStatus = (status: string) => {
    const basicStyle = "w-3 h-3 rounded-full";
    if (status === "PENDING") return basicStyle + " bg-gray-500";
    if (status === "SUCCESS") return basicStyle + " bg-green-500";
    if (status === "DENIED") return basicStyle + " bg-red-500";
  };



  return (
    <div className="h-screen">
      <TransactionModal
        type="edit"
        id={editId}
        open={openEditModal}
        setOpen={setOpenEditModal}
        handleReload={() => handleReload(currentPage)}
      />
      <TransactionModal
        type="see"
        id={seeId}
        open={openSeeModal}
        setOpen={setOpenSeeModal}
        handleReload={() => handleReload(currentPage)}
      />

      <div className="flex justify-between">
        <div className="flex flex-row items-center gap-x-2">
          <Input
            id="table-search-users"
            placeholder="Buscar por nombre, número de documento..."
            className="w-full rounded-xl p-1"
            size="small"
            prefix={<CiSearch className="site-form-item-icon me-1 ml-2" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex absolute right-20 max-sm:right-10">
            <h2>
              {/* <b>Total:</b> S/.{totalPriceSum} */}
            </h2>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Productos adquiridos
              </th>
              <th scope="col" className="px-6 py-3">
                Precio total
              </th>
              <th scope="col" className="px-6 py-3">
                Precio pagado
              </th>
              <th scope="col" className="px-6 py-3">
                Cupón
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Operaciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((user, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {user.user.firstName} {user.user.lastName}
                    </div>
                    <div className="font-normal text-gray-500">
                      {user.user.username}
                    </div>
                  </div>
                </th>

                <td className="px-6 py-4 whitespace-nowrap">
                  {user.items.map((item: any, itemIndex: any) => (
                    <span key={itemIndex}>
                      {item.product.name} ({item.children.name})
                      {itemIndex !== user.items.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">S/.{user.totalPrice}</td>
                <td className="px-6 py-4 font-bold">S/.{user.discount == "PROFESORES2024" ? user.totalPrice / 2 : user.totalPrice}</td>
                <td className="px-6 py-4">{user.discount == "PROFESORES2024" ? "PROFESORES2024 (-50%)" : "No aplica"}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-x-1">
                    <span className={validateStatus(user.status)} />
                    <p>{user.status === "SUCCESS" ? "Pagado" : "Pendiente"} </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-slate-300 rounded-md p-1 me-2"
                    onClick={() => openSeeTransactionModal(user.id)}
                  >
                    <FaEye className="text-xl text-gray-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        className="mt-4"
        current={currentPage + 1}
        total={totalElements}
        pageSize={10}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
}
