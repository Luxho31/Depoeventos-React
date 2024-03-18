import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { createCategory, getCategoryById, updateCategory } from '../../../services/categories-service';

export default function CategoryModal({ create, id, open, setOpen, handleReload }: any) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) getCategoryByIdForm(id);
    }, [id]);

    const getCategoryByIdForm = async (id: number) => {
        try {
            setLoading(true);
            const category = await getCategoryById(id);
            form.setFieldsValue(category);
        } catch (error) {
            console.error("Error al obtener datos de la categoria:", error);
        } finally {
            setLoading(false);
        }
    }

    const updateCategoryForm = async (values: any) => {
        try {
            setLoading(true);
            await updateCategory(values, id);
            setOpen(false);
            handleReload();
        } catch (error) {
            console.error("Error al actualizar una categoria:", error);
        } finally {
            setLoading(false);
        }
    }

    const createCategoryForm = async (values: any) => {
        try {
            setLoading(true);
            await createCategory(values);
            setOpen(false);
            form.resetFields();
            handleReload();
        } catch (error) {
            console.error("Error al crear una categoria:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title={create ? "Crear Categoria" : "Editar Categoria"}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <Form
                name="categoryForm"
                onFinish={(values) => {
                    create ? createCategoryForm(values) : updateCategoryForm(values);
                }}
                onFinishFailed={() => {
                    console.log("Fallo");
                }}
                className="my-10 max-md:mx-20 md:mx-32"
                form={form}
            >
                <div className="flex flex-col gap-y-4">
                    {/* ------------------Input Nombre Categoria------------------ */}
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor, ingresa nombre de la categoria.",
                            },
                            {
                                max: 50,
                                message:
                                    "El nombre de la categoria es muy largo.",
                            },
                        ]}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            placeholder="Ingresa nombre de la categoria"
                            size="large"
                        />
                    </Form.Item>

                    {/* ------------------Input Descripcion Categoria------------------ */}
                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor ingrese descripción de la categoria.",
                            },
                        ]}
                        className="cursor-text"
                    >
                        <TextArea
                            rows={4}
                            placeholder="Ingresar descripción de la categoria"
                            autoSize={{ minRows: 4, maxRows: 4 }}
                        />
                    </Form.Item>

                    {/* ------------------Fotografia de la Categoria------------------ */}
                    <Form.Item
                        name="photo"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Por favor ingrese fotografia de la categoria.",
                            },
                        ]}
                        className="cursor-text"
                    >
                        <Input
                            className="w-full rounded-xl p-4"
                            placeholder="Ingresa la fotografia de la categoria"
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
