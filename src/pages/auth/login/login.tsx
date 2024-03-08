import { Form, Input, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LogoIcon from "../../../assets/image/logo.png";
import { useAuth } from "../../../context/AuthProvider";

// React Icons
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Toaster, toast } from "sonner";

export default function Login() {
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
            src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
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
            Bienvenido a Depo<span className="text-orange-500">Eventos</span>
          </h2>

          <div className="flex flex-col gap-y-2">
            {/* Input Email */}
            <Form.Item<LoginType>
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
                { max: 50, message: "El correo electrónico es muy largo." },
              ]}
              className="cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa tu correo electrónico"
                size="large"
                prefix={<FaEnvelope className="site-form-item-icon me-1" />}
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
                placeholder="Ingresa tu contraseña"
                size="large"
                prefix={<FaKey className="site-form-item-icon me-1" />}
              />
            </Form.Item>
          </div>

          <div className="mb-8 flex justify-end">
            <Link to={"/forgot-password"}>¿Olvide la contraseña?</Link>
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
                "Iniciar Sesión"
              )}
            </button>
          </Form.Item>

          <p className="text-center">
            Don't have an account? {""}
            <Link to="/register" className="text-gray-500">
              Sign up
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
}
