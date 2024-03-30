import { LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Form, FormInstance, Input, Select, Spin } from "antd";
import { useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { sendMessage } from "../../../services/contact-us-service";

type ContactUsType = {
    fullName: string;
    email: string;
    phone: string;
    message: string;
    privacyPolice: boolean;
};

export default function Contact() {
    const { Option } = Select;
    const { TextArea } = Input;

    const formRef = useRef<FormInstance | null>(null);

    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (values: ContactUsType) => {
        try {
            setLoading(true);
            await sendMessage(values);
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



    const prefixSelector = (
        <Form.Item
            name="prefix"
            noStyle
            rules={[
                {
                    required: true,
                    message: "Por favor, ingresa el prefijo de tu país",
                },
            ]}
        >
            <Select style={{ width: 70 }}>
                <Option value="51">+51</Option>
                <Option value="58">+58</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center">
            <Toaster richColors />
            <div className="lg:w-1/2 px-4 lg:px-0 pt-12 lg:pt-0">
                {/* Texto introducción */}
                <div className="max-w-lg mx-auto mb-7">
                    <h1 className="text-2xl lg:text-3xl font-semibold text-center lg:text-left">
                        Contáctanos
                    </h1>
                    <p className="text-center lg:text-left">
                        Anímate! Si tienes alguna duda, pregunta o sugerencia,
                        no dudes en escribirnos.
                    </p>
                </div>

                <Form
                    name="contact-us"
                    onFinish={handleSendMessage}
                    onFinishFailed={() => { }}
                    className="max-w-lg mx-auto"
                    ref={(ref) => (formRef.current = ref)}
                >
                    <Form.Item
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor, ingrese tu nombre completo",
                            },
                        ]}
                    >
                        <Input
                            className="w-full border rounded-xl p-2"
                            placeholder="Nombre completo"
                            size="large"
                        />
                    </Form.Item>

                    {/* Input Email */}
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor, ingresa tu correo electrónico.",
                            },
                            {
                                type: "email",
                                message:
                                    "Ingresa un correo electrónico válido.",
                            },
                        ]}
                    >
                        <Input
                            className="w-full rounded-xl p-2"
                            placeholder="Ingresa tu correo electrónico"
                            size="large"
                        />
                    </Form.Item>

                    {/* Input Phone */}
                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor, ingresa tu número de teléfono",
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            className="w-full rounded-xl"
                            placeholder="Ingresa tu número de celular"
                            size="large"
                        />
                    </Form.Item>

                    {/* Input Message */}
                    <Form.Item
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: "Por favor, ingresa tu mensaje",
                            },
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Ingresa tu mensaje..."
                            size="large"
                            autoSize={{ minRows: 4, maxRows: 4 }}
                        />
                    </Form.Item>

                    {/* Checkbox para aceptar políticas de privacidad */}
                    <Form.Item
                        name="privacyPolice"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Debes aceptar las políticas de privacidad",
                            },
                        ]}
                    >
                        <Checkbox>
                            He leído y acepto las políticas de privacidad{" "}
                            <span className="text-red-500">*</span>
                        </Checkbox>
                    </Form.Item>

                    {/* Botón para enviar mensaje */}
                    <Form.Item className="w-full flex justify-center">
                        <button
                            type="submit"
                            className="w-full md:w-72 h-14 bg-[#5aa8c4] text-white font-semibold rounded-md p-4"
                            disabled={loading}
                        >
                            {loading ? (
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{ fontSize: 24 }}
                                            spin
                                        />
                                    }
                                />
                            ) : (
                                "Enviar mensaje"
                            )}
                        </button>
                    </Form.Item>
                </Form>
            </div>

            <div className="lg:w-1/2 max-xl:hidden flex justify-center h-[40rem] relative">
                <div className="bg-gray-200 rounded-lg h-[80%] lg:h-full w-[70%] absolute -z-50"></div>
                <img
                    src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
                    alt="Mike Wazowski"
                    className="rounded-tl-full rounded-br-full w-[70%] object-cover"
                />
            </div>
        </div>
    );
}
