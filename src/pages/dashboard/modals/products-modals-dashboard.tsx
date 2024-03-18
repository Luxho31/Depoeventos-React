import { LoadingOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, InputNumber, Modal, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { createProduct, getProductById, updateProduct } from '../../../services/products-service';
import TextArea from 'antd/es/input/TextArea';
import { getAllDisciplines } from '../../../services/disciplines-service';
import { getAllCampuses } from '../../../services/campuses-service';
import { getAllCategories } from '../../../services/categories-service';

export default function ProductModal({ type, id, open, setOpen, handleReload }: any) {
    const [loading, setLoading] = useState(false);
    const [campuses, setCampuses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        getAllData();
        if (id) getProductByIdForm(id);
    }, [id]);

    const getProductByIdForm = async (id: number) => {
        try {
            setLoading(true);
            const discipline = await getProductById(id);
            form.setFieldsValue(discipline);
        } catch (error) {
            console.error("Error al obtener datos del producto:", error);
        } finally {
            setLoading(false);
        }
    }

    const updateProductForm = async (values: any) => {
        try {
            setLoading(true);
            await updateProduct(values, id);
            setOpen(false);
            handleReload();
        } catch (error) {
            console.error("Error al actualizar un producto:", error);
        } finally {
            setLoading(false);
        }
    }

    const createProductForm = async (values: any) => {
        try {
            setLoading(true);
            const courses = [values.coursesId];
            values.startDate = values.startDate.format("YYYY-MM-DD");
            values.coursesId = courses;
            await createProduct(values);
            setOpen(false);
            form.resetFields();
            handleReload();
        } catch (error) {
            console.error("Error al crear un producto:", error);
        } finally {
            setLoading(false);
        }
    }

    const seeProductForm = async (id: number) => {
        try {
            setLoading(true);
            setOpen(false);
            console.log(id)
        } catch (error) {
            console.error("Error al ver un producto:", error);
        } finally {
            setLoading(false);
        }
    }

    const getTitle = (type: string) => {
        switch (type) {
            case "create":
                return "Crear Producto";
            case "edit":
                return "Editar Producto";
            case "ver":
                return "Ver Producto";
            default:
                return "Producto";
        }
    }

    const chooseMethod = (type: string) => {
        switch (type) {
            case "create":
                return createProductForm;
            case "edit":
                return updateProductForm;
            case "ver":
                return seeProductForm;
            default:
                return createProductForm;
        }
    }

    const getAllData = async () => {
        try {
            setLoading(true);
            await Promise.all([
                getAllDisciplines(),
                getAllCampuses(),
                getAllCategories()
            ]).then(([disciplinesData, campusesData, categoriesData]) => {
                setDisciplines(disciplinesData);
                setCampuses(campusesData);
                setCategories(categoriesData);
                setDataLoaded(true);
            });
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    }

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
                    console.log(values);
                }}
                onFinishFailed={(values) => {
                    console.log("Fallo");
                    console.log(values);
                }}
                className="my-10 max-md:mx-20 md:mx-32"
                form={form}
            >
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[{ required: true, message: "El nombre es requerido" }]}
                >
                    <Input
                        className="w-full rounded-xl p-4"
                        placeholder="Nombre del producto"
                        size="large"
                        disabled={type === "ver"}
                    />

                </Form.Item>

                <Form.Item
                    name="description"
                    label="Descripción"
                    rules={[{ required: true, message: "El nombre es requerido" }]}
                >
                    <TextArea
                        className="w-full rounded-xl p-4"
                        placeholder="Descripción del producto"
                        size="large"
                        disabled={type === "ver"}
                    />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Precio"
                    rules={[{ required: true, message: "El nombre es requerido" }]}
                >
                    <InputNumber
                        className="w-full rounded-xl p-4"
                        placeholder="Precio del producto"
                        size="large"
                        disabled={type === "ver"}
                    />
                </Form.Item>

                <Form.Item
                    name="startDate"
                    label="Fecha de inicio"
                    rules={[{ required: true, message: "El nombre es requerido" }]}
                >
                    <DatePicker
                        className="w-full rounded-xl p-4"
                        placeholder="Fecha de inicio del producto"
                        size="large"
                        format={"DD/MM/YYYY"}
                        disabled={type === "ver"}
                    />
                </Form.Item>

                <Form.Item
                    name="maxStudents"
                    label="Cantidad de estudiantes"
                    rules={[{ required: true, message: "El nombre es requerido" }]}
                >
                    <InputNumber
                        className="w-full rounded-xl p-4"
                        placeholder="Cantidad de estudiantes"
                        size="large"
                        disabled={type === "ver"}
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
                            return { value: campus.id, label: campus.name }
                        })}
                        disabled={type === "ver"}
                    />

                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="Categoria"
                    rules={[{ required: true, message: "La sede es requerida" }]}
                >
                    <Select
                        placeholder="Seleccionar Categoria"
                        className="w-full h-14"
                        options={
                            categories.map((category: any) => {
                                return { value: category.id, label: category.name }
                            })
                        }
                        disabled={type === "ver"}
                    />
                </Form.Item>

                <Form.Item
                    name="coursesId"
                    label="Disciplina"
                    rules={[{ required: true, message: "La sede es requerida" }]}
                >
                    <Select
                        placeholder="Seleccionar Disciplina"
                        className="w-full h-14"
                        options={
                            disciplines.map((discipline: any) => {
                                return { value: discipline.id, label: discipline.name }
                            })
                        }
                        disabled={type === "ver"}
                    />
                </Form.Item>


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
                            getTitle(type)
                        )}
                    </button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
