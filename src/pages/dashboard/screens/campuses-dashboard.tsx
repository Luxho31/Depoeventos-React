import { useEffect, useState } from "react";
import CustomTable from "../../../components/tables/custom-table";
import { IoReload } from "react-icons/io5";
import { Button, Form, Input, Modal, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { LoadingOutlined } from "@ant-design/icons";
import { createCampus, getAllCampuses } from "../../../services/campuses-service";

export default function CampusesDashboard() {
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
      createCampus(form);
      getAllCampuses().then((data) => {
        setUserData(data);
      });
    } catch (error) {
      console.error("Error al crear una sede:", error);
      throw error;
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
      {/* ------------------- VENTANA MODAL ----------------- */}
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className="bg-blue-500"
      >
        + Crear Sede
      </Button>
      <Modal
        title="Crear Sede"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null} // Eliminamos el footer
      >
        <Form
          name="campus"
          onFinish={(values) => {
            createCampusesForm(values);
            console.log(values);
          }}
          onFinishFailed={() => {
            console.log("Fallo");
          }}
          className="my-10 max-md:mx-20 md:mx-32"
        >
          <div className="flex flex-col gap-y-4">
            {/* ------------------Input Nombre Sede------------------ */}
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa nombre de la sede.",
                },
                {
                  max: 50,
                  message: "El nombre de la sede es muy largo.",
                },
              ]}
              className="cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa nombre de la sede"
                size="large"
              />
            </Form.Item>

            {/* ------------------Input Descripcion Sede------------------ */}
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese descripción de la sede.",
                },
              ]}
              className="cursor-text"
            >
              <TextArea
                rows={4}
                placeholder="Ingresar descripción de la sede"
                maxLength={6}
                autoSize={{ minRows: 4, maxRows: 4 }}
              />
            </Form.Item>

            {/* ------------------Fotografia de la Sede------------------ */}
            <Form.Item
              name="photo"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese fotografia de la sede.",
                },
              ]}
              className="cursor-text"
            >
              {/* <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload> */}
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa nombre de la sede"
                size="large"
              ></Input>
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
                  indicator={
                    <LoadingOutlined style={{ fontSize: 24 }} spin />
                  }
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
