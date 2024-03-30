import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Spin,
    Upload,
    message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { useEffect, useState } from "react";
import {
    createProduct,
    getProductById,
    updateProduct,
    uploadProductImage,
} from "../../../services/products-service";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";

// Define la función getBase64
function getBase64(file: File, callback: (result: string) => void) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        if (typeof reader.result === "string") {
            callback(reader.result);
        }
    });
    reader.readAsDataURL(file);
}

type Product = {
    id: number;
    photo: string;
    name: string;
    price: number;
    description: string;
    startDate: string;
    maxStudents: number;
    campus: Campus;
    category: Category;
    startDateInscription: string;
    endDateInscription: string;
    products: Course[];
};

type Campus = {
    id: number;
    name: string;
    description: string;
};

type Category = {
    id: number;
    name: string;
    description: string;
};

type Course = {
    id: number;
    name: string;
    description: string;
};

type ProductModalProps = {
    type: string; // Tipo específico para 'type'
    id: number | undefined;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleReload: () => void;
    campuses: Campus[]; // Arreglo de objetos de tipo Campus
    categories: Category[]; // Arreglo de objetos de tipo Category
    disciplines: Course[]; // Arreglo de objetos de tipo Discipline
};

// interface FileInfo {
//     file: RcFile;
// }

