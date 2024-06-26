import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Popconfirm, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import {
  createDiscipline,
  getDisciplineById,
  updateDiscipline,
} from "../../../services/disciplines-service";

type DisciplineData = {
  id: number;
  name: string;
  description: string;
  photo: string;
};

type DisciplineModalProps = {
  create: boolean; // Tipo específico para 'create', puedes ajustar el tipo según sea necesario
  id: number | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReload: () => void;
};

export default function DisciplineModal({
  create,
  id,
  open,
  setOpen,
  handleReload,
}: DisciplineModalProps) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) getDisciplineByIdForm(id);
  }, [id]);

  const getDisciplineByIdForm = async (id: number) => {
    try {
      setLoading(true);
      const discipline = await getDisciplineById(id);
      form.setFieldsValue(discipline);
    } catch (error) {
      console.error("Error al obtener datos de la disciplina:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateDisciplineForm = async (values: DisciplineData) => {
    try {
      setLoading(true);
      values.photo = "-";
      await updateDiscipline(values, id);
      setOpen(false);
      handleReload();
    } catch (error) {
      console.error("Error al actualizar una disciplina:", error);
    } finally {
      setLoading(false);
    }
  };

  const createDisciplineForm = async (values: DisciplineData) => {
    try {
      setLoading(true);
      values.photo = "-";
      await createDiscipline(values);
      setOpen(false);
      form.resetFields();
      handleReload();
    } catch (error) {
      console.error("Error al crear una disciplina:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={create ? "Crear Disciplina" : "Editar Disciplina"}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <Form
        name="disciplineForm"
        onFinish={(values) => {
          create ? createDisciplineForm(values) : updateDisciplineForm(values);
        }}
        onFinishFailed={() => { }}
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form}
      >
        <div className="flex flex-col gap-y-4">
          {/* ------------------Input Nombre Disciplina------------------ */}
          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa nombre de la disciplina.",
              },
              {
                max: 50,
                message: "El nombre de la disciplina es muy largo.",
              },
            ]}
            className="cursor-text"
          >
            <Input
              className="w-full rounded-xl p-4"
              placeholder="Ingresa nombre de la disciplina"
              size="large"
            />
          </Form.Item>

          {/* ------------------Input Descripcion Disciplina------------------ */}
          <Form.Item
            name="description"
            label="Descripción"
            rules={[
              {
                required: true,
                message: "Por favor ingrese descripción de la disciplina.",
              },
            ]}
            className="cursor-text"
          >
            <TextArea
              rows={4}
              placeholder="Ingresar descripción de la disciplina"
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>

          {/* ------------------Fotografia de la Disciplina------------------ */}
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
              title="¿Estás seguro de que deseas actualizar esta disciplina?"
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
