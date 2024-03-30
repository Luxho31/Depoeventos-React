import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Popconfirm, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "../../../services/categories-service";

type Category = {
  id: number;
  name: string;
  description: string;
}

type CategoryModalProps = {
  create: boolean;
  id: number | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReload: () => void;
};

export default function CategoryModal({
  create,
  id,
  open,
  setOpen,
  handleReload,
}: CategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) getCategoryByIdForm(id);
  }, [id]);

  const getCategoryByIdForm = async (id: number) => {
    try {
      setLoading(true);
      const category = await getCategoryById(id);
      form.setFieldsValue(category);
    } catch (error) {
      console.error("Error al obtener datos de la categoria:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryForm = async (values: Category) => {
    try {
      setLoading(true);
      // values.photo = "";
      await updateCategory(values, id);
      setOpen(false);
      handleReload();
    } catch (error) {
      console.error("Error al actualizar una categoria:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCategoryForm = async (values: Category) => {
    try {
      setLoading(true);
      // values.photo = "";
      await createCategory(values);
      setOpen(false);
      form.resetFields();
      handleReload();
    } catch (error) {
      console.error("Error al crear una categoria:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={create ? "Crear Categoria" : "Editar Categoria"}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <Form
        name="categoryForm"
        onFinish={(values) => {
          create ? createCategoryForm(values) : updateCategoryForm(values);
        }}
        onFinishFailed={() => { }}
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form}
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
              placeholder="Ingresar descripción de la categoria"
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>

          {/* ------------------Fotografia de la Categoria------------------ */}
          {/* <Form.Item name="photo"></Form.Item> */}
        </div>

        <div className="w-full flex justify-end max-sm:justify-center">
          {create ? (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4"
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
              title="¿Estás seguro de que deseas actualizar esta categoria?"
              okButtonProps={{ className: "bg-blue-500 text-white" }}
              onConfirm={() => form.submit()}
              okText="Sí"
              cancelText="No"
            >
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4"
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
