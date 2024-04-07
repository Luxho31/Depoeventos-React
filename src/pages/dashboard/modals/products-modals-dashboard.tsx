import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Radio,
    RadioChangeEvent,
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
import ProductSchedule from "./product-schedule-dashboard";

type Product = {
    id: number;
    photo: string;
    name: string;
    price: number;
    description: string;
    startDate: string;
    endDate: string;
    maxStudents: number;
    campus: Campus[];
    category: Category;
    startDateInscription: string;
    endDateInscription: string;
    products: Course[];
    gender: string;
    ages: string[];
    grades: string[];
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
    const [productImage, setProductImage] = useState<File | null>(null);
    const [selectedCoursesCount, setSelectedCoursesCount] = useState(0);
    const [value, setValue] = useState(0);
    const [photo, setPhoto] = useState("");
    const [photoPreview, setPhotoPreview] = useState<string | undefined>(
        undefined
    );
    const [selectedDisciplineIds, setSelectedDisciplineIds] = useState<
        Product[]
    >([]);

    const [form] = Form.useForm();

    useEffect(() => {
        if (id) getProductByIdForm(id);
        setPhoto(photo);
        handleReload();
    }, [id]);

    const handleCoursesChange = (value: Product[]) => {
        setSelectedCoursesCount(value ? value.length : 0);

        // Actualiza el estado de las disciplinas seleccionadas
        setSelectedDisciplineIds(value);
    };

    const getProductByIdForm = async (id: number) => {
        try {
            setLoading(true);
            const product = await getProductById(id);
            console.log("Producto obtenido:", product);
            setPhoto(product.photo);
            form.setFieldsValue({
                name: product.name,
                description: product.description,
                maxStudents: product.maxStudents,
                price: product.price,
                categoryId: product.category.id,
                startDate: moment(product.startDate),
                endDate: moment(product.endDate),
                coursesId: product.courses.map((course: Course) => course.id),
                startDateInscription: product.startDateInscription,
                endDateInscription: product.endDateInscription,
                campusesId: product.campus.map((camp: Campus) => camp.id),
                ages: product.ages,
                grades: product.grades,
                gender: product.gender,
                photo: product.photo,
            });
            setValue(product.gender);
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
            values.endDate = moment(values.endDate).format("YYYY-MM-DD");
            // values.photo = "-"

            // let foto = values.photo
            // console.log(foto);

            await updateProduct(values, id);
            if (productImage && id !== undefined) {
                await handleImageUpload(id, productImage);
                setPhoto(values.photo);
                getProductByIdForm(id);
                // handleReload();
            }
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
            values.startDate = new Date(values.startDate)
                .toISOString()
                .split("T")[0];
            values.endDate = new Date(values.endDate)
                .toISOString()
                .split("T")[0];
            values.photo = "-";

            const productId = await createProduct(values);
            if (productImage) {
                await handleImageUpload(productId.id, productImage);
                setPhoto(values.photo);
            }
            console.log(productId.id);
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
    };

    const onChangeRadioButton = (e: RadioChangeEvent) => {
        setValue(e.target.value);
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
                        label="Nombre del Producto"
                        labelCol={{ span: 24 }}
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
                        <Input
                            className="w-full rounded-xl p-4"
                            placeholder="Nombre del producto"
                            size="large"
                            disabled={
                                type === "see" || selectedCoursesCount <= 2
                            }
                        />
                        {/* </div> */}
                    </Form.Item>

                    {/* Input Descripcion del Producto */}
                    <Form.Item
                        name="description"
                        label="Descripción del Producto"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "La descripción es requerida",
                            },
                        ]}
                    >
                        <TextArea
                            className="w-full rounded-xl p-4"
                            placeholder="Descripción del producto"
                            size="large"
                            disabled={type === "see"}
                            autoSize={{ minRows: 1, maxRows: 1 }}
                        />
                    </Form.Item>

                    <div className="flex gap-x-4 max-sm:flex-col">
                        {/* Input Disciplinas del Producto */}
                        <Form.Item
                            name="coursesId"
                            label="Disciplinas del Producto"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Las disciplinas son requeridas",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
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
                            label="Categoria del Producto"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "La categoria es requerida",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
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
                        </Form.Item>
                    </div>

                    {/* Input Sede del Producto */}
                    <Form.Item
                        name="campusesId"
                        label="Sede(s) del Producto"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Las sede son requeridas",
                            },
                        ]}
                        className="w-full cursor-text"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Por favor, selecciona las sedes"
                            className="w-full h-14"
                            options={campuses.map((camp: Campus) => {
                                return {
                                    value: camp.id,
                                    label: camp.name,
                                };
                            })}
                            disabled={type === "see"}
                        />
                    </Form.Item>

                    <div className="flex gap-x-4 max-sm:flex-col">
                        {/* Input Edad del Producto */}
                        <Form.Item
                            name="ages"
                            label="Edad(es)"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "La edad es requerida",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            <Select
                                mode="multiple"
                                placeholder="Seleccionar Edad"
                                className="w-full h-14"
                                options={Array.from({ length: 17 }, (_, i) => ({
                                    label: `${i + 1} año(s)`,
                                    value: `${i + 1}`,
                                }))}
                                disabled={type === "see"}
                            />
                        </Form.Item>

                        {/* Input Género del Producto */}
                        <Form.Item
                            name="gender"
                            label="Género"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "El genero es requerido",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            <Radio.Group
                                onChange={onChangeRadioButton}
                                value={value}
                                disabled={type === "see"}
                            >
                                <Radio value={"Masculino"}>Masculino</Radio>
                                <Radio value={"Femenino"}>Femenino</Radio>
                                <Radio value={"Mixto"}>Mixto</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    {/* Input Grado del Producto */}
                    <Form.Item
                        name="grades"
                        label="Grado(s)"
                        rules={[
                            {
                                required: true,
                                message: "El grado es requerido",
                            },
                        ]}
                        className="w-full cursor-text"
                    >
                        <Select
                            placeholder="Seleccionar grado"
                            className="w-full h-14"
                            mode="multiple"
                            options={[
                                { value: "Nido", label: "Nido" },
                                { value: "Pre-Kinder", label: "Pre-Kinder" },
                                { value: "Kinder", label: "Kinder" },
                                { value: "1er grado", label: "1er grado" },
                                { value: "2do grado", label: "2do grado" },
                                { value: "3er grado", label: "3er grado" },
                                { value: "4to grado", label: "4to grado" },
                                { value: "5to grado", label: "5to grado" },
                                { value: "6to grado", label: "6to grado" },
                                { value: "7mo grado", label: "7mo grado" },
                                { value: "8vo grado", label: "8vo grado" },
                                { value: "9no grado", label: "9no grado" },
                                { value: "10mo grado", label: "10mo grado" },
                                { value: "11vo grado", label: "11vo grado" },
                                { value: "12vo grado", label: "12vo grado" },
                            ]}
                            disabled={type === "see"}
                        />
                    </Form.Item>

                    <div className="flex gap-x-4 max-sm:flex-col">
                        {/* Input Cantidad de Estudiantes */}
                        <Form.Item
                            name="maxStudents"
                            label="Cantidad de Estudiantes"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "La cantidad de estudiantes es requerida",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            <InputNumber
                                className="w-full rounded-xl p-2"
                                placeholder="Cantidad de estudiantes"
                                size="large"
                                disabled={type === "see"}
                            />
                        </Form.Item>

                        {/* Input Precio del Producto */}
                        <Form.Item
                            name="price"
                            label="Precio del Producto"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "El precio es requerido",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            <InputNumber
                                className="w-full rounded-xl p-2"
                                placeholder="Precio del producto"
                                size="large"
                                disabled={type === "see"}
                            />
                            {/* </div> */}
                        </Form.Item>
                    </div>

                    <div className="flex gap-x-4 max-sm:flex-col">
                        {/* Input Fecha Inicial del Producto */}
                        <Form.Item
                            name="startDate"
                            label="Fecha Inicial del Producto"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "La fecha inicial es requerida",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            <DatePicker
                                className="w-full rounded-xl p-4"
                                placeholder="Fecha inicial del producto"
                                size="large"
                                disabled={type === "see"}
                            />
                            {/* </div> */}
                        </Form.Item>

                        {/* Input Fecha Final del Producto */}
                        <Form.Item
                            name="endDate"
                            label="Fecha Final del Producto"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "La fecha final es requerida",
                                },
                            ]}
                            className="w-full cursor-text"
                        >
                            <DatePicker
                                className="w-full rounded-xl p-4"
                                placeholder="Fecha final del producto"
                                size="large"
                                disabled={type === "see"}
                            />
                        </Form.Item>
                    </div>

                    {/* Input Foto del Producto */}
                    {/* {type === "see" ? (
                        <></>
                    ) : ( */}
                    <Form.Item
                        name="photo"
                        rules={[
                            {
                                required: true,
                                message: "Por favor ingrese foto del Producto.",
                            },
                        ]}
                        className="w-full"
                    >
                        <div className="flex flex-col gap-y-2">
                            <label>
                                <span className="text-red-500">*</span> Foto:
                            </label>
                            <div className="flex gap-x-8">
                                <Upload
                                    {...propsUpload}
                                    maxCount={1}
                                    onChange={(info) => {
                                        const { file } = info;
                                        if (file.status === "done") {
                                            message.success(
                                                `${file.name} se subió correctamente`
                                            );
                                            if (file.originFileObj) {
                                                setProductImage(
                                                    file.originFileObj
                                                ); // Actualiza el estado de la imagen de perfil
                                                setPhotoPreview(
                                                    URL.createObjectURL(
                                                        file.originFileObj
                                                    )
                                                );
                                                // handleImageUpload(1,
                                                //     file.originFileObj
                                                // ); // Llama a la función handleImageUpload con el archivo subido
                                            } else {
                                                // Manejar el caso en que originFileObj sea undefined
                                                console.error(
                                                    "El archivo subido no tiene un objeto de archivo original."
                                                );
                                            }
                                        } else if (file.status === "error") {
                                            message.error(
                                                `La subida de ${file.name} falló.`
                                            );
                                        }
                                    }}
                                    onRemove={() => {
                                        // Si se cancela la subida, borrar la imagen de perfil y la vista previa
                                        setProductImage(null);
                                        setPhotoPreview("");
                                    }}
                                    className="w-56"
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        disabled={type === "see"}
                                    >
                                        Subir foto
                                    </Button>
                                </Upload>
                                {type == "create" ? (
                                    <img
                                        src={photoPreview}
                                        alt=""
                                        className="border-solid border-2 border-neutral-300 w-96 h-96 object-cover"
                                    />
                                ) : (
                                    <img
                                        src={photo}
                                        alt=""
                                        className="border-solid border-2 border-neutral-300 w-96 h-96 object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </Form.Item>
                    {/* )} */}
                </div>
                <Form
                    name="schedule"
                    layout="vertical"
                    onFinish={() => {}}
                    className="flex flex-col"
                >
                    {selectedDisciplineIds.map((disciplineId) => (
                        <ProductSchedule key={disciplineId} id={disciplineId} />
                    ))}
                </Form>

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
            </Form>
        </Modal>
    );
}
