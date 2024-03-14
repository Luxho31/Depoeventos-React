import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import CustomTable from "../../../components/tables/custom-table";
import { useAuth } from "../../../context/AuthProvider";
import { getAllProducts } from "../../../services/products-service";

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

  const columns = [
    { title: "Nombre", dataIndex: "name", width: "15%", editable: true },
    { title: "Precio", dataIndex: "price", width: "5%", editable: true },
    { title: "Sede", dataIndex: ["campus", "name"], width: "12%", editable: true },
    { title: "Categoria", dataIndex: ["category", "name"], width: "8%", editable: true },
    // { 
    //   title: "Disciplinas", 
    //   dataIndex: ["courses", "name"], 
    //   width: "50%", 
    // },
  ];

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
        <Modal
          title="Crear Producto"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          footer={null} // Eliminamos el footer
        >
          <Form
            name="login"
            onFinishFailed={() => {
              console.log("Fallo");
            }}
            className="my-10 max-md:mx-20 md:mx-32"
          >
            <div className="flex flex-col gap-y-4 mb-10">
              {/* ------------------Input Nombre Producto------------------ */}
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa nombre del producto.",
                  },
                  { max: 50, message: "El nombre del producto es muy largo." },
                ]}
                className="cursor-text"
              >
                <Input
                  className="w-full rounded-xl p-4"
                  placeholder="Ingresa nombre del producto"
                  size="large"
                />
              </Form.Item>

              {/* ------------------Input Descripcion Producto------------------ */}
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese precio del producto.",
                  },
                ]}
                className="cursor-text"
              >
                <Input
                  className="w-full rounded-xl p-4"
                  placeholder="Ingresa precio del producto"
                  size="large"
                />
              </Form.Item>

              {/* ------------------Seleccionar Sede------------------ */}
              <Form.Item
                name="campusName"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su nombre de la sede",
                  },
                ]}
              >
                <Select
                  placeholder="Seleccionar Sede"
                  className="w-full h-14"
                  onChange={handleChange}
                  options={[
                    { value: 'Sede 1', label: 'Sede 1' },
                    { value: 'Sede 2', label: 'Sede 2' },
                    { value: 'Sede 3', label: 'Sede 3' },
                  ]}
                />
              </Form.Item>

              {/* ------------------Seleccionar Categoria------------------ */}
              <Form.Item
                name="categoryName"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su nombre de la categoria",
                  },
                ]}
              >
                <Select
                  placeholder="Seleccionar Categoria"
                  className="w-full h-14"
                  onChange={handleChange}
                  options={[
                    { value: 'Categoria 1', label: 'Categoria 1' },
                    { value: 'Categoria 2', label: 'Categoria 2' },
                    { value: 'Categoria 3', label: 'Categoria 3' },
                  ]}
                />
              </Form.Item>
              {/* ------------------Seleccionar Disciplina------------------ */}
              <Form.Item
                name="disciplineName"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su nombre de la disciplina",
                  },
                ]}
              >
                <Select
                  placeholder="Seleccionar Disciplina"
                  className="w-full h-14"
                  onChange={handleChange}
                  options={[
                    { value: 'Disciplina 1', label: 'Disciplina 1' },
                    { value: 'Disciplina 2', label: 'Disciplina 2' },
                    { value: 'Disciplina 3', label: 'Disciplina 3' },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item className="w-full flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold rounded-xl px-12 !h-12 hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  <Spin
                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                  />
                ) : (
                  "Crear"
                )}
              </button>
            </Form.Item>
          </Form>
        </Modal>
        {/* ------------------- VENTANA MODAL ----------------- */}
      </div>
      <CustomTable columns={columns} dataTable={userData} expandable={true} />
    </div>
  );
}
