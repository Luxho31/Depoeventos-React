import { LoadingOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  // Modal,
  Select,
  Spin,
  message
} from "antd";
import { useForm } from "antd/es/form/Form";
import Compressor from "compressorjs";
import { useEffect, useState } from "react";
import { COUNTRIES } from "../../../components/selectors/country-selector/countries";
// import Cropper from "react-easy-crop";

// React Icons
import {
  FaAddressCard,
  FaMapMarkerAlt,
  FaPen,
  FaPhone,
  FaSave,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthProvider";
import {
  updateUserInfo,
  uploadProfileImage,
} from "../../../services/profile-service";

export default function Profile() {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const { getUserInfo } = useAuth();
    const [form] = useForm();
    const [fieldsEnabled, setFieldsEnabled] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [selectedDocumentType, setSelectedDocumentType] = useState<
        string | undefined
    >(undefined);
    const [photo, setPhoto] = useState("");

    type RegisterType = {
        id: number;
        firstName: string;
        lastName: string;
        motherLastName: string;
        documentType: string;
        documentNumber: string;
        contactNumber: string;
        emergencyContactNumber: string;
        address: string;
        birthDate: string;
        country: string;
        photo: string;
    };

    useEffect(() => {
        setPhoto(photo);
        handleReload();
    }, []);

    // const showModal = () => {
    //   setIsModalOpen(true);
    // };

    // const handleOk = () => {
    //   setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //   setIsModalOpen(false);
    // };
    const updateUserInformation = async (data: RegisterType) => {
        console.log(data);
        try {
            setLoading(true);
            const foto = data.photo;
            console.log(foto);
            await updateUserInfo(data, data.id);
            if (profileImage) {
                await handleImageUpload(profileImage); // Cambiado a voucherImage.originFileObj
            }
            // window.location.reload();
            handleReload();
        } catch (error) {
            console.error("Error al actualizar datos de usuario:", error);
            throw error;
        } finally {
            setLoading(false);
            setFieldsEnabled(false);
        }
    };

    const handleReload = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            await getUserInfo(token).then((data: any) => {
                const { ...userData } = data;
                form.setFieldsValue(userData);
                setPhoto(data.photo);
            });
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

    const compressFile = async (file: File) => {
        return new Promise<File>((resolve, reject) => {
            new Compressor(file, {
                quality: 0.6,

                success(result: any) {
                    resolve(result);
                },
                error(error) {
                    reject(error);
                },
            });
        });
    };
    const handleImageUpload = async (file: File) => {
        setLoading(true);
        try {
            const fileCompressed = await compressFile(file);
            console.log(fileCompressed);
            await uploadProfileImage(fileCompressed);
            message.success("Imagen de perfil subida exitosamente");
        } catch (error) {
            console.error("Error al subir la imagen del perfil:", error);
        } finally {
            setLoading(false);
        }
    };

    // const [crop, setCrop] = useState({ x: 0, y: 0 });
    // const [zoom, setZoom] = useState(1);
    // const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    //   console.log(croppedArea, croppedAreaPixels);
    // };
    return (
        <div className="flex flex-col items-center justify-center mt-12">
            {/* <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Cropper
          image={photo}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape="round"
          showGrid={false}
        />
        <div>
          <Upload
            {...propsUpload}
            disabled={!fieldsEnabled}
            maxCount={1}
            onChange={(info) => {
              const { file } = info;
              if (file.status === "done") {
                message.success(`${file.name} se subió correctamente`);
                if (file.originFileObj) {
                  setProfileImage(file.originFileObj);
                } else {
                  console.error(
                    "El archivo subido no tiene un objeto de archivo original."
                  );
                }
              } else if (file.status === "error") {
                message.error(`La subida de ${file.name} falló.`);
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Subir foto</Button>
          </Upload>
        </div>
      </Modal> */}

            {/* Formulario 1 */}
            <Form
                name="firstStep"
                autoComplete="off"
                className="w-full max-w-5xl max-lg:max-w-xl"
                form={form}
                disabled={!fieldsEnabled}
                onFinish={(values) => {
                    updateUserInformation(values);
                }}
            >
                <div className="flex flex-col max-lg:items-center lg:flex-row gap-16">
                    {/* Sección de imagen de perfil y carga */}
                    <div className="flex flex-col items-center ">
                        <div className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 rounded-full border-4 mb-8 overflow-hidden">
                            <img
                                src={photo}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* <button onClick={showModal}>Open Modal</button> */}
                        <input
                            type="file"
                            name="photo"
                            onChange={(e) => {
                                if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                ) {
                                    const file = e.target.files[0];
                                    setProfileImage(file);
                                }
                            }}
                            accept="image/*"
                            className={`${fieldsEnabled ? "cursor-pointer" : "cursor-default"} block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none p-3 mb-8`}
                            id="file_input"
                            disabled={!fieldsEnabled}
                        />
                    </div>

                    {/* Sección de campos de formulario */}
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col gap-y-2 mb-8">
                            {/* ------------------Input Nombre------------------ */}
                            <Form.Item name="id" hidden>
                                <Input />
                            </Form.Item>
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
                                    label="Apellido Paterno"
                                    labelCol={{ span: 24 }}
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
                                    label="Apellido Materno"
                                    labelCol={{ span: 24 }}
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
                                    label="Tipo de Documento"
                                    labelCol={{ span: 24 }}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Por favor ingrese su tipo de documento",
                                        },
                                    ]}
                                    className="w-full cursor-text"
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
                            <div className="flex gap-x-4 max-sm:flex-col">
                                {/* ------------------Input Número de Contacto------------------ */}
                                <Form.Item<RegisterType>
                                    name="contactNumber"
                                    label="Número de Contacto"
                                    labelCol={{ span: 24 }}
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
                                    label="Número de Emergencia"
                                    labelCol={{ span: 24 }}
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

                            {/* ------------------Input Dirección------------------ */}
                            <Form.Item<RegisterType>
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Por favor ingrese su dirección",
                                    },
                                ]}
                                className="hidden col-span-2 cursor-text"
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

                        <div className="flex justify-between max-sm:flex-col-reverse max-sm:gap-8">
                            {/* ------------------Botón de Editar y Cancelar------------------ */}

                            <button
                                type="button"
                                className={`${
                                    fieldsEnabled
                                        ? "bg-red-500 hover:bg-red-700"
                                        : "bg-gray-950 hover:bg-gray-700"
                                } flex justify-center items-center text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4`}
                                onClick={
                                    fieldsEnabled ? resetForm : toggleFields
                                }
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
                                ) : fieldsEnabled ? (
                                    "Cancelar"
                                ) : (
                                    <>
                                        <FaPen className="me-2" />
                                        Editar
                                    </>
                                )}
                            </button>

                            {/* ------------------Botón de Guardar Cambios------------------ */}

                            <button
                                type="submit"
                                className={`${
                                    fieldsEnabled
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-blue-300"
                                } flex justify-center items-center text-white font-semibold rounded-xl max-sm:w-full sm:px-16 py-4`}
                                disabled={!fieldsEnabled}
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
                                    <>
                                        <FaSave className="me-2" />
                                        Guardar Cambios
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}
