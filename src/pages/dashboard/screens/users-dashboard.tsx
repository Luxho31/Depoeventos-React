import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import CustomTable from "../../../components/tables/custom-table";
import { useAuth } from "../../../context/AuthProvider";
import { getAllUsers } from "../../../services/user-service";

export default function UsersDashboard() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userRole } = useAuth()

  useEffect(() => {
    // Verificar si el userRole contiene el rol específico
    const specificRole = 'ADMIN'; // Rol específico que deseas
    if (userRole && userRole.some(role => role === specificRole)) {
      // Solo realiza la llamada a la API si el usuario tiene el rol específico
      setLoading(true);
      getAllUsers().then((data) => {
        setUserData(data);
        setLoading(false);
      }).catch(error => {
        console.error("Error al obtener sedes:", error);
        setLoading(false);
      });
    }
  }, [userRole]);

  const handleReload = () => {
    try {
      setLoading(true);
      getAllUsers();
    } catch (error) {
      console.error("Error al recargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Nombre", dataIndex: "firstName", width: "10%", editable: true },
    {
      title: "Apellido Paterno",
      dataIndex: "lastName",
      width: "10%",
      editable: true,
    },
    {
      title: "Apellido Materno",
      dataIndex: "motherLastName",
      width: "12%",
      editable: true,
    },
    { title: "Correo", dataIndex: "username", width: "12%", editable: true },
    {
      title: "Fecha de nacimiento",
      dataIndex: "birthDate",
      width: "10%",
      editable: true,
    },
    {
      title: "Número de contacto",
      dataIndex: "contactNumber",
      width: "10%",
      editable: true,
    },
    { title: "País", dataIndex: "country", width: "7%", editable: true },
    {
      title: "Tipo de documento",
      dataIndex: "documentType",
      width: "10%",
      editable: true,
    },
    {
      title: "Número de documento",
      dataIndex: "documentNumber",
      width: "10%",
      editable: true,
    },
  ];
  return (
    <div className="h-screen">
        <button
          onClick={handleReload}
          className="pb-8 border mb-5 shadow-md flex h-2 px-4 py-2 bg-white rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          {loading ? "hola" : <IoReload className="text-lg" />}
        </button>

      <CustomTable columns={columns} dataTable={userData} />
    </div>
  );
}
