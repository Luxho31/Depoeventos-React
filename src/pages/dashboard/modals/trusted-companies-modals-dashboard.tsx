import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function TrustedCompaniesModal({
  open,
  setOpen,
  handleReload,
}: any) {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const createTrustedCompaniesForm = async (values: any) => {
    try {
      setLoading(true);
      // await createTrustedCompanies(values);
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
      title={"Agregar empresa de confianza"}
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
          label="Nombre"
          rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
          labelCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>

        {/* URL */}
        <Form.Item
          name="url"
          label="URL"
          rules={[{ required: true, message: "Por favor ingrese una URL" }]}
          labelCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>

        {/* Crear */}
        <Form.Item>
          <Button htmlType="submit" color="primary" disabled={loading}>
            Crear
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
