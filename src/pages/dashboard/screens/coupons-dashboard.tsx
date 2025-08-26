import { Button } from "antd";
import { useEffect, useState, useMemo } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { HiMiniPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllCoupons } from "../../../services/coupons-service";
import CouponModal from "../modals/coupons-modals-dashboard";

type Coupon = {
  id: number;
  name: string;
  description: string;
  code: string;
  expirationDate: string;
  active: boolean;
  value: number; // %
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// 🔧 Normaliza cualquier forma de respuesta a array
function normalizeCoupons(data: any): Coupon[] {
  if (Array.isArray(data)) return data as Coupon[];
  if (data && Array.isArray(data.content)) return data.content as Coupon[]; // Spring Page
  if (data && Array.isArray(data.items)) return data.items as Coupon[]; // otra convención
  return [];
}

export default function CouponsDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [seeId, setSeeId] = useState<number | undefined>(undefined);
  const [openSeeModal, setOpenSeeModal] = useState(false);
  const [couponsData, setCouponsData] = useState<Coupon[]>([]);

  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const specificRole: string = "ADMIN";
    if (userRole && userRole.some((role) => role === specificRole)) {
      let mounted = true;
      (async () => {
        try {
          setLoading(true);
          const data = await getAllCoupons();
          const arr = normalizeCoupons(data);
          if (mounted) setCouponsData(arr);
        } catch (error) {
          console.error("Error al obtener coupons:", error);
          if (mounted) setCouponsData([]);
        } finally {
          if (mounted) setLoading(false);
        }
      })();
      return () => {
        mounted = false;
      };
    } else {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]);

  const handleReload = async () => {
    try {
      setLoading(true);
      const data = await getAllCoupons();
      setCouponsData(normalizeCoupons(data));
    } catch (error) {
      console.error("Error al recargar cupones:", error);
      setCouponsData([]);
    } finally {
      setLoading(false);
    }
  };

  const openCreateCouponModal = () => setOpenCreateModal(true);
  const openEditCouponModal = (id: number) => {
    setEditId(id);
    setOpenEditModal(true);
  };
  const openSeeCouponModal = (id: number) => {
    setSeeId(id);
    setOpenSeeModal(true);
  };

  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const isExpired = (iso: string) => iso < todayISO;

  const rows = couponsData ?? [];
  const isEmpty = rows.length === 0;

  return (
    <div className="h-screen">
      <button
        onClick={openCreateCouponModal}
        className="sm:hidden bg-blue-400 hover:bg-blue-500 active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 absolute bottom-10 right-12 p-3 border shadow-lg rounded-full z-30"
        aria-label="Crear cupón"
      >
        <HiMiniPlus className="text-white text-2xl" />
      </button>

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-lg text-gray-700 font-semibold tracking-tight">
          Cupones
        </h1>
        <div className="max-sm:hidden">
          <Button
            onClick={openCreateCouponModal}
            className="flex items-center gap-x-2"
          >
            <HiMiniPlus className="text-lg" />
            Crear cupón
          </Button>
        </div>
      </div>

      {/* Modals */}
      <CouponModal
        type="create"
        id={undefined}
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        handleReload={handleReload}
      />
      <CouponModal
        type="edit"
        id={editId}
        open={openEditModal}
        setOpen={setOpenEditModal}
        handleReload={handleReload}
      />
      <CouponModal
        type="see"
        id={seeId}
        open={openSeeModal}
        setOpen={setOpenSeeModal}
        handleReload={handleReload}
      />

      {/* Tabla */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Valor
              </th>
              <th scope="col" className="px-6 py-3">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de expiración
              </th>
              <th scope="col" className="px-6 py-3">
                Activo
              </th>
              <th scope="col" className="px-6 py-3">
                Código
              </th>
              <th scope="col" className="px-6 py-3">
                Operaciones
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  Cargando cupones…
                </td>
              </tr>
            ) : isEmpty ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="inline-flex flex-col items-center gap-2 text-gray-400">
                    <div className="text-base">No hay cupones aún</div>
                    <div className="text-xs">
                      Crea el primero con “Crear cupón”.
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((coupon, index) => {
                const expired = isExpired(coupon.expirationDate);
                return (
                  <tr
                    key={coupon.id ?? index}
                    className="bg-white even:bg-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {coupon.name}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1 sm:hidden">
                        {coupon.description}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {coupon.value} %
                    </td>

                    <td className="px-6 py-4 max-w-[320px]">
                      <p className="text-gray-600 truncate">
                        {coupon.description}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(coupon.expirationDate)}
                      {expired && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 align-middle">
                          Vencido
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {expired ? (
                        <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                          No
                        </span>
                      ) : coupon.active ? (
                        <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                          Sí
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                          No
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-mono text-gray-700 bg-gray-100 border border-gray-200 rounded px-2 py-1 inline-block">
                        {coupon.code}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="bg-slate-300 rounded-md p-2 shadow-sm hover:shadow transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                          onClick={() => openSeeCouponModal(coupon.id)}
                          title="Ver"
                          aria-label={`Ver ${coupon.name}`}
                        >
                          <FaEye className="text-xl text-gray-700" />
                        </button>
                        <button
                          className="bg-slate-300 rounded-md p-2 shadow-sm hover:shadow transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                          onClick={() => openEditCouponModal(coupon.id)}
                          title="Editar"
                          aria-label={`Editar ${coupon.name}`}
                        >
                          <FaEdit className="text-xl text-gray-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
