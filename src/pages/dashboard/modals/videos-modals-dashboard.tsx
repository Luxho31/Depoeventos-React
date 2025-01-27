import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { createVideo } from "../../../services/video-service";
import { toast, Toaster } from "sonner";

export default function VideoModal({ open, setOpen, handleReload }: any) {
  const [, setLoading] = useState(false);

  const [form] = Form.useForm();

  const createVideoForm = async (values: any) => {
    try {
      setLoading(true);
      await createVideo(values);
      form.resetFields();
      handleReload();
      toast.success("Video creado correctamente");
    } catch (error) {
      console.error("Error al crear un video:", error);
      toast.error("Error al crear un video");
    } finally {
      setLoading(false);

    }
  };

  return (
    <Modal
      title={"Crear Video"}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <Toaster />
      <Form
        name="videoForm"
        onFinish={(values) => createVideoForm(values)}
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
          <Button htmlType="submit" color="primary">
            Crear
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
