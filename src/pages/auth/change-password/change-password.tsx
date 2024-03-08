import { Link } from "react-router-dom";
import LogoIcon from "../../../assets/image/logo.png";
import { Form, Input, Spin } from "antd";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

// React Icons
import { FaEnvelope, FaKey } from "react-icons/fa";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Toaster, toast } from "sonner";

export default function ChangePassword() {
    const [loading, setLoading] = React.useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    type LoginType = {
        email?: string;
        password?: string;
    };

    const handleSignIn = async (values: any) => {
        try {
            setLoading(true);
            console.log(values);

            await login(values.email, values.password);
            navigate("/");
        } catch (error) {
            toast.error("Correo o contraseña incorrecta");
            form.setFields([
                {
                    name: "password",
                    errors: [""],
                },
                {
                    name: "email",
                    errors: [""],
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center w-full h-screen">
                <>
                    <Toaster richColors />
                    <img
                        className="w-1/4 h-screen object-cover max-md:hidden relative"
                        src="https://media.tenor.com/AM6-qYuMWs8AAAAC/bully-maguire-emo-peter-parker.gif"
                        alt=""
                    />
                    <Link
                        className="pointer flexNullCenter absolute top-5 left-5"
                        to="/"
                    // smooth={true}
                    >
                        <img
                            src={LogoIcon}
                            alt="DepoEventos"
                            style={{ width: "70px", marginBottom: "30px" }}
                        />
                    </Link>
                </>

                <Form
                    name="login"
                    form={form}
                    onFinish={handleSignIn}
                    onFinishFailed={() => {
                        console.log("Fallo");
                    }}
                    className="w-[750px] max-md:mx-20 md:mx-32"
                >
                    <h2 className="text-3xl text-center font-semibold mb-8">
                        Cambiar contraseña
                    </h2>

                    <div className="flex flex-col gap-y-2">
                        {/* Input Password */}
                        <Form.Item<LoginType>
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
                                prefix={<FaKey className="site-form-item-icon me-1" />}
                            />
                        </Form.Item>

                        {/* Input Password */}
                        <Form.Item<LoginType>
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
                                placeholder="Confirma tu contraseña"
                                size="large"
                                prefix={<FaKey className="site-form-item-icon me-1" />}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item className="w-full flex justify-center">
                        <button
                            type="submit"
                            className="w-96 bg-[#f46e16] text-white font-semibold rounded-xl  !h-12"
                            disabled={loading}
                        >
                            {loading ? (
                                <Spin
                                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                                />
                            ) : (
                                "Cambiar contraseña"
                            )}
                        </button>
                    </Form.Item>

                    <p className="text-center">
                        Volver a {""}
                        <Link to="/login" className="text-gray-500">
                            Sign in
                        </Link>
                    </p>
                </Form>
            </div>
        </>
    );
}
