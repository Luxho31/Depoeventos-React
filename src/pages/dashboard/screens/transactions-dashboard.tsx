import { Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaEye } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllOrders } from "../../../services/cart-service/cart-service";
import TransactionModal from "../modals/transactions-modals-dashboard";

type OrderData = {
  id: number;
  paymentMethod: string;
  bankName: string;
  operationNumber: string;
  date: string;
  totalPrice: number;
  status: string;
};

export default function TransactionsDashboard() {
  const [orderData, setOrderData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [seeId, setSeeId] = useState<number | undefined>(undefined);
  const [openSeeModal, setOpenSeeModal] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const { userRole } = useAuth();
  const ordersPerPage: number = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const specificRole: string = "ADMIN";
    if (userRole && userRole.some((role) => role === specificRole)) {
      setLoading(true);
      getAllOrders()
        .then((data: OrderData[]) => {
          setOrderData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setLoading(false);
        });
    } else {
      navigate("/dashboard");
    }
  }, [userRole]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, orderData]);

  const handleReload = () => {
    setLoading(true);
    getAllOrders()
      .then((data: OrderData[]) => {
        setOrderData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error reloading orders:", error);
        setLoading(false);
      });
  };

  const openEditTransactionModal = (id: number) => {
    setEditId(id);
    setOpenEditModal(true);
  };

  const openSeeTransactionModal = (id: number) => {
    setSeeId(id);
    setOpenSeeModal(true);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    const searchTerms = searchTerm.toLowerCase().split(" ");
    const filteredOrders = orderData.filter((order) =>
      searchTerms.some((term) =>
        `${order.operationNumber.toLowerCase()} ${order.paymentMethod.toLowerCase()} ${order.bankName
          }`.includes(term)
      )
    );
    setFilteredOrders(filteredOrders);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const validateStatus = (status: string) => {
    const basicStyle = "w-3 h-3 rounded-full";
    if (status === "PENDING") return basicStyle + " bg-gray-500";
    if (status === "SUCCESS") return basicStyle + " bg-green-500";
    if (status === "DENIED") return basicStyle + " bg-red-500";
  };

  const indexOfLastOrder: number = currentPage * ordersPerPage;
  const indexOfFirstOrder: number = indexOfLastOrder - ordersPerPage;
  const currentUsers: OrderData[] = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <div className="h-screen">
      <button
        onClick={handleReload}
        className="pb-8 border mb-5 shadow-md flex h-2 px-4 py-2 bg-white rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        {loading ? "Loading..." : <IoReload className="text-lg" />}
      </button>
      <TransactionModal
        type="edit"
        id={editId}
        open={openEditModal}
        setOpen={setOpenEditModal}
        handleReload={handleReload}
      />
      <TransactionModal
        type="see"
        id={seeId}
        open={openSeeModal}
        setOpen={setOpenSeeModal}
        handleReload={handleReload}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <Input
            id="table-search-users"
            placeholder="Buscar por nombre, número de documento..."
            className="w-[20%] rounded-xl p-1"
            size="small"
            prefix={<CiSearch className="site-form-item-icon me-1" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Método de pago
              </th>
              <th scope="col" className="px-6 py-3">
                Banco
              </th>
              <th scope="col" className="px-6 py-3">
                Número de operación
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de la operación
              </th>
              <th scope="col" className="px-6 py-3">
                Precio total pagado
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
            {currentUsers.map((user, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.paymentMethod}</td>
                <td className="px-6 py-4">{user.bankName}</td>
                <td className="px-6 py-4">{user.operationNumber}</td>
                <td className="px-6 py-4">{user.date}</td>
                <td className="px-6 py-4">{user.totalPrice}</td>
                <td className="px-6 py-4 flex items-center gap-x-2">
                  <span className={validateStatus(user.status)} />
                  {user.status}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-slate-300 rounded-md p-1 me-2"
                    onClick={() => openSeeTransactionModal(user.id)}
                  >
                    <FaEye className="text-xl text-gray-700" />
                  </button>
                  <button
                    className="bg-slate-300 rounded-md p-1"
                    onClick={() => openEditTransactionModal(user.id)}
                  >
                    <FaEdit className="text-xl text-gray-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          className="mt-4"
          current={currentPage}
          total={filteredOrders.length}
          pageSize={ordersPerPage}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
