import { Button, Form, Input, Modal, DatePicker, Select } from "antd";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function IncidentsTeachersModal({ open, setOpen, handleReload }: any) {
  const [, setLoading] = useState(false);
  const [form] = Form.useForm();

  const createIncident = async (values: any) => {
    try {
      setLoading(true);
      console.log("Incidencia creada:", values);
      form.resetFields();
      handleReload();
      toast.success("Incidencia creada correctamente");
    } catch (error) {
      console.error("Error al crear la incidencia:", error);
      toast.error("Error al crear la incidencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={"Registrar Incidencia"}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={800}
      className="mt-4"
      footer={null}
    >
      <Toaster />
      <Form
        name="incidentForm"
        onFinish={createIncident}
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form}
      >
        <div className="flex items-center gap-x-5">
          {/* Profesor */}
          <Form.Item
            name="profesor"
            label="Profesor"
            rules={[{ required: true, message: "Ingrese el nombre del profesor" }]}
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Input
              defaultValue={"Profesor 1"}
              disabled
            />
          </Form.Item>

          {/* Curso */}
          <Form.Item
            name="curso"
            label="Curso"
            rules={[{ required: true, message: "Ingrese el nombre del curso" }]}
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Select>
              <Select.Option value="Curso 1">Curso 1</Select.Option>
              <Select.Option value="Curso 2">Curso 2</Select.Option>
              <Select.Option value="Curso 3">Curso 3</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex items-center gap-x-5">
          {/* Fecha y hora del reporte */}
          <Form.Item
            name="fechaHoraReporte"
            label="Fecha y Hora del Reporte"
            rules={[{ required: true, message: "Ingrese la fecha y hora del reporte" }]}
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <DatePicker showTime className="w-full" />
          </Form.Item>

          {/* Tipo de incidencia */}
          <Form.Item
            name="tipo"
            label="Tipo de Incidencia"
            rules={[{ required: true, message: "Ingrese el tipo de incidencia" }]}
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Input />
          </Form.Item>
        </div>
        {/* Alumnos implicados */}
        <Form.Item
          name="alumnos"
          label="Alumnos Implicados"
          rules={[{ required: true, message: "Ingrese los alumnos implicados" }]}
          labelCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>

        {/* Alumnos testigos */}
        <Form.Item
          name="testigos"
          label="Alumnos Testigos"
          labelCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>


        {/* Descripción */}
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: "Ingrese la descripción de la incidencia" }]}
          labelCol={{ span: 24 }}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Crear */}
        <Form.Item>
          <Button htmlType="submit" color="primary">
            Crear
          </Button>
        </Form.Item>
      </Form>
    </Modal >
  );
}
