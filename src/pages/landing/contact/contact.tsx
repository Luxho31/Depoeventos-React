import { useRef, useState } from "react";
import { Checkbox, Form, FormInstance, Input, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { sendMessage } from "../../../services/contact-us-service";
import { Toaster, toast } from "sonner";

export default function Contact() {
  const { Option } = Select;
  const { TextArea } = Input;

  const formRef = useRef<FormInstance | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (values: any) => {
    try {
      setLoading(true);
      await sendMessage(values);
      toast.success("Mensaje enviado correctamente");
      if (formRef.current) {
        formRef.current.resetFields();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al enviar mensaje");
    } finally {
      setLoading(false);
    }
  };

  type ContactUsType = {
    fullName?: string;
    email?: string;
    phone?: string;
    message?: string;
    privacyPolice?: boolean;
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="+51">
        <Option value="51">+51</Option>
        <Option value="58">+58</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="h-[93vh] flex w-[80%] m-auto mb-12 ">
      <Toaster richColors />
      <div className="flex-1 pt-[90px] flex flex-col items-center justify-center">
        {/* Texto introducción */}
        <div className="w-[580px] flex flex-col  mb-7">
          <h1 className="text-2xl font-semibold">Contáctanos</h1>
          <p className="">
            Anímate! Si tienes alguna duda, pregunta o sugerencia, no dudes en
            escribirnos.
          </p>
        </div>

        <Form
          name="contact-us"
          onFinish={handleSendMessage}
          onFinishFailed={() => {
            console.log("Fallo");
          }}
          className="w-[580px] max-md:mx-20 md:mx-32"
          ref={(ref) => (formRef.current = ref)}
        >
          <Form.Item<ContactUsType>
            name="fullName"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese tu nombre completo",
              },
            ]}
            className="cursor-text"
          >
            <Input
              className="w-full border rounded-xl p-2"
              placeholder="Nombre completo"
              size="large"
            />
          </Form.Item>

          {/* Input Email */}
          <Form.Item<ContactUsType>
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa tu correo electrónico.",
              },
              {
                type: "email",
                message: "Ingresa un correo electrónico válido.",
              },
            ]}
            className="cursor-text"
          >
            <Input
              className="w-full rounded-xl p-2"
              placeholder="Ingresa tu correo electrónico"
              size="large"
            />
          </Form.Item>

          {/* Input Phone */}

          <Form.Item<ContactUsType>
            name="phone"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa tu número de teléfono",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
              size="large"
              placeholder="Ingresa tu numero de celular"
            />
          </Form.Item>

          {/* Input Message */}
          <Form.Item<ContactUsType>
            name="message"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa tu mensaje",
              },
            ]}
            className="cursor-text"
          >
            <TextArea
              rows={4}
              placeholder="Ingresa tu mensaje..."
              size="large"
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>

          {/* Checkbox para aceptar politicas de privacidad */}
          <Form.Item<ContactUsType> name="privacyPolice">
            <Checkbox>
              He leido y acepto las politicas de privacidad{" "}
              <span className="text-red-500">*</span>
            </Checkbox>
          </Form.Item>

          {/* Botón para enviar mensaje */}
          <Form.Item className="w-full flex justify-center">
            <button
              type="submit"
              className="w-72 h-14 bg-[#5aa8c4] text-white font-semibold rounded-md p-4"
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
      <div className="flex-1 pt-[90px] flex items-center justify-center relative">
        <div className="bg-gray-200 rounded-lg h-[90%] w-[90%] absolute"></div>
        <img
          src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
          alt="Mike Wazowski"
          className="rounded-tl-[50%] rounded-br-[50%] h-[90%] w-[90%] object-cover absolute"
        />
      </div>
    </div>
  );
}
