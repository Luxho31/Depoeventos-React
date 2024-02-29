import { Link } from "react-router-dom";
import LogoIcon from "../../../../assets/logo.png";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";

// React Icons
import { FaUser, FaAddressCard, FaEnvelope, FaKey, FaPhone, FaMapMarkedAlt, FaMapMarkerAlt } from "react-icons/fa";

import { useState } from "react";

export default function Register() {
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

    const onFinish = (values: any) => {
        values.birth_date = values.birth_date.format("YYYY-MM-DD");

        console.log("Success:", values);
    };

    const [paso, setPaso] = useState(1);

    const handleNextStep = () => {
        setPaso(paso + 1);
    };

    // Para el input select
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

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

                <Form
                    name="register"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="w-[750px] flex flex-col max-md:mx-20 md:mx-32"
                >
                    <h2 className="text-3xl text-center font-semibold mb-8">
                        Crea una Cuenta
                    </h2>
                    <div className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${paso === 1 ? "block" : "hidden"}`}>
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
                            {/* <Select
                                    size="large"
                                    className="w-full border rounded-xl bg-indigo-500 h-full"
                                    placeholder="Tipo de Documento"
                                >
                                    <Select.Option value="DNI">DNI</Select.Option>
                                    <Select.Option value="PASSPORT">Passport</Select.Option>
                                </Select> */}

                            <Select
                                placeholder="Tipo de Documento"
                                className="w-full !h-16"
                                // style={{ width: 120 }}
                                size="large"
                                onChange={handleChange}
                                options={[
                                    { value: 'jack', label: 'Jack' },
                                    { value: 'lucy', label: 'Lucy' },
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
                    </div>

                    <div className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${paso === 2 ? "block" : "hidden"}`}>
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
                        <Form.Item<RegisterType>
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese su país",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input
                                className="w-full border rounded-xl p-4"
                                placeholder="País"
                                size="large"
                                prefix={<FaMapMarkedAlt className="site-form-item-icon me-1" />}
                            />
                        </Form.Item>

                        {/* ------------------Input Fecha de Nacimiento------------------ */}
                        <Form.Item<RegisterType>
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

                    {/* ------------------Botón de Siguiente------------------ */}
                    {paso === 1 && (
                        <Form.Item>
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="w-full bg-[#0D0C22] text-white font-semibold rounded-xl p-4"
                            >
                                Siguiente
                            </button>
                        </Form.Item>
                    )}
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
                                    Registrarse
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
