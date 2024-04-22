import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { getInscriptionById } from "../../../services/Inscriptions-service";

type CoursesModalProps = {
  id: number | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CoursesModal({ id, open, setOpen }: CoursesModalProps) {
  const [, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      getCoursesById(id);
    }
  }, [id]);

  const getCoursesById = async (id: number) => {
    try {
      setLoading(true);
      const discipline = await getInscriptionById(id);
      console.log("La disciplina es:", discipline);
      if (discipline.product.grades === null) {
        discipline.product.grades = "No aplica";
      }

      discipline.product.ages = discipline.product.ages
        .map((age: number) => `${age} año(s)`)
        .join(", ");
      discipline.children.name = `${discipline.children.name} ${discipline.children.lastName}`;

      form.setFieldsValue({
        productName: discipline.product.name,
        gender: discipline.product.gender,
        startDate: discipline.product.startDate,
        endDate: discipline.product.endDate,
        age: discipline.product.ages,
        grade: discipline.product.grades,
        location: discipline.product.location,
        childrenName: discipline.children.name,
      });
    } catch (error) {
      console.error("Error al obtener datos de la disciplina:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Verificar curso"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <Form
        name="courseForm"
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form}
      >
        <div className="flex flex-col gap-y-4">
          <Form.Item
            name="productName"
            label="Nombre de producto"
            labelCol={{ span: 24 }}
            className="cursor-text"
          >
            <Input className="w-full rounded-xl p-4" size="large" disabled />
          </Form.Item>
          <div className="flex gap-x-4 max-sm:flex-col">
            <Form.Item
              name="gender"
              label="Genero de producto"
              labelCol={{ span: 24 }}
              className="cursor-text"
            >
              <Input className="w-full rounded-xl p-4" size="large" disabled />
            </Form.Item>
            <Form.Item
              name="location"
              label="Locación de producto"
              labelCol={{ span: 24 }}
              className="cursor-text"
            >
              <Input className="w-full rounded-xl p-4" size="large" disabled />
            </Form.Item>
          </div>

          <div className="flex gap-x-4 max-sm:flex-col">
            <Form.Item
              name="startDate"
              label="Inicio de curso"
              labelCol={{ span: 24 }}
              className="cursor-text w-full"
            >
              <Input className="w-full rounded-xl p-4" size="large" disabled />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="Fin de curso"
              labelCol={{ span: 24 }}
              className="cursor-text w-full"
            >
              <Input className="w-full rounded-xl p-4" size="large" disabled />
            </Form.Item>
          </div>

          <div className="flex gap-x-4 max-sm:flex-col">
            <Form.Item
              name="age"
              label="Edad curso"
              labelCol={{ span: 24 }}
              className="cursor-text w-full"
            >
              <Input className="w-full rounded-xl p-4" size="large" disabled />
            </Form.Item>

            <Form.Item
              name="grade"
              label="Grado curso"
              labelCol={{ span: 24 }}
              className="cursor-text w-full"
            >
              <Input className="w-full rounded-xl p-4" size="large" disabled />
            </Form.Item>
          </div>

          <Form.Item
            name="childrenName"
            label="Alumno matriculado"
            labelCol={{ span: 24 }}
            className="cursor-text"
          >
            <Input className="w-full rounded-xl p-4" size="large" disabled />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
