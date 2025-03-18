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
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedImplicados, setSelectedImplicados] = useState<number[]>([]);
  const [selectedTestigos, setSelectedTestigos] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      fetchCourses();
    }
  }, [open]);

  useEffect(() => {
    if (selectedCourse) {
      fetchChildrenByCourse(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No hay un token almacenado");
        return;
      }

      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;

      const response = await getCoursesByTeacher(userId);
      setCoursesByTeacher(Array.isArray(response) ? response : []);
      form.setFieldsValue({ curso: undefined });
    } catch (error) {
      toast.error("Error al obtener los cursos del profesor");
      setCoursesByTeacher([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchChildrenByCourse = async (courseId: number) => {
    setLoading(true);
    try {
      const response = await getChildrenByProduct(courseId);
      setChildrenByCourse(Array.isArray(response) ? response : []);
    } catch (error) {
      toast.error("Error al obtener los alumnos del curso");
      setChildrenByCourse([]);
    } finally {
      setLoading(false);
    }
  };

  const createIncident = async (values: any) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No hay un token almacenado");
        return;
      }
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;
      if (values.profesor === "" || values.profesor === undefined) {
        values.profesor = userId;
      }
      values.fechaHoraReporte = values.fechaHoraReporte.$d;

      // formatear la fecha y hora
      const date = new Date(values.fechaHoraReporte);
      const formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;

      values.fechaHoraReporte = formattedDate;

      console.log("Incidencia creada:", values);
      form.resetFields();
      setSelectedImplicados([]);
      setSelectedTestigos([]);
      handleReload();
      toast.success("Incidencia creada correctamente");
    } catch (error) {
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
            <Form.Item
              name="profesor"
              label="Profesor"
              labelCol={{ span: 24 }}
              className="w-full"
            >
              <Input
                defaultValue={userInfo?.firstName + " " + userInfo?.lastName}
                disabled
              />
            </Form.Item>

            <Form.Item
              name="curso"
              label="Curso"
              rules={[{ required: true, message: "Seleccione un curso" }]}
              labelCol={{ span: 24 }}
              className="w-full"
            >
              <Select
                showSearch
                placeholder="Seleccione un curso"
                optionFilterProp="children"
                onChange={(value) => {
                  setSelectedCourse(value);
                  setSelectedImplicados([]); // Reset al cambiar de curso
                  setSelectedTestigos([]); // Reset al cambiar de curso
                  form.setFieldsValue({ alumnos: [], testigos: [] });
                }}
                loading={loading}
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

          {/* Fecha y Hora del Reporte */}
          <div className="flex items-center gap-x-5">
            <Form.Item
              name="fechaHoraReporte"
              label="Fecha y Hora del Reporte"
              rules={[
                { required: true, message: "Seleccione la fecha y hora" },
              ]}
              labelCol={{ span: 24 }}
              className="w-full"
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>
            <Form.Item
              name="tipo"
              label="Tipo"
              rules={[{ required: true, message: "Seleccione un tipo" }]}
              labelCol={{ span: 24 }}
              className="w-full"
            >
              <Select placeholder="Seleccione un tipo">
                <Select.Option value="Agresion">Agresión</Select.Option>
                <Select.Option value="Bullying">Bullying</Select.Option>
                <Select.Option value="Robo">Robo</Select.Option>
                <Select.Option value="Pelea">Pelea</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Alumnos implicados */}
          <Form.Item
            name="alumnos"
            label="Alumnos Implicados"
            rules={[
              { required: true, message: "Seleccione al menos un alumno" },
            ]}
            labelCol={{ span: 24 }}
          >
            <Select
              mode="multiple"
              placeholder="Seleccione los alumnos implicados"
              optionFilterProp="children"
              disabled={childrenByCourse.length === 0}
              value={selectedImplicados}
              onChange={(value) => {
                setSelectedImplicados(value);
                setSelectedTestigos((prev) =>
                  prev.filter((id) => !value.includes(id))
                );
              }}
            >
              {childrenByCourse
                .filter((child) => !selectedTestigos.includes(child.id)) // Excluir testigos
                .map((child: any) => (
                  <Select.Option key={child.id} value={child.id}>
                    {child.name} {child.lastName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          {/* Alumnos testigos */}
          <Form.Item
            name="testigos"
            label="Alumnos Testigos"
            labelCol={{ span: 24 }}
          >
            <Select
              mode="multiple"
              placeholder="Seleccione los alumnos testigos"
              optionFilterProp="children"
              disabled={childrenByCourse.length === 0}
              value={selectedTestigos}
              onChange={(value) => {
                setSelectedTestigos(value);
                setSelectedImplicados((prev) =>
                  prev.filter((id) => !value.includes(id))
                );
              }}
            >
              {childrenByCourse
                .filter((child) => !selectedImplicados.includes(child.id)) // Excluir implicados
                .map((child: any) => (
                  <Select.Option key={child.id} value={child.id}>
                    {child.name} {child.lastName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

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
