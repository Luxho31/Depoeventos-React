import { Link, useNavigate } from "react-router-dom";
import LogoIcon from "../../../assets/image/logo.png";
import registerIMG from "../../../assets/auth/registerIMG.jpg";

import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Tooltip,
} from "antd";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa";

import dayjs, { Dayjs } from "dayjs";

// React Icons
import {
  FaAddressCard,
  FaEnvelope,
  FaKey,
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
    birthDate?: Dayjs;
    country?: string;
    username?: string;
    password?: string;
    passwordRepeat?: string;
  };

  const disabledDate = (current: Dayjs | undefined): boolean => {
    return (
      current !== undefined &&
      current.isAfter(dayjs().subtract(18, "years"), "day")
    );
  };

  const removeDiacritics = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const capitalizeFirstLetter = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const onFinishStep1 = (values: RegisterType) => {
    values.username = capitalizeFirstLetter(values.username ?? "");
    values.firstName = capitalizeFirstLetter(values.firstName ?? "");
    values.lastName = capitalizeFirstLetter(values.lastName ?? "");
    values.motherLastName = capitalizeFirstLetter(values.motherLastName ?? "");
    values.username = values.username?.toLowerCase();
    console.log("Primer paso", values);
    setFormData({
      ...formData,
      ...values,
    });
    setPaso(paso + 1);
  };
  const onFinishStep2 = async (values: RegisterType) => {
    try {
      setLoading(true);
      const finalFormData = {
        ...formData,
        ...values,
        birthDate: values.birthDate?.format("YYYY-MM-DD"),
        address: "-",
      };

      await register(finalFormData);

      toast.success("Usuario registrado correctamente");

      navigate("/login");
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorMessage = (error as Error).message;
        toast.error(errorMessage);

        if (errorMessage === "El correo electrónico ya está en uso") {
          form.setFields([
            {
              name: "username",
              errors: ["El correo electrónico ya está en uso"],
            },
          ]);
        } else if (errorMessage === "El número de documento ya está en uso") {
          form.setFields([
            {
              name: "documentNumber",
              errors: ["El número de documento ya está en uso"],
            },
          ]);
        } else {
          toast.error("Error al registrar el usuario");
        }
      } else {
        // Si el error no tiene una propiedad 'message' o no es un objeto, se maneja aquí
        toast.error("Error desconocido al registrar el usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  const defaultPickerValue = dayjs().subtract(18, "years");

  return (
    <div className="flex flex-col justify-center md:flex-row items-center max-md:my-8">
      <Toaster richColors />
      {/* <div className="w-1/4 h-screen object-cover max-md:hidden"> */}
      <img
        className="w-1/4 h-screen object-cover max-md:hidden relative"
        src={registerIMG}
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
      <div className="w-full h-screen md:w-[750px] md:mx-auto px-6 py-8 overflow-auto">
        <Form
          name="firstStep"
          onFinish={(values) => {
            onFinishStep1(values);
          }}
          autoComplete="off"
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
            className={`flex flex-col  gap-y-2 mb-8 ${
              paso === 1 ? "block" : "hidden"
            }`}
          >
            {/* ------------------Input Nombre------------------ */}
            <Form.Item<RegisterType>
              name="firstName"
              label="Nombre"
              labelCol={{ span: 24 }}
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

            <div className="flex gap-x-4 max-sm:flex-col">
              {/* ------------------Input Apellido Paterno------------------ */}
              <Form.Item<RegisterType>
                name="lastName"
                label="Apellido Paterno"
                labelCol={{ span: 24 }}
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
                className="w-full cursor-text"
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
                label="Apellido Materno"
                labelCol={{ span: 24 }}
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
                className="w-full cursor-text"
              >
                <Input
                  className="w-full border rounded-xl p-4"
                  placeholder="Apellido Materno"
                  size="large"
                  maxLength={51}
                  prefix={<FaUser className="site-form-item-icon me-1" />}
                />
              </Form.Item>
            </div>

            <div className="flex gap-x-4 max-sm:flex-col">
              {/* ------------------Input Tipo de Documento------------------ */}
              <Form.Item<RegisterType>
                name="documentType"
                label="Tipo de Documento"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su tipo de documento",
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
                label="Número de Documento"
                labelCol={{ span: 24 }}
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
                className="w-full cursor-text"
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
            </div>

            {/* ------------------Input Correo Electronico------------------ */}
            <Tooltip
              title="A este correo se enviarán notificaciones y confirmaciones"
              align={{ offset: [0, 25] }}
              placement="topRight"
            >
              <Form.Item<RegisterType>
                name="username"
                label="Correo Electrónico"
                labelCol={{ span: 24 }}
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
            </Tooltip>
            {/* ------------------Input Contraseña------------------ */}
            <Form.Item<RegisterType>
              name="password"
              label="Contraseña"
              labelCol={{ span: 24 }}
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
                    "La contraseña debe tener al menos 8 caracteres, un número, una letra mayuscula y minuscula y un caracter especial",
                },
                {
                  max: 30,
                  message: "La contraseña no puede tener más de 30 caracteres",
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

            <Form.Item
              name="passwordRepeat"
              label="Repetir Contraseña"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Por favor repita su contraseña",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Las contraseñas no coinciden");
                  },
                }),
              ]}
              className="col-span-2 cursor-text"
            >
              <Input.Password
                className="w-full border rounded-xl p-4"
                placeholder="Repetir Contraseña"
                size="large"
                maxLength={31}
                prefix={<FaKey className="site-form-item-icon me-1" />}
              />
            </Form.Item>
          </div>
          {paso === 1 && (
            <div className="w-full flex justify-center max-sm:justify-center">
              <button
                type="submit"
                className="flex justify-center items-center gap-x-2 bg-[#f46e16] hover:bg-orange-600 text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4"
              >
                Siguiente
                <FaArrowRight className="ms-1" />
              </button>
            </div>
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
                label="Número de Contacto"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su número de contacto",
                  },
                ]}
                className="w-full cursor-text"
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
                label="Número de Emergencia"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su número de emergencia",
                  },
                ]}
                className="w-full cursor-text"
              >
                <InputNumber
                  className="w-full border rounded-xl py-3 px-4"
                  placeholder="Número de Emergencia"
                  size="large"
                  maxLength={9}
                  prefix={<FaPhone className="site-form-item-icon me-1" />}
                />
              </Form.Item>
            </div>

            <div className="flex gap-x-4 max-sm:flex-col">
              {/* ------------------Input País------------------ */}
              <Form.Item
                name="country"
                label="País de Nacimiento"
                labelCol={{ span: 24 }}
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
                    removeDiacritics(
                      option?.label.toLowerCase() ?? ""
                    ).includes(removeDiacritics(input.toLowerCase()))
                  }
                  filterSort={(optionA, optionB) =>
                    removeDiacritics(
                      optionA?.label.toLowerCase() ?? ""
                    ).localeCompare(
                      removeDiacritics(optionB?.label.toLowerCase() ?? "")
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
                label="Fecha de Nacimiento"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su fecha de nacimiento",
                  },
                ]}
                className="w-full cursor-text"
              >
                <DatePicker<Dayjs>
                  className="w-full border rounded-xl p-4"
                  placeholder="Fecha de Nacimiento"
                  size="large"
                  allowClear={false}
                  disabledDate={disabledDate}
                  defaultPickerValue={defaultPickerValue}
                />
              </Form.Item>
            </div>
          </div>
          {paso === 2 && (
            <div className="w-full flex justify-center max-sm:justify-center">
              <button
                type="submit"
                className="bg-[#f46e16] hover:bg-orange-600 text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4"
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
            </div>
          )}

          <p className="text-center mt-8">
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
