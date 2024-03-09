import { LoadingOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, InputNumber, Select, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { COUNTRIES } from "../../../components/selectors/country-selector/countries";
import moment from "moment";

// React Icons
import {
    FaAddressCard,
    FaEnvelope,
    FaKey,
    FaMapMarkerAlt,
    FaPhone,
    FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [form] = useForm();
    const [selectedDocumentType, setSelectedDocumentType] = useState<
        string | undefined
    >(undefined);

    type RegisterType = {
        firstName?: String;
        lastName?: String;
        motherLastName?: String;
        documentType?: String;
        documentNumber?: String;
        contactNumber?: String;
        emergencyContactNumber?: String;
        address?: String;
        birthDate?: String;
        country?: String;
        username?: String;
        password?: String;
    };

    const disabledDate = (current: any) => {
        return current && current > moment().subtract(18, "years");
    };


    return (
        <div className="flex">
            <div className="w-1/3 flex flex-col items-center">
                <div className="w-80 h-80 rounded-full border-4 mb-8">
                    <img
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                    alt=""
                    className="w-full"
                    />
                </div>
                <button className="px-12 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600">Editar Foto</button>
            </div>
            <div className="w-full">
                {/* Formulario 1 */}
                <Form
                    name="firstStep"
                    autoComplete="off"
                    className="w-[750px] flex flex-col max-md:mx-20 md:mx-32"
                    form={form}
                >
                    <div
                        className={`grid grid-cols-2 gap-x-4 gap-y-2`}
                    >
                        {/* ------------------Input Nombre------------------ */}
                        <Form.Item<RegisterType>
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese su nombre",
                                },
                                {
                                    max: 50,
                                    message: "El nombre no puede tener más de 50 caracteres",
                                },
                            ]}
                            className="col-span-2 cursor-text"
                        >
                            <Input
                                className="w-full border rounded-xl p-4"
                                placeholder="Nombre"
                                size="large"
                                maxLength={51}
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
                                {
                                    max: 50,
                                    message: "El apellido no puede tener más de 50 caracteres",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input
                                className="w-full border rounded-xl p-4"
                                placeholder="Apellido Paterno"
                                size="large"
                                maxLength={51}
                                prefix={<FaUser className="site-form-item-icon me-1" />}
                            />
                        </Form.Item>

                        {/* ------------------Input Apellido Materno------------------ */}
                        <Form.Item<RegisterType>
                            name="motherLastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese su apellido materno",
                                },
                                {
                                    max: 50,
                                    message: "El apellido no puede tener más de 50 caracteres",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input
                                className="w-full border rounded-xl p-4"
                                placeholder="Apellido Materno"
                                size="large"
                                maxLength={51}
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
                                    { value: "PASSPORT", label: "Pasaporte" },
                                    {
                                        value: "CARNET DE EXTRANJERIA",
                                        label: "Carnet de Extranjería",
                                    },
                                ]}
                                onChange={(value) => {
                                    setSelectedDocumentType(value);
                                    form.setFieldsValue({
                                        documentNumber: undefined,
                                    });
                                }}
                            />
                        </Form.Item>

                        {/* ------------------Input Número de Documento------------------ */}
                        <Form.Item<RegisterType>
                            name="documentNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese su número de documento",
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("");
                                        } else if (
                                            selectedDocumentType === "DNI" &&
                                            !/^\d{8}$/.test(value)
                                        ) {
                                            return Promise.reject("El DNI debe tener 8 dígitos");
                                        } else if (
                                            selectedDocumentType === "PASSPORT" &&
                                            !/^[A-Za-z0-9]{6,10}$/.test(value)
                                        ) {
                                            return Promise.reject(
                                                "El pasaporte debe tener entre 6 y 10 caracteres alfanuméricos"
                                            );
                                        } else if (
                                            selectedDocumentType === "CARNET DE EXTRANJERIA" &&
                                            !/^\d{9}$/.test(value)
                                        ) {
                                            return Promise.reject(
                                                "El carné de extranjería debe tener 9 dígitos"
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input
                                className="w-full border rounded-xl py-5 px-4"
                                placeholder="Número de Documento"
                                size="large"
                                prefix={
                                    <FaAddressCard className="site-form-item-icon me-1" />
                                }
                                disabled={selectedDocumentType === undefined}
                                maxLength={
                                    selectedDocumentType === "DNI"
                                        ? 8
                                        : selectedDocumentType === "PASSPORT"
                                            ? 10
                                            : selectedDocumentType === "CARNET DE EXTRANJERIA"
                                                ? 9
                                                : undefined
                                }
                            />
                        </Form.Item>

                        {/* ------------------Input Correo Electronico------------------ */}
                        <Form.Item<RegisterType>
                            name="username"
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
                                {
                                    pattern: new RegExp(
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;^_(){}[\]:;<>'"\\/~`+\-=|]).{8,}$/
                                    ),
                                    message:
                                        "La contraseña debe tener al menos 8 caracteres, una letra mayuscula y minuscula y un caracter especial",
                                },
                                {
                                    max: 30,
                                    message:
                                        "La contraseña no puede tener más de 30 caracteres",
                                },
                            ]}
                            className="col-span-2 cursor-text"
                        >
                            <Input.Password
                                className="w-full border rounded-xl p-4"
                                placeholder="Contraseña"
                                size="large"
                                maxLength={31}
                                prefix={<FaKey className="site-form-item-icon me-1" />}
                            />
                        </Form.Item>


                        {/* ------------------Input Número de Contacto------------------ */}
                        <Form.Item<RegisterType>
                            name="contactNumber"
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
                                maxLength={9}
                                prefix={<FaPhone className="site-form-item-icon me-1" />}
                            />
                        </Form.Item>

                        {/* ------------------Input Número de Emergencia------------------ */}
                        <Form.Item<RegisterType>
                            name="emergencyContactNumber"
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
                                maxLength={9}
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
                                placeholder="País de nacimiento"
                                optionFilterProp="children"
                                className="w-full caret-transparent !h-14"
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
                            name="birthDate"
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
                                allowClear={false}
                                disabledDate={disabledDate}
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
                                prefix={
                                    <FaMapMarkerAlt className="site-form-item-icon me-1" />
                                }
                            />
                        </Form.Item>
                    </div>

                    {/* ------------------Botón de Registro------------------ */}

                    <div className="flex justify-between">
                        <Form.Item className="">
                            <button
                                type="submit"
                                className="w-60 bg-gray-950 text-white font-semibold rounded-xl p-4 hover:bg-gray-700"
                            >
                                {loading ? (
                                    <Spin
                                        indicator={
                                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                                        }
                                    />
                                ) : (
                                    "Reestablecer Cambios"
                                )}
                            </button>
                        </Form.Item>
                        <Form.Item className="">
                            <button
                                type="submit"
                                className="w-60 bg-blue-500 text-white font-semibold rounded-xl p-4 hover:bg-blue-600"
                            >
                                {loading ? (
                                    <Spin
                                        indicator={
                                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                                        }
                                    />
                                ) : (
                                    "Guardar Cambios"
                                )}
                            </button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}