import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import CustomTable from "../../../components/tables/custom-table";
import { useAuth } from "../../../context/AuthProvider";
import {
  createCategory,
  getAllCategories,
} from "../../../services/categories-service";

export default function CategoriesDashboard() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userRole } = useAuth()

  useEffect(() => {
    const specificRole = 'ADMIN';
    if (userRole && userRole.some(role => role === specificRole)) {
      setLoading(true);
      getAllCategories().then((data) => {
        setUserData(data);
        setLoading(false);
      }).catch(error => {
        console.error("Error al obtener categorías:", error);
        setLoading(false);
      });
    }
  }, [userRole]);

  const createCategoryForm = async (form: any) => {
    try {
      setLoading(true);
      await createCategory(form);
      getAllCategories().then((data) => {
        setUserData(data);
      });
      setOpen(false);
    } catch (error) {
      console.error("Error al crear una categoria", error);
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
      {/* ------------------- VENTANA MODAL ----------------- */}
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className="bg-blue-500"
      >
        + Crear Categorias
      </Button>
      <Modal
        title="Crear Categoria"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <Form
          name="categories"
          onFinish={(values) => {
            createCategoryForm(values);
            console.log(values);
          }}
          onFinishFailed={() => {
            console.log("Fallo");
          }}
          className="my-10 max-md:mx-20 md:mx-32"
        >
          <div className="flex flex-col gap-y-4">
            {/* ------------------Input Nombre Categoria------------------ */}
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa nombre de la categoria.",
                },
                {
                  max: 50,
                  message: "El nombre de la categoria es muy largo.",
                },
              ]}
              className="cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa nombre de la categoria"
                size="large"
              />
            </Form.Item>

            {/* ------------------Input Descripcion Categoria------------------ */}
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese descripción de la categoria.",
                },
              ]}
              className="cursor-text"
            >
              <TextArea
                rows={4}
                placeholder="maxLength is 6"
                maxLength={6}
                autoSize={{ minRows: 4, maxRows: 4 }}
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
      <CustomTable columns={columns} dataTable={userData} expandable={false} />
    </div>
  );
}
