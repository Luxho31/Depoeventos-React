import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { createTrustedCompany } from "../../../services/trusted-companies-service";

export default function ReturnModal({ id, open, setOpen, handleReload }: any) {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    console.log("id", id);
  }, [id]);

  const createTrustedCompaniesForm = async (values: any) => {
    try {
      setLoading(true);
      await createTrustedCompany(values);
      console.log(values);
      form.resetFields();
      handleReload();
      toast.success("Trusted Companies creado correctamente");
    } catch (error) {
      console.error("Error al crear una empresa:", error);
      toast.error("Error al crear una empresa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={id}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={800}
      footer={null}
    >
      <Toaster />
      <Form
        name="videoForm"
        onFinish={(values) => createTrustedCompaniesForm(values)}
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form}
      >
        {/* Título */}
        <Form.Item
          name="name"
          label="Motivo"
          rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
          labelCol={{ span: 24 }}
        >
          <TextArea rows={4} />
        </Form.Item>

        <div className="flex items-center gap-x-4">
          {/* Precio del curso */}
          <Form.Item
            name="price_course"
            label="Precio del curso"
            labelCol={{ span: 24 }}
          >
            <Input disabled value={id} />
          </Form.Item>

          {/* Precio a devolver */}
          <Form.Item
            name="price"
            label="Precio a devolver"
            rules={[{ required: true, message: "Por favor ingrese un precio" }]}
            labelCol={{ span: 24 }}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>

        {/* Crear */}
        <Form.Item>
          <Button htmlType="submit" color="primary" disabled={loading}>
            Devolver
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
