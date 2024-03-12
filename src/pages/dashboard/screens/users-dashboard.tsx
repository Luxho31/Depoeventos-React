import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import CustomTable from "../../../components/tables/custom-table";

export default function UsersDashboard() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      const data = await response.json();

      const dataWithKeys = data.map((item: any, index: any) => ({
        ...item,
        key: index,
      }));

      setUserData(dataWithKeys);
    } catch (error) {
      console.error("Error al obtener datos de usuarios:", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

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
