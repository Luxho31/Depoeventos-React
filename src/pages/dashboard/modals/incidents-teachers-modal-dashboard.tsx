import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useAuth } from "../../../context/AuthProvider";
import { getCoursesByTeacher } from "../../../services/incidents-service";
import { getChildrenByProduct } from "../../../services/products-service";

export default function IncidentsTeachersModal({
  open,
  setOpen,
  handleReload,
}: any) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { userInfo } = useAuth();
  const [coursesByTeacher, setCoursesByTeacher] = useState<any[]>([]);
  const [childrenByCourse, setChildrenByCourse] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      fetchCourses();
    }
  }, [open]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No hay un token almacenado");
        toast.error("No hay un token almacenado");
        return;
      }

      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;

      console.log("Obteniendo cursos del profesor con ID:", userId);
      const response = await getCoursesByTeacher(userId);

      console.log("Cursos del profesor:", response);

      setCoursesByTeacher(Array.isArray(response) ? response : []);
      form.setFieldsValue({ curso: undefined });
    } catch (error) {
      console.error("Error al obtener los cursos del profesor:", error);
      toast.error("Error al obtener los cursos del profesor");
      setCoursesByTeacher([]);
    } finally {
      setLoading(false);
    }
  };

  const getChildrenByCourse = async (courseId: number) => {
    const response = await getChildrenByProduct(courseId);

    console.log("Alumnos del curso:", response);

    setChildrenByCourse(Array.isArray(response) ? response : []);

    return response;
  };

  const createIncident = async (values: any) => {
    try {
      setLoading(true);
      console.log("Incidencia creada:", values);
      form.resetFields();
      handleReload();
      toast.success("Incidencia creada correctamente");
    } catch (error) {
      console.error("Error al crear la incidencia:", error);
      toast.error("Error al crear la incidencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={"Registrar Incidencia"}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={800}
      className="mt-4"
      footer={null}
    >
      <Toaster />
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="spinner" />
        </div>
      ) : (
        <Form
          name="incidentForm"
          onFinish={createIncident}
          className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
          form={form}
        >
          <div className="flex items-center gap-x-5">
            {/* Profesor */}
            <Form.Item
              name="profesor"
              label="Profesor"
              rules={[
                { required: true, message: "Ingrese el nombre del profesor" },
              ]}
              labelCol={{ span: 24 }}
              className="w-full"
            >
              <Input
                defaultValue={userInfo?.firstName + " " + userInfo?.lastName}
                disabled
              />
            </Form.Item>

            {/* Curso */}
            <Form.Item
              name="curso"
              label="Curso"
              rules={[
                { required: true, message: "Ingrese el nombre del curso" },
              ]}
              labelCol={{ span: 24 }}
              className="w-full"
            >
              <Select
                showSearch
                placeholder="Seleccione un curso"
                optionFilterProp="children"
                loading={loading} // ✅ Muestra el estado de carga
                notFoundContent={
                  loading ? "Cargando cursos..." : "No hay cursos disponibles"
                }
              >
                {coursesByTeacher.map((course: any) => (
                  <Select.Option key={course.id} value={course.id}>
                    {course.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="flex items-center gap-x-5">
            {/* Fecha y hora del reporte */}
            <Form.Item
              name="fechaHoraReporte"
              label="Fecha y Hora del Reporte"
              rules={[
                {
                  required: true,
                  message: "Ingrese la fecha y hora del reporte",
                },
              ]}
              labelCol={{ span: 24 }}
              className="w-full"
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>

            {/* Tipo de incidencia */}
            <Form.Item
              name="tipo"
              label="Tipo de Incidencia"
              rules={[
                { required: true, message: "Ingrese el tipo de incidencia" },
              ]}
              labelCol={{ span: 24 }}
              className="w-full"
            >
              <Select
                showSearch
                placeholder="Seleccione un tipo de incidencia"
                optionFilterProp="children"
              >
                <Select.Option value="acoso">Acoso</Select.Option>
                <Select.Option value="violencia">Violencia</Select.Option>
                <Select.Option value="discriminacion">
                  Discriminación
                </Select.Option>
                <Select.Option value="intimidacion">Intimidación</Select.Option>
                <Select.Option value="pelea">Pelea</Select.Option>
                <Select.Option value="robo">Robo</Select.Option>
                <Select.Option value="daño">Daño</Select.Option>
                <Select.Option value="falta">Falta</Select.Option>
              </Select>
            </Form.Item>
          </div>
          {/* Alumnos implicados */}
          <Form.Item
            name="alumnos"
            label="Alumnos Implicados"
            rules={[
              { required: true, message: "Ingrese los alumnos implicados" },
            ]}
            labelCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          {/* Alumnos testigos */}
          <Form.Item
            name="testigos"
            label="Alumnos Testigos"
            labelCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          {/* Descripción */}
          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[
              {
                required: true,
                message: "Ingrese la descripción de la incidencia",
              },
            ]}
            labelCol={{ span: 24 }}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          {/* Crear */}
          <Form.Item>
            <Button htmlType="submit" color="primary">
              Crear
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
