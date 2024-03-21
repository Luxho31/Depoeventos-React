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
import { getAllCampuses } from "../../../services/campuses-service";
import { getAllCategories } from "../../../services/categories-service";
import { getAllDisciplines } from "../../../services/disciplines-service";
import {
  createProduct,
  getProductById,
  updateProduct,
  uploadProductImage,
} from "../../../services/products-service";

// Define la función getBase64
function getBase64(file: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
}

export default function ProductModal({
  type,
  id,
  open,
  setOpen,
  handleReload,
}: any) {
  const [loading, setLoading] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [productImage, setProductImage] = useState<any>(null);
  const [selectedCoursesCount, setSelectedCoursesCount] = useState(0);

  const [form] = Form.useForm();

  useEffect(() => {
    getAllData();
    if (id) getProductByIdForm(id);
  }, [id]);

  const handleCoursesChange = (value: any) => {
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
        campusId: product.campus.name,
        categoryId: product.category.name,
        startDate: moment(product.startDate),
        coursesId: product.courses.map((course: any) => course.id),
        startDateInscription: product.startDateInscription,
        endDateInscription: product.endDateInscription,
      });
    } catch (error) {
      console.error("Error al obtener datos del producto:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProductForm = async (values: any) => {
    try {
      setLoading(true);
      values.startDate = values.startDate.format("YYYY-MM-DD");
      await updateProduct(values, id);
      setOpen(false);
      handleReload();
    } catch (error) {
      console.error("Error al actualizar un producto:", error);
    } finally {
      setLoading(false);
    }
  };

  const createProductForm = async (values: any) => {
    try {
      setLoading(true);
      values.startDate = values.startDate.format("YYYY-MM-DD");
      values.photo = null;
      const productId = await createProduct(values);
      if (productImage) {
        await handleImageUpload(productId.id, productImage.originFileObj);
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

  const getAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        getAllDisciplines(),
        getAllCampuses(),
        getAllCategories(),
      ]).then(([disciplinesData, campusesData, categoriesData]) => {
        setDisciplines(disciplinesData);
        setCampuses(campusesData);
        setCategories(categoriesData);
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (productId: any, file: any) => {
    setLoading(true);
    try {
      await uploadProductImage(productId, file);
      message.success("Imagen de Product subida exitosamente");
      setProductImage(file); // Actualiza el estado con la imagen subida
      getBase64(file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
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
    beforeUpload: (file: any) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      return isImage;
    },
    onChange(info: any) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setProductImage(info.file);
        getBase64(info.file.originFileObj, (imageUrl: any) => {
          setImageUrl(imageUrl);
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
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
        onFinishFailed={() => { }}
        className="my-10 max-md:mx-20 md:mx-32"
        form={form}
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: selectedCoursesCount > 2,
              message: "El nombre es requerido",
            },
          ]}
        >
          <Input
            className="w-full rounded-xl p-4"
            placeholder="Nombre del producto"
            size="large"
            disabled={type === "see" || selectedCoursesCount <= 2}
            defaultValue={selectedCoursesCount <= 2 ? "-" : undefined}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
          rules={[{ required: true, message: "La descripción es requerida" }]}
        >
          <TextArea
            className="w-full rounded-xl p-4"
            placeholder="Descripción del producto"
            size="large"
            disabled={type === "see"}
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Precio"
          rules={[{ required: true, message: "El precio es requerido" }]}
        >
          <InputNumber
            className="w-full rounded-xl p-4"
            placeholder="Precio del producto"
            size="large"
            disabled={type === "see"}
          />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Fecha de inicio"
          rules={[{ required: true, message: "La fecha es requerida" }]}
        >
          <DatePicker
            className="w-full rounded-xl p-4"
            placeholder="Fecha de inicio del producto"
            size="large"
            disabled={type === "see"}
          />
        </Form.Item>

        <Form.Item
          name="maxStudents"
          label="Cantidad de estudiantes"
          rules={[{ required: true, message: "La cantidad de estudiantes es requerida" }]}
        >
          <InputNumber
            className="w-full rounded-xl p-4"
            placeholder="Cantidad de estudiantes"
            size="large"
            disabled={type === "see"}
          />
        </Form.Item>

        <Form.Item
          name="campusId"
          label="Sede"
          rules={[{ required: true, message: "La sede es requerida" }]}
        >
          <Select
            placeholder="Seleccionar Sede"
            className="w-full h-14"
            options={campuses.map((campus: any) => {
              return { value: campus.id, label: campus.name };
            })}
            disabled={type === "see"}
          />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Categoria"
          rules={[{ required: true, message: "La categoria es requerida" }]}
        >
          <Select
            placeholder="Seleccionar Categoria"
            className="w-full h-14"
            options={categories.map((category: any) => {
              return { value: category.id, label: category.name };
            })}
            disabled={type === "see"}
          />
        </Form.Item>

        <Form.Item
          name="coursesId"
          label="Disciplina"
          rules={[{ required: true, message: "Las disciplinas son requeridas" }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Por favor, selecciona las disciplinas"
            options={disciplines.map((discipline: any) => {
              return {
                value: discipline.id,
                label: discipline.name,
              };
            })}
            onChange={handleCoursesChange}
            disabled={type === "see"}
          />
        </Form.Item>
        {/* Input Foto del Voucher */}
        <Form.Item
          name="photo"
          rules={[
            {
              required: true,
              message: "Por favor ingrese foto del Voucher.",
            },
          ]}
          className="cursor-text"
        >
          <Upload {...propsUpload}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
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
            <Form.Item name="endDateInscription" label="Fin de inscripción">
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
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
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
