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
    email?: string;
  };

  const handleForgotPassword = async (values: any) => {
    try {
      setLoading(true);
      await sendMessage(values);
      form.resetFields();
      toast.success("Correo enviado con éxito");
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
    <>
      <div className="flex items-center w-full h-screen">
        <>
          <Toaster richColors />
          <img
            className="w-1/4 h-screen object-cover max-md:hidden relative"
            src="https://i.makeagif.com/media/2-09-2019/vTwzr3.gif"
            alt=""
          />
          <Link className="pointer flexNullCenter absolute top-5 left-5" to="/">
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
          onFinish={handleForgotPassword}
          onFinishFailed={() => {
            console.log("Fallo");
          }}
          className="w-[750px] max-md:mx-20 md:mx-32"
        >
          <h2 className="text-3xl text-center font-semibold mb-8">
            Confirmanos tu correo
          </h2>

          <div className="flex flex-col gap-y-2">
            {/* Input Email */}
            <Form.Item<ForgotPasswordType>
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
          </div>
          <Link
            to={"/change-password"}
            target="_blank"
            className="w-full flex justify-center"
          >
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
                "Enviar"
              )}
            </button>
          </Link>

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
