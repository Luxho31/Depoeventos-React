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
import { createComplaintsBook } from "../../../services/complaints-book-service";

export const ComplaintsBook = () => {
  const formRef = useRef<FormInstance | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (values: any) => {
    try {
      setLoading(true);
      const incidentDate = values.incidentDate.$d.toISOString().split("T")[0];
      const fullName = `${values.firstName} ${values.lastName}`;
      const data = {
        ...values,
        fullName,
        incidentDate,
      };
      console.log(data);
      await createComplaintsBook(data);
      toast.success("Mensaje enviado correctamente");

      formRef.current?.resetFields();
    } catch (error) {
      toast.error("Error al enviar mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center pt-20 max-sm:pt-10">
      <Toaster richColors />
      <div className="lg:w-1/2 px-4 lg:px-0 pt-12 lg:pt-0">
        <div className="max-w-3xl mx-auto mb-7">
          <h1 className="text-xl lg:text-2xl font-semibold text-center lg:text-left">
            Libro de Reclamaciones Virtual
          </h1>
          <p className="text-center lg:text-left text-gray-400 text-sm max-sm:text-xs">
            Conforme a lo establecido en el Código de Protección y Defensa del
            Consumidor - Ley N° 29571, DEPOEVENTOS pone a su disposición un
            Libro de Reclamaciones Virtual. Cualquier mensaje enviado será
            dirigido al área responsable, que se encargará de brindar una
            respuesta oportuna dentro del plazo estipulado por la normativa.
            Para registrar un nuevo reclamo o queja, complete el formulario.
          </p>
        </div>

        <Form
          name="complaints-book"
          onFinish={handleSendMessage}
          onFinishFailed={() => {
            toast.error(
              "Por favor, verifica los campos e inténtalo nuevamente."
            );
          }}
          className="max-w-3xl mx-auto"
          ref={formRef}
        >
          <div className="rounded-xl border border-gray-300 p-5">
            <h2 className="text-sm text-gray-400 mb-3">Datos del consumidor</h2>
            {/* Nombre Completo */}
            <div className="flex w-full gap-x-4 max-sm:flex-col">
              <Form.Item
                name="firstName"
                label="Nombres"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa tu nombre completo",
                  },
                ]}
                labelCol={{ span: 24 }}
                className="w-full"
              >
                <Input placeholder="Nombre completo" size="large" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Apellidos"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa tu apellido completo",
                  },
                ]}
                labelCol={{ span: 24 }}
                className="w-full"
              >
                <Input placeholder="Apellido completo" size="large" />
              </Form.Item>
            </div>
            {/* Tipo y Número de Documento */}
            <div className="flex w-full gap-x-4 max-sm:flex-col">
              <Form.Item
                name="documentType"
                label="Tipo de Documento"
                rules={[
                  {
                    required: true,
                    message: "Por favor, selecciona tu tipo de documento",
                  },
                ]}
                labelCol={{ span: 24 }}
                className="w-1/3 max-sm:w-full"
              >
                <Select placeholder="Tipo de Documento" size="large">
                  <Select.Option value="DNI">DNI</Select.Option>
                  <Select.Option value="CE">Carné de Extranjería</Select.Option>
                  <Select.Option value="PAS">Pasaporte</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="documentNumber"
                label="Número de Documento"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa tu número de documento",
                  },
                  { len: 8, message: "Debe tener 8 caracteres" },
                ]}
                className="w-full"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Número de Documento" size="large" />
              </Form.Item>
            </div>

            {/* Dirección */}
            <Form.Item
              name="address"
              label="Dirección"
              rules={[
                { required: true, message: "Por favor, ingresa tu dirección" },
              ]}
              labelCol={{ span: 24 }}
            >
              <Input placeholder="Dirección" size="large" />
            </Form.Item>

            <div className="flex gap-x-4 max-sm:flex-col">
              <Form.Item
                name="department"
                label="Departamento"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa el departamento",
                  },
                ]}
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Departamento" size="large" />
              </Form.Item>
              <Form.Item
                name="province"
                label="Provincia"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa la provincia",
                  },
                ]}
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Provincia" size="large" />
              </Form.Item>
              <Form.Item
                name="district"
                label="Distrito"
                rules={[
                  { required: true, message: "Por favor, ingresa el distrito" },
                ]}
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Distrito" size="large" />
              </Form.Item>
            </div>

            <div className="flex gap-x-4 max-sm:flex-col">
              <Form.Item
                name="phone"
                label="Celular"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa tu número de celular",
                  },
                  { len: 9, message: "Debe tener 9 caracteres" },
                ]}
                labelCol={{ span: 24 }}
                className="w-[40%] max-sm:w-full"
              >
                <Input placeholder="Número de Celular" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Correo Electrónico"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa tu correo electrónico",
                  },
                  { type: "email", message: "Ingresa un correo válido" },
                ]}
                labelCol={{ span: 24 }}
                className="w-full"
              >
                <Input placeholder="Correo Electrónico" size="large" />
              </Form.Item>
            </div>
          </div>

          {/* Detalle del Reclamo */}
          <div className="rounded-xl border border-gray-300 p-5 my-4 mb-10">
            <h2 className="text-sm text-gray-400 mb-3">Datos del reclamo</h2>
            <div className="flex items-center gap-x-4 max-sm:flex-col">
              <Form.Item
                name="requestType"
                label="Tipo de Solicitud"
                rules={[
                  {
                    required: true,
                    message: "Por favor, selecciona el tipo de solicitud",
                  },
                ]}
                labelCol={{ span: 24 }}
                className="max-sm:w-full"
              >
                <Radio.Group>
                  <Radio value="Reclamo">Reclamo</Radio>
                  <Radio value="Queja">Queja</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="productDetail"
                label="Detalle del Producto o Servicio"
                rules={[
                  {
                    required: true,
                    message:
                      "Por favor, ingresa el detalle del producto o servicio",
                  },
                ]}
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Producto o Servicio" size="large" />
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label="Descripción"
              rules={[
                { required: true, message: "Por favor, describe lo sucedido" },
              ]}
              labelCol={{ span: 24 }}
            >
              <TextArea rows={4} placeholder="Describe los hechos" />
            </Form.Item>

            {/* Pedido del Usuario */}
            <Form.Item
              name="userRequest"
              label="Pedido del Usuario"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Por favor, ingresa tu pedido" },
              ]}
            >
              <TextArea rows={2} placeholder="Describe tu pedido" />
            </Form.Item>

            {/* Fecha del Incidente */}
            <Form.Item
              name="incidentDate"
              label="Fecha del Incidente"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Selecciona la fecha del incidente",
                },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                className="w-full"
                placeholder="Fecha del incidente"
                size="large"
              />
            </Form.Item>
            {/* Aceptar Políticas */}
            <Form.Item
              name="privacyPolicy"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: "Debes aceptar las políticas de privacidad",
                },
              ]}
            >
              <Checkbox>
                He leído y acepto las{" "}
                <a href="#" className="text-blue-600">
                  políticas de privacidad
                </a>
                .
              </Checkbox>
            </Form.Item>

            {/* Botón Enviar */}
            <Form.Item className="text-center max-sm:mb-24">
              <button
                type="submit"
                className="w-full md:w-60 bg-blue-500 text-white py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? (
                  <Spin indicator={<LoadingOutlined spin />} />
                ) : (
                  "Enviar"
                )}
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
