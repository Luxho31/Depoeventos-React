import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Form, Input, Select, Spin, Tour, TourProps, Upload, UploadProps } from "antd";
import { useEffect, useRef, useState } from "react";

const itemsNest: CollapseProps['items'] = [
    {
        key: '1',
        label: 'BCP',
        children:
            <div>
                <p>CC: 1234-1234-1234-1234</p>
                <p>CCI: 1234-1234-1234-1234</p>
            </div>,
    },
    {
        key: '2',
        label: 'Interbank',
        children:
            <div>
                <p>CC: 1234-1234-1234-1234</p>
                <p>CCI: 1234-1234-1234-1234</p>
            </div>,
    },
    {
        key: '3',
        label: 'Scotiabank',
        children:
            <div>
                <p>CC: 1234-1234-1234-1234</p>
                <p>CCI: 1234-1234-1234-1234</p>
            </div>,
    },
];

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Yape',
        children:
            <div className="flex justify-center">
                <YapeInfo />
            </div>,
    },
    {
        key: '2',
        label: 'Plin',
        children:
            <div className="flex justify-center">
                <PlinInfo />
            </div>
    },
    {
        key: '3',
        label: 'Transferencia',
        children: <Collapse defaultActiveKey="3" accordion items={itemsNest} />,

    },
];

function YapeInfo() {
    return (
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png" className="w-64 m-8" alt="" />
    )
}

function PlinInfo() {
    return (
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png" className="w-64 m-8" alt="" />
    )
}

const props: UploadProps = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    previewFile(file) {
        console.log('Your upload file:', file);
        // Your process logic. Here we just mock to the same file
        return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
            method: 'POST',
            body: file,
        })
            .then((res) => res.json())
            .then(({ thumbnail }) => thumbnail);
    },
};

export default function PaymentStep({ setNextStep }: any) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const tourCompleted = localStorage.getItem('tourCompleted');
        if (!tourCompleted) {
            setOpen(true); // Iniciar el tour automáticamente solo si no se ha completado antes
            localStorage.setItem('tourCompleted', 'true'); // Marcar el tour como completado
        }
    }, []);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    // Funcionalidad Tour
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: 'Upload File',
            description: 'Put your files here.',
            cover: (
                <img
                    alt="tour.png"
                    src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                />
            ),
            target: () => ref1.current,
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref2.current,
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref3.current,
        },
    ];

    return (
        <div className="flex justify-around">

            {/* Metodo de Pago */}
            <div className="w-[22rem]">
                <h2 className="text-lg mb-6">Elige método de pago</h2>
                <Collapse onChange={onChange} ref={ref1} accordion items={items} />
            </div>

            {/* Formulario Voucher */}
            <div className="w-1/3">
                <Form
                    name="payment"
                    onFinishFailed={() => {
                        console.log("Fallo");
                    }}
                    className="h-[550px] flex flex-col justify-between border rounded-md shadow-md p-8"
                >
                    <div className="flex flex-col gap-y-2">
                        {/* Input Método de Pago */}
                        <Form.Item
                            name="paymentMethod"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor, ingresa el metodo de pago realizado.",
                                }
                            ]}
                            className="cursor-text"
                        >
                            <Select
                                placeholder="Método de Pago"
                                className="w-full !h-16"
                                // style={{ width: 120 }}
                                size="large"
                                options={[
                                    { value: "Yape", label: "Yape" },
                                    { value: "Plin", label: "Plin" },
                                    { value: "Transferencia", label: "Transferencia" },
                                ]}
                            />
                        </Form.Item>

                        {/* Input Tipo de Banco */}
                        <Form.Item
                            name="bankType"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese el tipo banco.",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Select
                                placeholder="Tipo de Banco"
                                className="w-full !h-16"
                                // style={{ width: 120 }}
                                size="large"
                                options={[
                                    { value: "BCP", label: "Banco Crédito del Perú" },
                                    { value: "Interbank", label: "Interbank" },
                                    { value: "Scotiabank", label: "Scotiabank" },
                                ]}
                            />
                        </Form.Item>

                        {/* Input Número de Operación */}
                        <Form.Item
                            name="operationNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese su número de operación.",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input
                                className="w-full rounded-xl p-4"
                                placeholder="Ingresa tu número de operación"
                                size="large"
                            />
                        </Form.Item>

                        {/* Input Foto del Voucher */}
                        <Form.Item
                            name="photoVoucher"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese foto del Voucher.",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Subir voucher</Button>
                            </Upload>
                        </Form.Item>
                    </div>

                    <div className="w-full flex justify-center">
                        <button
                            type="submit"
                            className="px-32 py-4 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-700"
                            disabled={loading}
                            onClick={(values) => {
                                console.log(values);
                                setNextStep(100)
                            }}
                        >
                            {loading ? (
                                <Spin
                                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                                />
                            ) : (
                                "Enviar"
                            )}
                        </button>
                    </div>
                </Form>
            </div>

            {/* Resumen Compra */}
            <div className="w-[22rem]">
                <div className="border rounded-md shadow-md p-8">
                    <h2 className="text-lg mb-4">Cart Summary</h2>
                    <h2 className="text-2xl font-bold">Total S/. 500</h2>
                </div>
            </div>

            {/* Tour */}
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </div>
    )
}
