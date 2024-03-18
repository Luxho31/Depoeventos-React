import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { createDiscipline, getDisciplineById, updateDiscipline } from '../../../services/disciplines-service';

export default function DisciplineModal({ create, id, open, setOpen, handleReload }: any) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) getDisciplineByIdForm(id);
    }, [id]);

    const getDisciplineByIdForm = async (id: number) => {
        try {
            setLoading(true);
            const discipline = await getDisciplineById(id);
            form.setFieldsValue(discipline);
        } catch (error) {
            console.error("Error al obtener datos de la disciplina:", error);
        } finally {
            setLoading(false);
        }
    }

    const updateDisciplineForm = async (values: any) => {
        try {
            setLoading(true);
            await updateDiscipline(values, id);
            setOpen(false);
            handleReload();
        } catch (error) {
            console.error("Error al actualizar una disciplina:", error);
        } finally {
            setLoading(false);
        }
    }

    const createDisciplineForm = async (values: any) => {
        try {
            setLoading(true);
            await createDiscipline(values);
            setOpen(false);
            form.resetFields();
            handleReload();
        } catch (error) {
            console.error("Error al crear una disciplina:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title={create ? "Crear Disciplina" : "Editar Disciplina"}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <Form
                name="disciplineForm"
                onFinish={(values) => {
                    create ? createDisciplineForm(values) : updateDisciplineForm(values);
                }}
                onFinishFailed={() => {
                    console.log("Fallo");
                }}
                className="my-10 max-md:mx-20 md:mx-32"
                form={form}
            >
                <div className="flex flex-col gap-y-4">
                    {/* ------------------Input Nombre Disciplina------------------ */}
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor, ingresa nombre de la disciplina.",
                            },
                            {
                                max: 50,
                                message:
                                    "El nombre de la disciplina es muy largo.",
                            },
                        ]}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            placeholder="Ingresa nombre de la disciplina"
                            size="large"
                        />
                    </Form.Item>

                    {/* ------------------Input Descripcion Disciplina------------------ */}
                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor ingrese descripción de la disciplina.",
                            },
                        ]}
                        className="cursor-text"
                    >
                        <TextArea
                            rows={4}
                            placeholder="Ingresar descripción de la disciplina"
                            autoSize={{ minRows: 4, maxRows: 4 }}
                        />
                    </Form.Item>

                    {/* ------------------Fotografia de la Disciplina------------------ */}
                    <Form.Item
                        name="photo"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor ingrese fotografia de la disciplina.",
                            },
                        ]}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            placeholder="Ingresa la fotografia de la disciplina"
                            size="large"
                        ></Input>
                    </Form.Item>
                </div>

                <Form.Item className="w-full flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold rounded-xl px-12 !h-12 hover:bg-blue-600"
                        disabled={loading}
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
                            create ? "Crear" : "Actualizar"
                        )}
                    </button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
