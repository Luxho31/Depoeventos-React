import { LoadingOutlined } from "@ant-design/icons";
import {
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef, useState } from "react";
import { Toaster, toast } from "sonner";

export const ComplaintsBook = () => {
  const formRef = useRef<FormInstance | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (values: any) => {
    try {
      setLoading(true);
      //   await sendMessage(values);
      console.log(values);
      toast.success("Mensaje enviado correctamente");
      if (formRef.current) {
        formRef.current.resetFields();
      }
    } catch (error) {
      toast.error("Error al enviar mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center pt-16">
      <Toaster richColors />
      <div className="lg:w-1/2 px-4 lg:px-0 pt-12 lg:pt-0">
        <div className="max-w-lg mx-auto mb-7">
          <h1 className="text-xl lg:text-2xl font-semibold text-center lg:text-left">
            Libro de Reclamaciones
          </h1>
          <p className="text-center lg:text-left">
            Si tienes alguna queja o reclamo, por favor completa el formulario a
            continuación. Nos comprometemos a atender tus comentarios.
          </p>
        </div>

        <Form
          name="complaints-book"
          onFinish={(e) => {
            handleSendMessage(e);
          }}
          onFinishFailed={() => {
            toast.error("Error al enviar mensaje");
          }}
          className="max-w-lg mx-auto"
        >
          {/* Nombre Completo */}
          <Form.Item
            name="fullName"
            label="Nombre Completo"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Por favor, ingrese su nombre completo",
              },
            ]}
          >
            <Input
              className="w-full border rounded-xl p-2"
              placeholder="Nombre completo"
              size="large"
            />
          </Form.Item>

          {/* Documento de Identidad */}
          <div className="flex items-center gap-x-2 ">
            <Form.Item
              name="documentType"
              label="Tipo de Documento"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione su tipo de documento",
                },
              ]}
              className="w-full"
            >
              <Select placeholder="Tipo de Documento">
                <Select.Option value="DNI">DNI</Select.Option>
                <Select.Option value="CE">Carné de Extranjería</Select.Option>
                <Select.Option value="PAS">Pasaporte</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="documentNumber"
              label="Número de Documento"
              labelCol={{ span: 24 }}
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese su número de documento",
                },
                {
                  len: 8,
                  message: "El número de documento debe tener 8 caracteres",
                },
              ]}
            >
              <Input
                className="w-full border rounded-xl p-2"
                placeholder="Número de Documento"
                size="large"
              />
            </Form.Item>
          </div>

          {/* Dirección */}
          <Form.Item
            name="address"
            label="Dirección"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Por favor, ingrese su dirección",
              },
            ]}
          >
            <Input
              className="w-full border rounded-xl p-2"
              placeholder="Dirección"
              size="large"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Correo Electrónico"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Por favor, ingrese su correo electrónico",
              },
              {
                type: "email",
                message: "Ingrese un correo electrónico válido",
              },
            ]}
          >
            <Input
              className="w-full rounded-xl p-2"
              placeholder="Correo electrónico"
              size="large"
            />
          </Form.Item>

          {/* Teléfono */}
          <Form.Item
            label="Teléfono"
            labelCol={{ span: 24 }}
            name="phone"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese su número de teléfono",
              },
            ]}
          >
            <Input
              className="w-full rounded-xl p-2"
              placeholder="Teléfono"
              size="large"
            />
          </Form.Item>

          {/* Tipo de Solicitud */}
          <Form.Item
            label="Tipo de Solicitud"
            name="requestType"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione el tipo de solicitud",
              },
            ]}
            className="flex items-center justify-center"
          >
            <Radio.Group>
              <Radio value="Queja">Queja</Radio>
              <Radio value="Reclamo">Reclamo</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Detalle del Producto o Servicio */}
          <Form.Item
            name="productDetail"
            label="Detalle del Producto o Servicio"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message:
                  "Por favor, ingrese el detalle del producto o servicio",
              },
            ]}
          >
            <Input
              className="w-full border rounded-xl p-2"
              placeholder="Detalle del Producto o Servicio"
              size="large"
            />
          </Form.Item>

          {/* Descripción */}
          <Form.Item
            label="Descripción"
            labelCol={{ span: 24 }}
            name="description"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese una descripción",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Describa su queja o reclamo..."
              autoSize={{ minRows: 4, maxRows: 6 }}
            />
          </Form.Item>

          {/* Fecha del Incidente */}
          <Form.Item
            label="Fecha del Incidente"
            labelCol={{ span: 24 }}
            name="incidentDate"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione la fecha del incidente",
              },
            ]}
          >
            <DatePicker
              className="w-full"
              placeholder="Fecha del Incidente"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          {/* Checkbox para aceptar políticas de privacidad */}
          <Form.Item
            name="privacyPolicy"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Debe aceptar las políticas de privacidad",
              },
            ]}
          >
            <Checkbox>
              He leído y acepto las{" "}
              <a
                href="#"
                target="_blank"
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                políticas de privacidad
              </a>{" "}
              <span className="text-red-500">*</span>
            </Checkbox>
          </Form.Item>

          {/* Botón para enviar */}
          <Form.Item className="w-full flex justify-center">
            <button
              type="submit"
              className="w-full md:w-72 h-14 bg-[#5aa8c4] text-white font-semibold rounded-md p-4"
              disabled={loading}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
