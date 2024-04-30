import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { getInscriptionById } from "../../../services/Inscriptions-service";
import moment from "moment";


type RegistrationsModalProps = {
    id: number | undefined;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type?: "children";
};

export default function RegistrationsModal({
    id,
    open,
    setOpen,
    type
}: RegistrationsModalProps) {
    const [, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    useEffect(() => {
        if (id) { getCoursesById(id); }
    }, [id]);

    const daysOfWeek: { [key: string]: string } = {
        '1': 'Lunes',
        '2': 'Martes',
        '3': 'Miércoles',
        '4': 'Jueves',
        '5': 'Viernes',
        '6': 'Sábado',
        '7': 'Domingo'
    };

    // Función para traducir los números de los días a nombres
    const getDayName = (dayNumbers: string[]) => dayNumbers.map(dayNumber => daysOfWeek[dayNumber] || 'Día inválido').join(", ");
    const getCoursesById = async (id: number) => {
        try {
            setLoading(true);
            const discipline = await getInscriptionById(id);
            console.log("La disciplina es:", discipline)
            if (discipline.product.grades === null) {
                discipline.product.grades = "No aplica";
            }

            discipline.product.ages = discipline.product.ages.map((age: number) => `${age} año(s)`).join(", ");
            discipline.children.name = `${discipline.children.name} ${discipline.children.lastName}`;


            form.setFieldsValue({
                productName: discipline.product.name,
                gender: discipline.product.gender,
                startDate: discipline.product.startDate,
                endDate: discipline.product.endDate,
                age: discipline.product.ages,
                grade: discipline.product.grades,
                childrenName: discipline.children.name,
                coursesWithSchedules: discipline.product.coursesWithSchedules.map((course: any) => ({
                    name: discipline.product.courses.find((c: any) => c.id === course.courseId)?.name || "Nombre no encontrado",
                    schedules: course.schedules.map((schedule: any) => `${getDayName(schedule.days)} - ${schedule.startHour} a ${schedule.endHour}`)
                }))
            });


            discipline.children.documentTypeNumber = `${discipline.children.documentType} ${discipline.children.documentNumber}`;

            if (type === "children") {
                form1.setFieldsValue({
                    childrenName: discipline.children.name,
                    birthDate: moment(discipline.children.birthdate).format("DD/MM/YYYY"),
                    documentTypeNumber: discipline.children.documentTypeNumber,
                    emergencyContactPhone: discipline.children.emergencyContactPhone,
                    gender: discipline.children.gender
                });
            }

        } catch (error) {
            console.error("Error al obtener datos de la disciplina:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={type !== "children" ? "Datos de la matricula" : "Datos del alumno"}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            {type !== "children" ?
                <Form
                    name="courseForm"
                    className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
                    form={form}
                >
                    <div className="flex flex-col gap-y-4">
                        <Form.Item
                            name="productName"
                            label="Nombre de producto"
                            labelCol={{ span: 24 }}
                            className="cursor-text"
                        >
                            <Input
                                className="w-full rounded-xl p-4"
                                size="large"
                                disabled
                            />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Genero de producto"
                            labelCol={{ span: 24 }}
                            className="cursor-text"
                        >
                            <Input
                                className="w-full rounded-xl p-4"
                                size="large"
                                disabled
                            />
                        </Form.Item>

                        <div className="flex gap-x-4 max-sm:flex-col">
                            <Form.Item
                                name="startDate"
                                label="Inicio de curso"
                                labelCol={{ span: 24 }}
                                className="cursor-text w-full"
                            >
                                <Input
                                    className="w-full rounded-xl p-4"
                                    size="large"
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item
                                name="endDate"
                                label="Fin de curso"
                                labelCol={{ span: 24 }}
                                className="cursor-text w-full"
                            >
                                <Input
                                    className="w-full rounded-xl p-4"
                                    size="large"
                                    disabled
                                />
                            </Form.Item>
                        </div>


                        <div className="flex gap-x-4 max-sm:flex-col">
                            <Form.Item
                                name="age"
                                label="Edad curso"
                                labelCol={{ span: 24 }}
                                className="cursor-text w-full"
                            >
                                <Input
                                    className="w-full rounded-xl p-4"
                                    size="large"
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item
                                name="grade"
                                label="Grado curso"
                                labelCol={{ span: 24 }}
                                className="cursor-text w-full"
                            >
                                <Input
                                    className="w-full rounded-xl p-4"
                                    size="large"
                                    disabled
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="childrenName"
                            label="Alumno matriculado"
                            labelCol={{ span: 24 }}
                            className="cursor-text"
                        >
                            <Input
                                className="w-full rounded-xl p-4"
                                size="large"
                                disabled
                            />
                        </Form.Item>
                        <Form.Item
                            name="coursesWithSchedules"
                            labelCol={{ span: 24 }}
                            className="cursor-text"
                        >
                            <ul className="list-disc pl-4">
                                {form.getFieldValue("coursesWithSchedules")?.map((course: any, index: number) => (
                                    <li key={index}>
                                        <strong>{course.name}</strong>: {course.schedules.join(", ")}
                                    </li>
                                ))}
                            </ul>
                        </Form.Item>

                    </div>
                </Form> :
                <Form
                    name="childrenForm"
                    className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
                    form={form1}
                >
                    <Form.Item
                        name="childrenName"
                        label="Alumno matriculado"
                        labelCol={{ span: 24 }}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            size="large"
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        name="birthDate"
                        label="Fecha de nacimiento"
                        labelCol={{ span: 24 }}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            size="large"
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        name="documentTypeNumber"
                        label="Documento de identidad"
                        labelCol={{ span: 24 }}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            size="large"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        name="emergencyContactPhone"
                        label="Número de emergencia"
                        labelCol={{ span: 24 }}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            size="large"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Genero"
                        labelCol={{ span: 24 }}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            size="large"
                            disabled
                        />
                    </Form.Item>
                </Form>
            }

        </Modal>
    );
}
