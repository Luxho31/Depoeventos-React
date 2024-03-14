import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Form,
  GetProp,
  Input,
  InputNumber,
  Select,
  Spin,
  Upload,
  UploadProps,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { COUNTRIES } from "../../../components/selectors/country-selector/countries";

// React Icons
import {
  FaAddressCard,
  FaMapMarkerAlt,
  FaPen,
  FaPhone,
  FaSave,
  FaUser,
} from "react-icons/fa";
import { getUserInfo } from "../../../services/basic-service";
import { updateUserInfo } from "../../../services/profile-service";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const [fieldsEnabled, setFieldsEnabled] = useState(false);
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
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token).then((data) => {
        const { birthDate, ...userData } = data;
        form.setFieldsValue(userData);
      });
    }
  }, []);

  // Funcionalidad de subida de imagen
  // const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const updateUserInformation = async (data: any) => {
    try {
      setLoading(true);
      updateUserInfo(data, data.id).then((res) => {
        console.log(res);
      });
      getUserInfo(localStorage.getItem("token")).then((data) => {
        const { birthDate, ...userData } = data;
        form.setFieldsValue(userData);
      });
    } catch (error) {
      console.error("Error al actualizar datos de usuario:", error);
      throw error;
    } finally {
      setLoading(false);
      setFieldsEnabled(false);
    }
  };

  // Funcionalidad de deshabilitar los campos

  const toggleFields = () => {
    setFieldsEnabled(!fieldsEnabled);
  };

  const resetForm = () => {
    setFieldsEnabled(false);
    setSelectedDocumentType(undefined);
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
        {/* <button className="px-12 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600">Editar Foto</button> */}
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          disabled={!fieldsEnabled}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
      <div className="w-full">
        {/* Formulario 1 */}
        <Form
          name="firstStep"
          autoComplete="off"
          className="w-[750px] flex flex-col max-md:mx-20 md:mx-32"
          form={form}
          disabled={!fieldsEnabled}
          onFinish={(values) => {
            updateUserInformation(values);
          }}
        >
          <div className={`grid grid-cols-2 gap-x-4 gap-y-2`}>
            {/* ------------------Input Nombre------------------ */}
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
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
                prefix={<FaAddressCard className="site-form-item-icon me-1" />}
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

          <div className="flex justify-between">
            {/* ------------------Botón de Editar y Cancelar------------------ */}
            <Form.Item className="">
              <button
                type="button"
                className={`w-60 ${
                  fieldsEnabled
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-gray-950 hover:bg-gray-700"
                } flex justify-center text-white font-semibold rounded-xl p-4`}
                onClick={fieldsEnabled ? resetForm : toggleFields}
              >
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : fieldsEnabled ? (
                  "Cancelar"
                ) : (
                  <>
                    <FaPen className="me-2" />
                    Editar
                  </>
                )}
              </button>
            </Form.Item>
            {/* ------------------Botón de Guardar Cambios------------------ */}
            <Form.Item className="">
              <button
                type="submit"
                className={`w-60 ${
                  fieldsEnabled
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-300"
                } flex justify-center text-white font-semibold rounded-xl p-4`}
                disabled={!fieldsEnabled}
              >
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  <>
                    <FaSave className="me-2" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
