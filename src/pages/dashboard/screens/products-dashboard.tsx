import { Button } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { getAllProducts } from "../../../services/products-service";
import ProductModal from "../modals/products-modals-dashboard";

export default function ProductsDashboard() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const { userRole } = useAuth()

  useEffect(() => {
    const specificRole = 'ADMIN';
    if (userRole && userRole.some(role => role === specificRole)) {
      setLoading(true);
      getAllProducts().then((data) => {
        setUserData(data);
        setLoading(false);
      }).catch(error => {
        console.error("Error al obtener productos:", error);
        setLoading(false);
      });
    }
  }, [userRole]);

  const handleReload = () => {
    try {
      setLoading(true);
      // getAllDisciplines();
    } catch (error) {
      console.error("Error al recargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between items-center">
        {/* ------------------- VENTANA MODAL ----------------- */}
        <Button
          type="primary"
          onClick={() => setOpen(true)}
          className="bg-blue-500"
        >
          + Crear Producto
        </Button>

        {/* ------------------- VENTANA MODAL ----------------- */}
      </div>
      <ProductModal
        open={open}
        setOpen={setOpen}
        handleReload={handleReload}
        type="crear"
      />
    </div>
  );
}
