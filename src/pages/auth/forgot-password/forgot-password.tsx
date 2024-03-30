import { Form, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import LogoIcon from "../../../assets/image/logo.png";

// React Icons
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import { sendMessage } from "../../../services/forgot-password/forgot-password-service";

export default function ForgotPassword() {
    const [loading, setLoading] = React.useState(false);
    const [form] = Form.useForm();

    type ForgotPasswordType = {
        email: string;
    };

    const handleForgotPassword = async (values: ForgotPasswordType) => {
        try {
            setLoading(true);
            await sendMessage(values);
            form.resetFields();
            toast.success("Correo enviado con éxito");
            await new Promise((resolve) => setTimeout(resolve, 10000));

            // Close the page
            window.close();
        } catch (error) {
            toast.error("Error al enviar mensaje");
            form.setFields([
                {
                    name: "email",
                    errors: ["Correo no encontrado :("],
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center md:flex-row items-center w-full h-screen">
            <Toaster richColors />
            <img
                className="w-1/4 h-screen object-cover max-md:hidden"
                src="https://i.makeagif.com/media/2-09-2019/vTwzr3.gif"
                alt=""
            />
            <div className="md:absolute top-5 left-5">
                <Link to="/">
                    <img
                        src={LogoIcon}
                        alt="DepoEventos"
                        style={{ width: "70px", marginBottom: "30px" }}
                    />
                </Link>
            </div>

            <div className="w-full md:w-[750px] md:mx-auto px-6 ">
                <Form
                    name="login"
                    form={form}
                    onFinish={handleForgotPassword}
                    onFinishFailed={() => {}}
                >
                    <h2 className="text-3xl max-sm:text-xl max-md:text-2xl text-center font-semibold mb-8">
                        Confirmanos tu correo
                    </h2>

                    <div className="flex flex-col gap-y-2 mb-8">
                        {/* Input Email */}
                        <Form.Item<ForgotPasswordType>
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
                                {
                                    max: 50,
                                    message:
                                        "El correo electrónico es muy largo.",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input
                                className="rounded-xl p-4"
                                placeholder="Ingresa tu correo electrónico"
                                size="large"
                                prefix={
                                    <FaEnvelope className="site-form-item-icon me-1" />
                                }
                            />
                        </Form.Item>
                    </div>
                    <Link
                        to={"/change-password"}
                        target="_blank"
                        className="w-full flex justify-center"
                    >
                        <button
                            type="submit"
                            className="bg-[#f46e16] hover:bg-orange-600 text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4"
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
                                "Enviar"
                            )}
                        </button>
                    </Link>

                    <p className="text-center mt-8">
                        Volver a {""}
                        <Link to="/login" className="text-gray-500">
                            Iniciar Sesión
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}
