import { useEffect, useState } from "react";
import CustomTable from "../../../components/tables/custom-table";
import { IoReload } from "react-icons/io5";

export default function CategoriesDashboard() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getAllDisciplines = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories");
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
    getAllDisciplines();
  }, []);

  const handleReload = () => {
    try {
      setLoading(true);
      getAllDisciplines();
    } catch (error) {
      console.error("Error al recargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: "5%", editable: true },
    { title: "Nombre", dataIndex: "name", width: "20%", editable: true },
    {
      title: "Descripción",
      dataIndex: "description",
      width: "60%",
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
      <CustomTable columns={columns} dataTable={userData} expandable={false} />
    </div>
  );
}
