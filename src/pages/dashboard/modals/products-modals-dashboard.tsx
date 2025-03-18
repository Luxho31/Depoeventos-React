import { LoadingOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Spin,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Compressor from "compressorjs";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  createProduct,
  getProductById,
  updateProduct,
  updateProductsDateRange,
  uploadProductImage,
} from "../../../services/products-service";

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
  teachers?: any;
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
  teachers,
}: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [, setSelectedCoursesCount] = useState(0);
  const [value, setValue] = useState(0);
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(
    undefined
  );
  const [selectedDisciplineIds, setSelectedDisciplineIds] = useState<Product[]>(
    []
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      getProductByIdForm(id);
    }

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
      console.log(product.location);
      setSelectedDisciplineIds(
        product.coursesWithSchedules.map((course: any) => course.courseId)
      );
      for (let discipline of product.coursesWithSchedules) {
        console.log(discipline);
        form.setFieldsValue({
          [`days_${discipline.courseId}`]: discipline.schedules[0].days,
          [`startHour_${discipline.courseId}`]:
            discipline.schedules[0].startHour,
          [`endHour_${discipline.courseId}`]: discipline.schedules[0].endHour,
        });
      }
      console.log("Product teachers id", product.teachers);
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        maxStudents: product.maxStudents,
        price: product.price,
        categoryId: product.categories.map((category: Category) => category.id),
        startDate: moment(product.startDate),
        endDate: moment(product.endDate),
        coursesId: product.courses.map((course: Course) => course.id),
        startDateInscription: product.startDateInscription,
        endDateInscription: product.endDateInscription,
        campusesId: product.campus.map((camp: Campus) => camp.id),
        ages: product.ages,
        location: product.location,
        grades: product.grades,
        active: product.active,
        gender: product.gender,
        photo: product.photo,
        teachersId: product.teachers ? product.teachers.map((teacher: any) => teacher.id) : [],
      });
      setValue(product.gender);
    } catch (error) {
      console.error("Error al obtener datos del producto:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 19; hour++) {
      const maxMinute = hour === 19 ? 30 : 60;
      for (let minute = 0; minute < maxMinute; minute += 30) {
        const time = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        options.push(
          <Select.Option key={time} value={time}>
            {time}
          </Select.Option>
        );
      }
    }
    return options;
  };
  const updateProductForm = async (values: any) => {
    try {
      setLoading(true);
      values.startDate = new Date(values.startDate).toISOString().split("T")[0];
      values.endDate = new Date(values.endDate).toISOString().split("T")[0];
      const coursesWithSchedules = selectedDisciplineIds.map((discipline) => {
        return {
          courseId: discipline,
          schedules: [
            {
              days: values[`days_${discipline}`],
              startHour: values[`startHour_${discipline}`],
              endHour: values[`endHour_${discipline}`],
            },
          ],
        };
      });
      values.startDate = new Date(values.startDate).toISOString().split("T")[0];
      values.endDate = new Date(values.endDate).toISOString().split("T")[0];

      const formData = {
        name: values.name,
        description: values.description,
        categoriesId: values.categoryId,
        campusesId: values.campusesId,
        gender: values.gender,
        grades: values.grades,
        ages: values.ages,
        photo: values.photo,
        location: values.location,
        startDate: values.startDate,
        endDate: values.endDate,
        maxStudents: values.maxStudents,
        price: values.price,
        active: values.active,
        teachersId: values.teachersId,
        coursesWithSchedules,
      };

      if (productImage) {
        await handleImageUpload(id!, productImage);
        setPhoto(values.photo);
      }

      await updateProduct(formData, id);
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
      values.startDate = new Date(values.startDate).toISOString().split("T")[0];
      values.endDate = new Date(values.endDate).toISOString().split("T")[0];
      values.photo = "-";

      const coursesWithSchedules = selectedDisciplineIds.map((discipline) => {
        return {
          courseId: discipline,
          schedules: [
            {
              days: values[`days_${discipline}`],
              startHour: values[`startHour_${discipline}`],
              endHour: values[`endHour_${discipline}`],
            },
          ],
        };
      });
      values.startDate = new Date(values.startDate).toISOString().split("T")[0];
      values.endDate = new Date(values.endDate).toISOString().split("T")[0];
      values.photo = "-";

      const formData = {
        name: values.name,
        description: values.description,
        categoriesId: values.categoryId,
        campusesId: values.campusesId,
        gender: values.gender,
        grades: values.grades,
        ages: values.ages,
        photo: values.photo,
        location: values.location,
        startDate: values.startDate,
        endDate: values.endDate,
        maxStudents: values.maxStudents,
        active: values.active,
        price: values.price,
        teachersId: values.teachersId,
        coursesWithSchedules,
      };

      console.log(formData);
      const productId = await createProduct(formData);
      if (productImage) {
        await handleImageUpload(productId.id, productImage);
        setPhoto(values.photo);
      }
      console.log(productId.id);
      setOpen(false);
      form.resetFields();
      setPhotoPreview("");
      setSelectedDisciplineIds([]);
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
      const data = await getProductById(id);

      console.log(data.teacherId);
    } catch (error) {
      console.error("Error al ver un producto:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTimeProductForm = async (values: any) => {
    values.startDateUpdate = new Date(values.startDateUpdate)
      .toISOString()
      .split("T")[0];
    values.endDateUpdate = new Date(values.endDateUpdate)
      .toISOString()
      .split("T")[0];

    try {
      setLoading(true);

      const formData = {
        startDate: values.startDateUpdate,
        endDate: values.endDateUpdate,
      };

      await updateProductsDateRange(formData);
      form.resetFields();
      setOpen(false);
      handleReload();
    } catch (error) {
      console.error("Error al actualizar horario de un producto:", error);
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
      case "time":
        return "Horario";
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
      case "time":
        return updateTimeProductForm;
      default:
        return createProductForm;
    }
  };

  const handleImageUpload = async (productId: number, file: File) => {
    setLoading(true);
    try {
      const fileCompressed = await compressFile(file);
      console.log(fileCompressed);
      await uploadProductImage(productId, fileCompressed);
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
        onFinish={(values) => chooseMethod(type)(values)}
        onFinishFailed={() => {}}
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form}
      >
        {type === "time" && (
          <>
            <p className="text-center text-gray-400 my-7">
              Se actualizaran los horarios de los productos activos
            </p>
            <div className="flex gap-x-4 max-sm:flex-col">
              {/* Input Fecha Inicial del Producto */}
              <Form.Item
                name="startDateUpdate"
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
                />
                {/* </div> */}
              </Form.Item>

              {/* Input Fecha Final del Producto */}
              <Form.Item
                name="endDateUpdate"
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
                />
              </Form.Item>
            </div>
            <Form.Item className="w-full flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold rounded-xl px-12 !h-12 hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  "Actualizar horario"
                )}
              </button>
            </Form.Item>
          </>
        )}
        {type !== "time" && (
          <>
            <div className="flex flex-col gap-y-2 mb-8">
              {/* Input Nombre del Producto */}
              <div className="flex gap-x-2 items-center justify-between">
                <Form.Item
                  name="name"
                  label="Nombre del Producto"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "El nombre es requerido",
                    },
                  ]}
                >
                  <Input
                    className="w-full rounded-xl p-4"
                    placeholder="Nombre del producto"
                    size="large"
                    disabled={type === "see"}
                  />
                  {/* </div> */}
                </Form.Item>

                <Form.Item
                  name="active"
                  label="Estado"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "El estado es requerido",
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={onChangeRadioButton}
                    value={value}
                    disabled={type === "see"}
                  >
                    <Radio value={true}>Activo</Radio>
                    <Radio value={false}>Inactivo</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <Form.Item
                name="teachersId"
                label="Profesor"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "El profesor es requerido",
                  },
                ]}
                className="w-full cursor-text"
              >
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Por favor, selecciona los profesores"
                  className="w-full h-14"
                  disabled={type === "see"}
                  mode="multiple"
                >
                  {(Array.isArray(teachers) ? teachers : []).map(
                    (teacher: any) => (
                      <Select.Option key={teacher.id} value={teacher.id}>
                        {teacher.firstName} {teacher.lastName}
                      </Select.Option>
                    )
                  )}
                </Select>
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
                    options={disciplines.map((discipline: Course) => {
                      return {
                        value: discipline.id,
                        label: discipline.name,
                      };
                    })}
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
                    mode="multiple"
                    allowClear
                    placeholder="Por favor, selecciona las sedes"
                    className="w-full h-14"
                    options={categories.map((cat: Category) => {
                      return {
                        value: cat.id,
                        label: cat.name,
                      };
                    })}
                    disabled={type === "see"}
                  />
                </Form.Item>
              </div>

              {selectedDisciplineIds.map((discipline) => {
                const disciplineData = disciplines.find(
                  (item: any) => item.id === discipline
                );

                return (
                  <div className="flex flex-col md:flex-row gap-x-4 border rounded-lg shadow-md p-4">
                    <Form.Item
                      label={`Días para ${
                        disciplineData ? disciplineData.name : ""
                      }`}
                      name={`days_${discipline}`}
                      labelCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Seleccione al menos un día",
                        },
                      ]}
                      className="md:w-full"
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        disabled={type === "see"}
                      >
                        <Select.Option value="1">Lunes</Select.Option>
                        <Select.Option value="2">Martes</Select.Option>
                        <Select.Option value="3">Miércoles</Select.Option>
                        <Select.Option value="4">Jueves</Select.Option>
                        <Select.Option value="5">Viernes</Select.Option>
                        <Select.Option value="6">Sábado</Select.Option>
                        <Select.Option value="7">Domingo</Select.Option>
                      </Select>
                    </Form.Item>
                    <div className="flex flex-col gap-x-4 lg:flex-row">
                      <Form.Item
                        name={`startHour_${discipline}`}
                        label="Hora de inicio"
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "Hora de inicio es requerido.",
                          },
                        ]}
                        className="w-full"
                      >
                        <Select
                          placeholder="Selecciona la hora de inicio"
                          allowClear
                          disabled={type === "see"}
                        >
                          {generateOptions()}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={`endHour_${discipline}`}
                        label="Hora de Fin"
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "Hora de inicio es requerido.",
                          },
                        ]}
                        className="w-full"
                      >
                        <Select
                          placeholder="Selecciona la hora de inicio"
                          allowClear
                          disabled={type === "see"}
                        >
                          {generateOptions()}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                );
              })}

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
                labelCol={{ span: 24 }}
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
                    { value: "1", label: "1er grado" },
                    { value: "2", label: "2do grado" },
                    { value: "3", label: "3er grado" },
                    { value: "4", label: "4to grado" },
                    { value: "5", label: "5to grado" },
                    { value: "6", label: "6to grado" },
                    { value: "7", label: "7mo grado / 1ero secundaria" },
                    { value: "8", label: "8vo grado / 2do secundaria" },
                    { value: "9", label: "9no grado / 3ero secundaria" },
                    { value: "10", label: "10mo grado / 4to secundaria" },
                    { value: "11", label: "11vo grado / 5to secundaria" },
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
                      message: "La cantidad de estudiantes es requerida",
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

              <Form.Item
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la locación del Producto.",
                  },
                ]}
                label="Locación del Producto"
                labelCol={{ span: 24 }}
                className="w-full"
              >
                <Input
                  className="w-full rounded-xl p-4"
                  placeholder="Locación del producto"
                  size="large"
                  disabled={type === "see"}
                />
              </Form.Item>
              {type === "see" && (
                <div className="w-full flex flex-row gap-x-4 justify-between max-sm:flex-col">
                  <Form.Item
                    name="startDateInscription"
                    label="Inicio de inscripción"
                    labelCol={{ span: 24 }}
                    className="w-full"
                  >
                    <Input
                      className="w-full rounded-xl p-4"
                      placeholder="Inicio de inscripción"
                      size="large"
                      disabled={type === "see"}
                    />
                  </Form.Item>
                  <Form.Item
                    name="endDateInscription"
                    label="Fin de inscripción"
                    labelCol={{ span: 24 }}
                    className="w-full"
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
                  <div className="flex flex-col gap-x-8">
                    {type !== "see" && (
                      <div>
                        <label className="block mb-2 text-sm text-gray-900">
                          <span className="text-red-500">*</span> Imagen de
                          producto
                        </label>
                        <input
                          type="file"
                          name="photo"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              const file = e.target.files[0];
                              setProductImage(file);
                              setPhotoPreview(URL.createObjectURL(file));
                            }
                          }}
                          accept="image/*"
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-3 mb-8"
                          id="file_input"
                        />
                      </div>
                    )}

                    {type == "create" ? (
                      <img
                        src={photoPreview}
                        alt=""
                        className="border-solid border-2 border-neutral-300 w-full min-[460]:w-60 h-60 sm:w-80 md:w-96 sm:h-80 md:h-96 object-cover"
                      />
                    ) : (
                      <img
                        src={photo}
                        alt=""
                        className="border-solid border-2 border-neutral-300 w-full min-[460]:w-60 h-60 sm:w-80 md:w-96 sm:h-80 md:h-96 object-cover"
                      />
                    )}
                  </div>
                </div>
              </Form.Item>
              {/* )} */}
            </div>

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
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : type === "see" ? (
                  "Cerrar"
                ) : (
                  getTitle(type)
                )}
              </button>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}
