import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { createCampus, getCampusById, updateCampus } from '../../../services/campuses-service';

export default function CampusModal({ create, id, open, setOpen, handleReload }: any) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) getCampusByIdForm(id);
    }, [id]);

    const getCampusByIdForm = async (id: number) => {
        try {
            setLoading(true);
            const campus = await getCampusById(id);
            form.setFieldsValue(campus);
        } catch (error) {
            console.error("Error al obtener datos de la sede:", error);
        } finally {
            setLoading(false);
        }
    }

    const updateCampusForm = async (values: any) => {
        try {
            setLoading(true);
            await updateCampus(values, id);
            setOpen(false);
            handleReload();
        } catch (error) {
            console.error("Error al actualizar una sede:", error);
        } finally {
            setLoading(false);
        }
    }

    const createCampusForm = async (values: any) => {
        try {
            setLoading(true);
            await createCampus(values);
            setOpen(false);
            form.resetFields();
            handleReload();
        } catch (error) {
            console.error("Error al crear una sede:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title={create ? "Crear Sede" : "Editar Sede"}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <Form
                name="campusForm"
                onFinish={(values) => {
                    create ? createCampusForm(values) : updateCampusForm(values);
                }}
                onFinishFailed={() => {
                    console.log("Fallo");
                }}
                className="my-10 max-md:mx-20 md:mx-32"
                form={form}
            >
                <div className="flex flex-col gap-y-4">
                    {/* ------------------Input Nombre Sede------------------ */}
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor, ingresa nombre de la sede.",
                            },
                            {
                                max: 50,
                                message:
                                    "El nombre de la sede es muy largo.",
                            },
                        ]}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            placeholder="Ingresa nombre de la sede"
                            size="large"
                        />
                    </Form.Item>

                    {/* ------------------Input Descripcion Sede------------------ */}
                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor ingrese descripción de la sede.",
                            },
                        ]}
                        className="cursor-text"
                    >
                        <TextArea
                            rows={4}
                            placeholder="Ingresar descripción de la sede"
                            autoSize={{ minRows: 4, maxRows: 4 }}
                        />
                    </Form.Item>

                    {/* ------------------Fotografia de la Sede------------------ */}
                    <Form.Item
                        name="photo"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor ingrese fotografia de la sede.",
                            },
                        ]}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            placeholder="Ingresa nombre de la sede"
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
