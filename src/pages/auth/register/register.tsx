import { Link, useNavigate } from "react-router-dom";
import LogoIcon from "../../../assets/image/logo.png";

import { DatePicker, Form, Input, InputNumber, Select, Spin } from "antd";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa";

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

import { LoadingOutlined } from "@ant-design/icons";
import useForm from "antd/es/form/hooks/useForm";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { COUNTRIES } from "../../../components/selectors/country-selector/countries";
import { useAuth } from "../../../context/AuthProvider";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const [paso, setPaso] = useState(1);
    const [formData, setFormData] = useState<RegisterType>({});
    const [selectedDocumentType, setSelectedDocumentType] = useState<
        string | undefined
    >(undefined);
    const [form] = useForm();

    type RegisterType = {
        firstName?: string;
        lastName?: string;
        motherLastName?: string;
        documentType?: string;
        documentNumber?: string;
        contactNumber?: string;
        emergencyContactNumber?: string;
        birthDate?: string;
        country?: string;
        username?: string;
        password?: string;
    };

    const disabledDate = (current: any) => {
        return current && current > moment().subtract(18, "years");
    };

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
                birthDate: values.birthDate.format("YYYY-MM-DD"),
                address: "-",
            };

            await register(finalFormData);

            navigate("/");
        } catch (error: any) {
            toast.error(error.message);
            if (error.message === "El correo electrónico ya está en uso") {
                form.setFields([
                    {
                        name: "username",
                        errors: ["El correo electrónico ya está en uso"],
                    },
                ]);
            } else if (
                error.message === "El número de documento ya está en uso"
            ) {
                form.setFields([
                    {
                        name: "documentNumber",
                        errors: ["El número de documento ya está en uso"],
                    },
                ]);
            } else {
                toast.error("Error al registrar el usuario");
            }
        } finally {
            setLoading(false);
        }
    };

	return (
        <div className="flex flex-col md:flex-row items-center h-screen max-md:mt-24">
            <Toaster richColors />
            {/* <div className="w-1/4 h-screen object-cover max-md:hidden"> */}
            <img
                className="w-1/4 h-screen object-cover max-md:hidden relative"
                src="https://media.tenor.com/FWAw0kfPBZoAAAAM/regular-show-rigby.gif"
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
            <div className="w-full md:w-[750px] md:mx-auto px-6">
                {/* <div className="relative mb-10">
                    {paso === 2 && (
                        <button
                            type="button"
                            onClick={() => setPaso(paso - 1)}
                            className="absolute left-32 font-semibold rounded-xl p-4 duration-300 hover:bg-gray-200 hover:duration-300 hover:animate-pulse"
                        >
                            <FaChevronLeft className="text-2xl" />
                        </button>
                    )}
                </div> */}
                <Form
                    name="firstStep"
                    onFinish={(values) => {
                        onFinishStep1(values);
                    }}
                    autoComplete="off"
                    // className="w-full max-w-lg mx-auto"
                    form={form}
                >
                    <div className="relative mb-8">
                        {paso === 2 && (
                            <button
                                type="button"
                                onClick={() => setPaso(paso - 1)}
                                className="absolute -top-2 left-0 font-semibold rounded-xl p-4 duration-300 hover:bg-gray-200 hover:duration-300 hover:animate-pulse"
                            >
                                <FaChevronLeft className="text-2xl" />
                            </button>
                        )}
                        <div className="w-full">
                            <h2 className="text-3xl max-sm:text-xl max-md:text-2xl text-center font-semibold ">
                                Crea una Cuenta
                            </h2>
                        </div>
                    </div>
                    <div
                        // className={`grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-8 ${
                        className={`flex flex-col  gap-y-2 mb-8 ${
                            paso === 1 ? "block" : "hidden"
                        }`}
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
                                    message:
                                        "El nombre no puede tener más de 50 caracteres",
                                },
                            ]}
                            className="col-span-2 cursor-text"
                        >
                            <Input
                                className="w-full border rounded-xl p-4"
                                placeholder="Nombre"
                                size="large"
                                maxLength={51}
                                prefix={
                                    <FaUser className="site-form-item-icon me-1" />
                                }
                            />
                        </Form.Item>

                        <div className="flex gap-x-4 max-sm:flex-col">
                            {/* ------------------Input Apellido Paterno------------------ */}
                            <Form.Item<RegisterType>
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Por favor ingrese su apellido paterno",
                                    },
                                    {
                                        max: 50,
                                        message:
                                            "El apellido no puede tener más de 50 caracteres",
                                    },
                                ]}
                                className="w-full cursor-text"
                            >
                                <Input
                                    className="w-full border rounded-xl p-4"
                                    placeholder="Apellido Paterno"
                                    size="large"
                                    maxLength={51}
                                    prefix={
                                        <FaUser className="site-form-item-icon me-1" />
                                    }
                                />
                            </Form.Item>

                            {/* ------------------Input Apellido Materno------------------ */}
                            <Form.Item<RegisterType>
                                name="motherLastName"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Por favor ingrese su apellido materno",
                                    },
                                    {
                                        max: 50,
                                        message:
                                            "El apellido no puede tener más de 50 caracteres",
                                    },
                                ]}
                                className="w-full cursor-text"
                            >
                                <Input
                                    className="w-full border rounded-xl p-4"
                                    placeholder="Apellido Materno"
                                    size="large"
                                    maxLength={51}
                                    prefix={
                                        <FaUser className="site-form-item-icon me-1" />
                                    }
                                />
                            </Form.Item>
                        </div>

                        <div className="flex gap-x-4 max-sm:flex-col">
                            {/* ------------------Input Tipo de Documento------------------ */}
                            <Form.Item<RegisterType>
                                name="documentType"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Por favor ingrese su tipo de documento",
                                    },
                                ]}
                                className="w-full"
                            >
                                <Select
                                    placeholder="Tipo de Documento"
                                    className="w-full !h-16"
                                    // style={{ width: 120 }}
                                    size="large"
                                    options={[
                                        { value: "DNI", label: "DNI" },
                                        {
                                            value: "PASSPORT",
                                            label: "Pasaporte",
                                        },
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
                                        message:
                                            "Por favor ingrese su número de documento",
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("");
                                            } else if (
                                                selectedDocumentType ===
                                                    "DNI" &&
                                                !/^\d{8}$/.test(value)
                                            ) {
                                                return Promise.reject(
                                                    "El DNI debe tener 8 dígitos"
                                                );
                                            } else if (
                                                selectedDocumentType ===
                                                    "PASSPORT" &&
                                                !/^[A-Za-z0-9]{6,10}$/.test(
                                                    value
                                                )
                                            ) {
                                                return Promise.reject(
                                                    "El pasaporte debe tener entre 6 y 10 caracteres alfanuméricos"
                                                );
                                            } else if (
                                                selectedDocumentType ===
                                                    "CARNET DE EXTRANJERIA" &&
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
                                className="w-full cursor-text"
                            >
                                <Input
                                    className="w-full border rounded-xl py-5 px-4"
                                    placeholder="Número de Documento"
                                    size="large"
                                    prefix={
                                        <FaAddressCard className="site-form-item-icon me-1" />
                                    }
                                    disabled={
                                        selectedDocumentType === undefined
                                    }
                                    maxLength={
                                        selectedDocumentType === "DNI"
                                            ? 8
                                            : selectedDocumentType ===
                                              "PASSPORT"
                                            ? 10
                                            : selectedDocumentType ===
                                              "CARNET DE EXTRANJERIA"
                                            ? 9
                                            : undefined
                                    }
                                />
                            </Form.Item>
                        </div>

                        {/* ------------------Input Correo Electronico------------------ */}
                        <Form.Item<RegisterType>
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Por favor ingrese su correo electrónico",
                                },
                                {
                                    type: "email",
                                    message:
                                        "Ingrese un correo electrónico válido",
                                },
                            ]}
                            className="col-span-2 cursor-text"
                        >
                            <Input
                                className="w-full border rounded-xl p-4"
                                placeholder="Correo Electrónico"
                                size="large"
                                prefix={
                                    <FaEnvelope className="site-form-item-icon me-1" />
                                }
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
                                prefix={
                                    <FaKey className="site-form-item-icon me-1" />
                                }
                            />
                        </Form.Item>
                    </div>
                    {paso === 1 && (
                        <Form.Item className="w-full flex justify-center">
                            <button
                                type="submit"
                                className="flex items-center gap-x-2 bg-[#f46e16] hover:bg-orange-600 text-white font-semibold rounded-xl px-32 max-md:px-24 py-4"
                            >
                                Siguiente
                                <FaArrowRight className="ms-1" />
                            </button>
                        </Form.Item>
                    )}
                </Form>
                <Form
                    name="register"
                    onFinish={onFinishStep2}
                    autoComplete="off"
                    // className="w-full max-w-lg mx-auto"
                >
                    <div
                        // className={`grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-8 ${
                        className={`flex flex-col  gap-y-2 mb-8 ${
                            paso === 2 ? "block" : "hidden"
                        }`}
                    >
                        <div className="flex gap-x-4 max-sm:flex-col">
                            {/* ------------------Input Número de Contacto------------------ */}
                            <Form.Item<RegisterType>
                                name="contactNumber"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Por favor ingrese su número de contacto",
                                    },
                                ]}
                                className="w-full cursor-text"
                            >
                                <InputNumber
                                    className="w-full border rounded-xl py-3 px-4"
                                    placeholder="Número de Contacto"
                                    size="large"
                                    maxLength={9}
                                    prefix={
                                        <FaPhone className="site-form-item-icon me-1" />
                                    }
                                />
                            </Form.Item>

                            {/* ------------------Input Número de Emergencia------------------ */}
                            <Form.Item<RegisterType>
                                name="emergencyContactNumber"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Por favor ingrese su número de emergencia",
                                    },
                                ]}
                                className="w-full cursor-text"
                            >
                                <InputNumber
                                    className="w-full border rounded-xl py-3 px-4"
                                    placeholder="Número de Emergencia"
                                    size="large"
                                    maxLength={9}
                                    prefix={
                                        <FaPhone className="site-form-item-icon me-1" />
                                    }
                                />
                            </Form.Item>
                        </div>

                        <div className="flex gap-x-4 max-sm:flex-col">
                            {/* ------------------Input País------------------ */}
                            <Form.Item
                                name="country"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor seleccione su país",
                                    },
                                ]}
                                className="w-full"
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
                                            .localeCompare(
                                                (
                                                    optionB?.label ?? ""
                                                ).toLowerCase()
                                            )
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
                                        message:
                                            "Por favor ingrese su fecha de nacimiento",
                                    },
                                ]}
                                className="w-full cursor-text"
                            >
                                <DatePicker
                                    className="w-full border rounded-xl p-4"
                                    placeholder="Fecha de Nacimiento"
                                    size="large"
                                    allowClear={false}
                                    disabledDate={disabledDate}
                                />
                            </Form.Item>
                        </div>

                        {/* ------------------Input Dirección------------------ */}
                        {/* <Form.Item<RegisterType>
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
                  className="w-full border rounded-xl p-4 hidden"
                  placeholder="Dirección"
                  size="large"
                  prefix={
                    <FaMapMarkerAlt className="site-form-item-icon me-1" />
                  }
                />
              </Form.Item> */}
                    </div>
                    {paso === 2 && (
                        <Form.Item className="w-full flex justify-center">
                            <button
                                type="submit"
                                className="bg-[#f46e16] hover:bg-orange-600 text-white font-semibold rounded-xl px-32 max-md:px-24 py-4"
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
                                    "Registrarse"
                                )}
                            </button>
                        </Form.Item>
                    )}

                    <p className="text-center mb-8">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="text-gray-500">
                            Iniciar sesión
                        </Link>
                    </p>
                </Form>
            </div>
            {/* </div> */}
        </div>
    );
}
