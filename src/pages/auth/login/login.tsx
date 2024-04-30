import { Form, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import LogoIcon from "../../../assets/image/logo.png";
import loginIMG from "../../../assets/auth/loginIMG.jpg";
import { useAuth } from "../../../context/AuthProvider";

// React Icons
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Toaster, toast } from "sonner";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();
  // const navigate = useNavigate();
  const [form] = Form.useForm();

  type LoginType = {
    email?: string;
    password?: string;
  };

  const handleSignIn = async (values: LoginType) => {
    try {
      setLoading(true);

      if (values.email && values.password) {
        values.email = values.email.trim();
        values.password = values.password.trim();
        values.email = values.email.toLowerCase();

        await login(values.email, values.password);
        // navigate("/");
        window.location.href = "/";
      } else {
        // Manejar el caso en el que email o password es undefined
        throw new Error("Correo o contraseña no válidos");
      }
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
    <div className="flex flex-col justify-center md:flex-row items-center h-screen">
      <Toaster richColors />
      <img
        className="w-1/4 h-screen object-cover max-md:hidden"
        src={loginIMG}
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
          onFinish={handleSignIn}
          onFinishFailed={() => {}}
        >
          <h2 className="text-3xl max-sm:text-xl max-md:text-2xl text-center font-semibold mb-8">
            Bienvenido a Depo
            <span className="text-orange-500">Eventos</span>
          </h2>
          <div className="flex flex-col gap-y-2">
            {/* Input Email */}
            <Form.Item
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
                {
                  max: 50,
                  message: "El correo electrónico es muy largo.",
                },
              ]}
            >
              <Input
                className="rounded-xl p-4"
                placeholder="Ingresa tu correo electrónico"
                size="large"
                prefix={<FaEnvelope className="site-form-item-icon me-1" />}
              />
            </Form.Item>

            {/* Input Password */}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su contraseña.",
                },
              ]}
            >
              <Input.Password
                className="rounded-xl p-4"
                placeholder="Ingresa tu contraseña"
                size="large"
                prefix={<FaKey className="site-form-item-icon me-1" />}
              />
            </Form.Item>
          </div>

          <div className="mb-8 flex justify-end">
            <Link to={"/forgot-password"}>¿Olvidaste la contraseña?</Link>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-[#f46e16] hover:bg-orange-600 text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4" //max-sm:w-full sm:px-24 py-4
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
          </div>

          <p className="text-center mt-8">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-gray-500">
              Regístrate
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
