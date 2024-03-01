import { Link } from "react-router-dom";
import { DatePicker, Form, Input, InputNumber, Select, Spin } from "antd";

// React Icons
import {
  FaUser,
  FaAddressCard,
  FaEnvelope,
  FaKey,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { COUNTRIES } from "../../../components/selectors/country-selector/countries";

export default function Register() {
  const [loading, setLoading] = useState(false);

  type RegisterType = {
    name?: string;
    lastName?: string;
    mothersLastName?: string;
    documentType?: string;
    document_number?: number;
    email?: string;
    password?: string;
    contact_number?: number;
    emergency_contact_number?: number;
    country?: string;
    birth_date?: string;
    address?: string;
  };

  const [formData, setFormData] = useState<RegisterType>({});

  const onFinishStep1 = (values: any) => {
    setFormData({
      ...formData,
      ...values,
    });
    setPaso(paso + 1);
  };

  const onFinishStep2 = async (values: any) => {
    try {
      setLoading(true);
      const finalFormData = {
        ...formData,
        ...values,
        birth_date: values.birth_date.format("YYYY-MM-DD"),
      };
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(finalFormData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [paso, setPaso] = useState(1);

  return (
    <>
      <div className="flex items-center w-full h-screen">
        <>
          <img
            className="w-1/4 h-screen object-cover max-md:hidden relative"
            src="https://media.tenor.com/FWAw0kfPBZoAAAAM/regular-show-rigby.gif"
            alt=""
          />
          <Link className="pointer flexNullCenter absolute top-5 left-5" to="/">
            {/* <img
                            src={LogoIcon}
                            alt="DepoEventos"
                            style={{ width: "70px", marginBottom: "30px" }}
                        /> */}
          </Link>
        </>

        <h2 className="text-3xl text-center font-semibold mb-8">
          Crea una Cuenta
        </h2>
        <div
          className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${
            paso === 1 ? "block" : "hidden"
          }`}
        >
          <Form
            name="firstStep"
            onFinish={(values) => {
              onFinishStep1(values);
            }}
            autoComplete="off"
            className="w-[750px] flex flex-col max-md:mx-20 md:mx-32"
          >
            {/* ------------------Input Nombre------------------ */}
            <Form.Item<RegisterType>
              name="name"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su nombre",
                },
              ]}
              className="col-span-2 cursor-text"
            >
              <Input
                className="w-full border rounded-xl p-4"
                placeholder="Nombre"
                size="large"
                prefix={<FaUser className="site-form-item-icon me-1" />}
              />
            </Form.Item>

            {/* ------------------Input Apellido Paterno------------------ */}
            <Form.Item<RegisterType>
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su apellido paterno",
                },
              ]}
              className="cursor-text"
            >
              <Input
                className="w-full border rounded-xl p-4"
                placeholder="Apellido Paterno"
                size="large"
                prefix={<FaUser className="site-form-item-icon me-1" />}
              />
            </Form.Item>

            {/* ------------------Input Apellido Materno------------------ */}
            <Form.Item<RegisterType>
              name="mothersLastName"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su apellido materno",
                },
              ]}
              className="cursor-text"
            >
              <Input
                className="w-full border rounded-xl p-4"
                placeholder="Apellido Materno"
                size="large"
                prefix={<FaUser className="site-form-item-icon me-1" />}
              />
            </Form.Item>

            {/* ------------------Input Tipo de Documento------------------ */}
            <Form.Item<RegisterType>
              name="documentType"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su tipo de documento",
                },
              ]}
            >
              <Select
                placeholder="Tipo de Documento"
                className="w-full !h-16"
                // style={{ width: 120 }}
                size="large"
                options={[
                  { value: "DNI", label: "DNI" },
                  { value: "PASSPORT", label: "Passport" },
                ]}
              />
            </Form.Item>

            {/* ------------------Input Número de Documento------------------ */}
            <Form.Item<RegisterType>
              name="document_number"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su número de documento",
                },
              ]}
              className="cursor-text"
            >
              <InputNumber
                className="w-full border rounded-xl py-3 px-4"
                placeholder="Número de Documento"
                size="large"
                prefix={<FaAddressCard className="site-form-item-icon me-1" />}
              />
            </Form.Item>

            {/* ------------------Input Correo Electronico------------------ */}
            <Form.Item<RegisterType>
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su correo electrónico",
                },
                {
                  type: "email",
                  message: "Ingrese un correo electrónico válido",
                },
              ]}
              className="col-span-2 cursor-text"
            >
              <Input
                className="w-full border rounded-xl p-4"
                placeholder="Correo Electrónico"
                size="large"
                prefix={<FaEnvelope className="site-form-item-icon me-1" />}
              />
            </Form.Item>

            {/* ------------------Input Contraseña------------------ */}
            <Form.Item<RegisterType>
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su contraseña",
                },
              ]}
              className="col-span-2 cursor-text"
            >
              <Input.Password
                className="w-full border rounded-xl p-4"
                placeholder="Contraseña"
                size="large"
                prefix={<FaKey className="site-form-item-icon me-1" />}
              />
            </Form.Item>

            <Form.Item className="w-full">
              <button
                type="submit"
                className="w-full bg-[#f46e16] text-white font-semibold rounded-xl p-4"
              >
                Siguiente
              </button>
            </Form.Item>
          </Form>
        </div>
        <Form
          name="register"
          onFinish={onFinishStep2}
          autoComplete="off"
          className="w-[750px] flex flex-col max-md:mx-20 md:mx-32"
        >
          <div
            className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${
              paso === 2 ? "block" : "hidden"
            }`}
          >
            {/* ------------------Input Número de Contacto------------------ */}
            <Form.Item<RegisterType>
              name="contact_number"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su número de contacto",
                },
              ]}
              className="cursor-text"
            >
              <InputNumber
                className="w-full border rounded-xl py-3 px-4"
                placeholder="Número de Contacto"
                size="large"
                prefix={<FaPhone className="site-form-item-icon me-1" />}
              />
            </Form.Item>
            {/* ------------------Input Número de Emergencia------------------ */}
            <Form.Item<RegisterType>
              name="emergency_contact_number"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su número de emergencia",
                },
              ]}
              className="cursor-text"
            >
              <InputNumber
                className="w-full border rounded-xl py-3 px-4"
                placeholder="Número de Emergencia"
                size="large"
                prefix={<FaPhone className="site-form-item-icon me-1" />}
              />
            </Form.Item>
            {/* ------------------Input País------------------ */}
            <Form.Item
              name="country"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione su país",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                className="w-full"
                size="large"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={COUNTRIES.map((country) => ({
                  value: country.title,
                  label: country.title,
                }))}
                allowClear
              />
            </Form.Item>
            {/* ------------------Input Fecha de Nacimiento------------------ */}

            <Form.Item
              name="birth_date"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su fecha de nacimiento",
                },
              ]}
              className="cursor-text"
            >
              <DatePicker
                className="w-full border rounded-xl p-4"
                placeholder="Fecha de Nacimiento"
                size="large"
              />
            </Form.Item>
            {/* ------------------Input Dirección------------------ */}
            <Form.Item<RegisterType>
              name="address"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su dirección",
                },
              ]}
              className="col-span-2 cursor-text"
            >
              <Input
                className="w-full border rounded-xl p-4"
                placeholder="Dirección"
                size="large"
                prefix={<FaMapMarkerAlt className="site-form-item-icon me-1" />}
              />
            </Form.Item>
          </div>
          <div className=" items-center gap-40">
            {/* ------------------Botón de Regresar------------------ */}
            {paso === 2 && (
              <Form.Item className="w-full">
                <button
                  type="button"
                  onClick={() => setPaso(paso - 1)}
                  className="w-full bg-[#0D0C22] text-white font-semibold rounded-xl p-4"
                >
                  Regresar
                </button>
              </Form.Item>
            )}
            {/* ------------------Botón de Registro------------------ */}
            {paso === 2 && (
              <Form.Item className="w-full">
                <button
                  type="submit"
                  className="w-full bg-[#f46e16] text-white font-semibold rounded-xl p-4"
                >
                  {loading ? (
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                    />
                  ) : (
                    "Registrarse"
                  )}
                </button>
              </Form.Item>
            )}
          </div>

          <p className=" text-center text-lg mt-8">
            Do you have an account? {""}
            <Link to="/login" className="text-gray-500">
              Sign in
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
}
