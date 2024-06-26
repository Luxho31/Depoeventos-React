import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Popconfirm, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import {
  createCampus,
  getCampusById,
  updateCampus,
} from "../../../services/campuses-service";

type Campus = {
  id: number;
  name: string;
  description: string;
}

type CampusModalProps = {
  create: boolean;
  id: number | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReload: () => void;
};

export default function CampusModal({
  create,
  id,
  open,
  setOpen,
  handleReload,
}: CampusModalProps) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) getCampusByIdForm(id);
  }, [id]);

  const getCampusByIdForm = async (id: number) => {
    try {
      setLoading(true);
      const campus = await getCampusById(id);
      form.setFieldsValue(campus);
    } catch (error) {
      console.error("Error al obtener datos de la sede:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCampusForm = async (values: Campus) => {
    try {
      setLoading(true);
      // values.photo = ""
      await updateCampus(values, id);
      setOpen(false);
      handleReload();
    } catch (error) {
      console.error("Error al actualizar una sede:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCampusForm = async (values: Campus) => {
    try {
      setLoading(true);
      // values.photo = ""
      await createCampus(values);
      setOpen(false);
      form.resetFields();
      handleReload();
    } catch (error) {
      console.error("Error al crear una sede:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={create ? "Crear Sede" : "Editar Sede"}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <Form
        name="campusForm"
        onFinish={(values) => {
          create ? createCampusForm(values) : updateCampusForm(values);
        }}
        onFinishFailed={() => { }}
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form}
      >
        <div className="flex flex-col gap-y-4">
          {/* ------------------Input Nombre Sede------------------ */}
          <Form.Item
            name="name"
            label="Nombre"
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
            label="Descripción"
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
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>

          {/* ------------------Fotografia de la Sede------------------ */}
          {/* <Form.Item name="photo"></Form.Item> */}
        </div>

        <div className="w-full flex justify-end max-sm:justify-center">
          {create ? (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4"
              // bg-[#f46e16] hover:bg-orange-600 text-white font-semibold rounded-xl px-32 max-md:px-24 py-4
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
          ) : (
            <Popconfirm
              title="¿Estás seguro de que deseas actualizar esta sede?"
              okButtonProps={{ className: "bg-blue-500 text-white" }}
              onConfirm={() => form.submit()}
              okText="Sí"
              cancelText="No"
            >
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4"
                // bg-[#f46e16] hover:bg-orange-600 text-white font-semibold rounded-xl px-32 max-md:px-24 py-4
                disabled={loading}
              >
                {loading ? (
                  <Spin
                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                  />
                ) : (
                  "Actualizar"
                )}
              </button>
            </Popconfirm>
          )}
        </div>
      </Form>
    </Modal>
  );
}
