import { Form, Input, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LogoIcon from "../../../assets/image/logo.png";

// React Icons
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { FaKey } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import { forgotPassword } from "../../../services/forgot-password/change-password-service";

export default function ChangePassword() {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    type ChangePasswordType = {
        password?: string;
        confirmPassword?: string;
    };

    const token = window.location.pathname.split("/")[2];
    const handleChangePassword = async (values: ChangePasswordType) => {
        if (!values.password || !values.confirmPassword) {
            toast.error("Por favor ingrese su contraseña en ambos campos");
            return;
        }

        if (values.password !== values.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            form.setFields([
                {
                    name: "password",
                    errors: [""],
                },
                {
                    name: "confirmPassword",
                    errors: [""],
                },
            ]);
            return;
        }

        try {
            setLoading(true);
            await forgotPassword(token, values.password);
            toast.success("Contraseña cambiada con éxito");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            navigate("/login");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                console.log("Error desconocido");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center md:flex-row items-center h-screen">
            <Toaster duration={5000} richColors />
            <img
                className="w-1/4 h-screen object-cover max-md:hidden"
                src="https://media.tenor.com/AM6-qYuMWs8AAAAC/bully-maguire-emo-peter-parker.gif"
                alt=""
            />
            <div className="md:absolute top-5 left-5">
                <Link
                    // className="pointer flexNullCenter absolute top-5 left-5"
                    to="/"
                >
                    <img
                        src={LogoIcon}
                        alt="DepoEventos"
                        style={{ width: "70px", marginBottom: "30px" }}
                    />
                </Link>
            </div>

            <div className="w-full md:w-[750px] md:mx-auto px-6 ">
                <Form
                    name="change-password"
                    form={form}
                    onFinish={handleChangePassword}
                    onFinishFailed={() => {}}
                    // className="w-full md:w-[750px] mx-4 md:mx-0 md:ml-auto md:mr-auto mt-8 md:mt-0"
                >
                    <h2 className="text-3xl max-sm:text-xl max-md:text-2xl text-center font-semibold mb-8">
                        Cambiar contraseña
                    </h2>

                    <div className="flex flex-col gap-y-2 mb-8">
                        {/* Input Password */}
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese su contraseña.",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input.Password
                                className="w-full rounded-xl p-4"
                                placeholder="Ingresa tu contraseña"
                                size="large"
                                prefix={
                                    <FaKey className="site-form-item-icon me-1" />
                                }
                            />
                        </Form.Item>

                        {/* Input Password */}
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese su contraseña.",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input.Password
                                className="w-full rounded-xl p-4"
                                placeholder="Confirma tu contraseña"
                                size="large"
                                prefix={
                                    <FaKey className="site-form-item-icon me-1" />
                                }
                            />
                        </Form.Item>
                    </div>

                    <div className="w-full flex justify-center">
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
                                "Cambiar contraseña"
                            )}
                        </button>
                    </div>

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
