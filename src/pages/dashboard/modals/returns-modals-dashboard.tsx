import { Button, Form, Input, InputNumber, Modal, Switch } from "antd";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { getInscriptionById } from "../../../services/Inscriptions-service";
import { createReturn } from "../../../services/return-service";

export default function ReturnModal({ id, open, setOpen, handleReload }: any) {
  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState<any>({});
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    if (open) {
      getRegistration(id);
    }
  }, [id, open]);

  const getRegistration = async (id: number) => {
    try {
      const response = await getInscriptionById(id);
      setRegistration(response);
    } catch (error) {
      console.error("Error al cargar la matrícula:", error);
    }
  };

  const createReturnHandler = async (values: any) => {
    try {
      setLoading(true);
      console.log(values);
      if (
        values.deleteRegistration == false ||
        values.deleteRegistration == undefined
      ) {
        values.deleteRegistration = false;
      }
      await createReturn(values, id);
      setOpen(false);

      toast.success("Devolución creada correctamente");
    } catch (error) {
      console.error("Error al crear la devolución:", error);
      toast.error("Error al crear la devolución");
    } finally {
      handleReload();
      form.resetFields();
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (registration.product) {
      return `Devolución de ${registration.product.name} - ${registration.children.name} ${registration.children.lastName}`;
    }
    return "Devolución";
  };

  const getCurrentPrice = () => {
    if (registration.product) {
      return registration.product.price;
    }
    return 0;
  };

  return (
    <Modal
      title={getTitle()}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={800}
      footer={null}
    >
      <Toaster position="top-right" />
      <Form
        name="videoForm"
        onFinish={(values) => createReturnHandler(values)}
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-16"
        form={form}
      >
        {/* Título */}
        <Form.Item
          name="reason"
          label="Motivo"
          rules={[{ required: true, message: "Por favor ingrese un motivo" }]}
          labelCol={{ span: 24 }}
        >
          <TextArea rows={4} />
        </Form.Item>

        <div className="flex items-center justify-between gap-x-10">
          {/* Precio real */}
          <Form.Item
            label="Precio real"
            labelCol={{ span: 24 }}
            className="w-1/2"
          >
            <Input
              className="font-semibold"
              disabled
              value={`S/.${getCurrentPrice()}`}
            />
          </Form.Item>
          {/* Precio a devolver */}
          <Form.Item
            name="price"
            label="Precio a devolver"
            rules={[
              { required: true, message: "Por favor ingrese un precio" },
              () => ({
                validator(_, value) {
                  if (!value || value <= registration.product.price) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "El precio a devolver no puede ser mayor al precio real"
                    )
                  );
                },
              }),
            ]}
            labelCol={{ span: 24 }}
            className="w-1/2"
          >
            <InputNumber className="w-full" />
          </Form.Item>
          {/* Eliminar matrícula */}
          <Form.Item
            name="deleteRegistration"
            label="Eliminar matrícula"
            labelCol={{ span: 24 }}
          >
            <Switch
              checkedChildren="Eliminar"
              unCheckedChildren="No eliminar"
              className="bg-gray-500"
            />
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