export default function ProductModal({
    type,
    id,
    open,
    setOpen,
    handleReload,
    campuses,
    categories,
    disciplines,
}: ProductModalProps) {
    const [loading, setLoading] = useState(false);
    const [, setImageUrl] = useState<string | undefined>();
    const [productImage, setProductImage] = useState<File | null>(null);
    const [selectedCoursesCount, setSelectedCoursesCount] = useState(0);

    const [form] = Form.useForm();

    useEffect(() => {
        if (id) getProductByIdForm(id);
    }, [id]);

    const handleCoursesChange = (value: Product[]) => {
        setSelectedCoursesCount(value ? value.length : 0);
    };

    const getProductByIdForm = async (id: number) => {
        try {
            setLoading(true);
            const product = await getProductById(id);
            form.setFieldsValue({
                name: product.name,
                description: product.description,
                price: product.price,
                maxStudents: product.maxStudents,
                campusId: product.campus.id,
                categoryId: product.category.id,
                startDate: moment(product.startDate),
                coursesId: product.courses.map((course: Course) => course.id),
                startDateInscription: product.startDateInscription,
                endDateInscription: product.endDateInscription,
                photo: product.photo,
            });
        } catch (error) {
            console.error("Error al obtener datos del producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateProductForm = async (values: Product) => {
        try {
            setLoading(true);
            values.startDate = moment(values.startDate).format("YYYY-MM-DD");
            await updateProduct(values, id);
            setOpen(false);
            handleReload();
        } catch (error) {
            console.error("Error al actualizar un producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const createProductForm = async (values: Product) => {
        try {
            setLoading(true);
            values.startDate = moment(values.startDate).format("YYYY-MM-DD");
            values.photo = "-";
            const productId = await createProduct(values);
            if (productImage) {
                await handleImageUpload(productId.id, productImage);
            }
            setOpen(false);
            form.resetFields();
            handleReload();
        } catch (error) {
            console.error("Error al crear un producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const seeProductForm = async (id: number) => {
        try {
            setLoading(true);
            await getProductById(id);
        } catch (error) {
            console.error("Error al ver un producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const getTitle = (type: string) => {
        switch (type) {
            case "create":
                return "Crear Producto";
            case "edit":
                return "Editar Producto";
            case "see":
                return "Ver Producto";
            default:
                return "Producto";
        }
    };

    const chooseMethod = (type: string) => {
        switch (type) {
            case "create":
                return createProductForm;
            case "edit":
                return updateProductForm;
            case "see":
                return seeProductForm;
            default:
                return createProductForm;
        }
    };

    const handleImageUpload = async (productId: number, file: File) => {
        setLoading(true);
        try {
            await uploadProductImage(productId, file);
            message.success("Imagen de Product subida exitosamente");
            setProductImage(file); // Actualiza el estado con la imagen subida
            // getBase64(file.originFileObj, (imageUrl: any) => {
            //     setImageUrl(imageUrl);
            // });
            getBase64(file, (imageUrl: string | ArrayBuffer | null) => {
                if (imageUrl && typeof imageUrl === "string") {
                    setImageUrl(imageUrl);
                }
            });
        } catch (error) {
            console.error("Error al subir la imagen del producto:", error);
            message.error(
                "Error al subir la imagen del producto. Por favor, intenta de nuevo."
            );
        } finally {
            setLoading(false);
        }
    };

    const propsUpload = {
        name: "file",
        action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        headers: {
            authorization: "authorization-text",
        },
        beforeUpload: (file: File) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
                message.error("You can only upload image files!");
            }
            return isImage;
        },
        onChange(info: UploadChangeParam<UploadFile>) {
            const { file } = info;
            if (file.status === "done") {
                message.success(`${file.name} file uploaded successfully`);
                // setProductImage(file.originFileObj); // Assuming setProductImage expects a File object
                // getBase64(file.originFileObj, (imageUrl: string) => {
                //     setImageUrl(imageUrl);
                // });
            } else if (file.status === "error") {
                message.error(`${file.name} file upload failed.`);
            }
        },
    };

    return (
        <Modal
            title={getTitle(type)}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <Form
                name="productForm"
                onFinish={(values) => {
                    chooseMethod(type)(values);
                }}
                onFinishFailed={() => {}}
                className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
                form={form}
            >
                <div className="flex flex-col gap-y-2 mb-8">
                    {/* Input Nombre del Producto */}
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: selectedCoursesCount > 2,
                                message: "El nombre es requerido",
                            },
                        ]}
                        initialValue={
                            selectedCoursesCount <= 2 ? "-" : undefined
                        }
                    >
                        <div className="flex flex-col gap-y-2">
                            <label>
                                <span className="text-red-500">*</span> Nombre
                                del producto:
                            </label>
                            <Input
                                className="w-full rounded-xl p-4"
                                placeholder="Nombre del producto"
                                size="large"
                                disabled={
                                    type === "see" || selectedCoursesCount <= 2
                                }
                                // defaultValue={
                                //     selectedCoursesCount <= 2 ? "-" : undefined
                                // }
                            />
                        </div>
                    </Form.Item>

                    {/* Input Descripcion del Producto */}
                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "La descripción es requerida",
                            },
                        ]}
                    >
                        <div className="flex flex-col gap-y-2">
                            <label>
                                <span className="text-red-500">*</span>{" "}
                                Descripción:
                            </label>
                            <TextArea
                                className="w-full rounded-xl p-4"
                                placeholder="Descripción del producto"
                                size="large"
                                disabled={type === "see"}
                            />
                        </div>
                    </Form.Item>

                    <div className="flex gap-x-4 max-sm:flex-col">
                        {/* Input Disciplinas del Producto */}
                        <Form.Item
                            name="coursesId"
                            rules={[
                                {
                                    required: true,
                                    message: "Las disciplinas son requeridas",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            {/* <div className="flex flex-col gap-y-2">
                                <label>
                                    <span className="text-red-500">*</span>{" "}
                                    Disciplina:
                                </label> */}
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: "100%" }}
                                    placeholder="Por favor, selecciona las disciplinas"
                                    className="w-full h-14"
                                    options={disciplines.map(
                                        (discipline: Course) => {
                                            return {
                                                value: discipline.id,
                                                label: discipline.name,
                                            };
                                        }
                                    )}
                                    onChange={handleCoursesChange}
                                    disabled={type === "see"}
                                />
                            {/* </div> */}
                        </Form.Item>

                        {/* Input Categoria del Producto */}
                        <Form.Item
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: "La categoria es requerida",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            {/* <div className="flex flex-col gap-y-2">
                                <label>
                                    <span className="text-red-500">*</span>{" "}
                                    Categoría:
                                </label> */}
                                <Select
                                    placeholder="Seleccionar Categoria"
                                    className="w-full h-14"
                                    options={categories.map(
                                        (category: Category) => {
                                            return {
                                                value: category.id,
                                                label: category.name,
                                            };
                                        }
                                    )}
                                    disabled={type === "see"}
                                />
                            {/* </div> */}
                        </Form.Item>
                    </div>

                    {/* Input Sede del Producto */}
                    <Form.Item
                        name="campusId"
                        rules={[
                            { required: true, message: "La sede es requerida" },
                        ]}
                    >
                        {/* <div className="flex flex-col gap-y-2">
                            <label>
                                <span className="text-red-500">*</span> Sede:
                            </label> */}
                            <Select
                                placeholder="Seleccionar Sede"
                                className="w-full h-14"
                                options={campuses.map((campus: Campus) => {
                                    return {
                                        value: campus.id,
                                        label: campus.name,
                                    };
                                })}
                                disabled={type === "see"}
                            />
                        {/* </div> */}
                    </Form.Item>

                    <div className="flex gap-x-4 max-sm:flex-col">
                        {/* Input Cantidad de Estudiantes */}
                        <Form.Item
                            name="maxStudents"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "La cantidad de estudiantes es requerida",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            <div className="flex flex-col gap-y-2">
                                <label>
                                    <span className="text-red-500">*</span>{" "}
                                    Cantidad de estudiantes:
                                </label>
                                <InputNumber
                                    className="w-full rounded-xl p-2"
                                    placeholder="Cantidad de estudiantes"
                                    size="large"
                                    disabled={type === "see"}
                                />
                            </div>
                        </Form.Item>

                        {/* Input Precio del Producto */}
                        <Form.Item
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "El precio es requerido",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            <div className="flex flex-col gap-y-2">
                                <label>
                                    <span className="text-red-500">*</span>{" "}
                                    Precio:
                                </label>
                                <InputNumber
                                    className="w-full rounded-xl p-2"
                                    placeholder="Precio del producto"
                                    size="large"
                                    disabled={type === "see"}
                                />
                            </div>
                        </Form.Item>
                    </div>

                    <div className="flex gap-x-4 max-sm:flex-col">
                        {/* Input Fecha del Producto */}
                        <Form.Item
                            name="startDate"
                            rules={[
                                {
                                    required: true,
                                    message: "La fecha es requerida",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            {/* <div className="flex flex-col gap-y-2">
                                <label>
                                    <span className="text-red-500">*</span>{" "}
                                    Fecha de inicio:
                                </label> */}
                                <DatePicker
                                    className="w-full rounded-xl p-4"
                                    placeholder="Fecha de inicio del producto"
                                    size="large"
                                    disabled={type === "see"}
                                />
                            {/* </div> */}
                        </Form.Item>

                        {/* Input Foto del Producto */}
                        {type === "see" && form.getFieldValue("photo") ? (
                            <Form.Item
                                name="photo"
                                label="Foto del Producto"
                                className="w-full cursor-text"
                            >
                                <div className="flex flex-col gap-y-2">
                                    <label>
                                        <span className="text-red-500">*</span>{" "}
                                        Foto:
                                    </label>
                                    <img
                                        src={form.getFieldValue("photo")}
                                        alt="Producto"
                                        className="w-60"
                                    />
                                </div>
                            </Form.Item>
                        ) : (
                            <Form.Item
                                name="photo"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Por favor ingrese foto del Producto.",
                                    },
                                ]}
                                className="w-full cursor-text"
                            >
                                <div className="flex flex-col gap-y-2">
                                    <label>
                                        <span className="text-red-500">*</span>{" "}
                                        Foto:
                                    </label>
                                    <Upload {...propsUpload}>
                                        <Button icon={<UploadOutlined />}>
                                            Subir foto
                                        </Button>
                                    </Upload>
                                </div>
                            </Form.Item>
                        )}
                    </div>
                </div>
                {type === "see" && (
                    <div className="w-full flex flex-row justify-between">
                        <Form.Item
                            name="startDateInscription"
                            label="Inicio de inscripción"
                        >
                            <Input
                                className="w-full rounded-xl p-4"
                                placeholder="Nombre del producto"
                                size="large"
                                disabled={type === "see"}
                            />
                        </Form.Item>
                        <Form.Item
                            name="endDateInscription"
                            label="Fin de inscripción"
                        >
                            <Input
                                className="w-full rounded-xl p-4"
                                placeholder="Nombre del producto"
                                size="large"
                                disabled={type === "see"}
                            />
                        </Form.Item>
                    </div>
                )}

                <Form.Item className="w-full flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold rounded-xl px-12 !h-12 hover:bg-blue-600"
                        disabled={loading}
                        onClick={() => {
                            if (type === "see") setOpen(false);
                        }}
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
                        ) : type === "see" ? (
                            "Cerrar"
                        ) : (
                            getTitle(type)
                        )}
                    </button>
                </Form.Item>

                {/* Sección solo para see
                
                "startDateInscription": "2024-03-19",
                "endDateInscription": "2024-04-09",
                "campusname"
                "categoryname"

                */}
            </Form>
        </Modal>
    );
}
