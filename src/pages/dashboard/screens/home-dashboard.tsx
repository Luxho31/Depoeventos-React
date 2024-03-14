import { useEffect, useState } from "react";
import CustomTable from "../../../components/tables/custom-table";
import { IoReload } from "react-icons/io5";
import { Button, Form, Input, Modal, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { LoadingOutlined } from "@ant-design/icons";
import {
  createCampus,
  getAllCampuses,
} from "../../../services/campuses-service";

export default function HomeDashboard() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllCampuses().then((data) => {
      setUserData(data);
    });
  }, []);

  const handleReload = () => {
    try {
      setLoading(true);
      getAllCampuses();
    } catch (error) {
      console.error("Error al recargar sedes:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCampusesForm = async (form: any) => {
    try {
      setLoading(true);
      await createCampus(form);
      getAllCampuses().then((data) => {
        setUserData(data);
      });
      setOpen(false);
    } catch (error) {
      console.error("Error al crear una sede:", error);
      throw error;
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
        <h1>BIENVENIDOS</h1>
    </div>
  );
}
