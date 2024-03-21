import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  CollapseProps,
  Form,
  Input,
  Select,
  Spin,
  Tour,
  TourProps,
  Upload,
  // UploadProps,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../../../../context/CartProvider";
import {
  createOrder,
  uploadVoucherImage,
} from "../../../../services/cart-service/cart-service";
import { useForm } from "antd/es/form/Form";

const itemsNest: CollapseProps["items"] = [
  {
    key: "1",
    label: "BCP",
    children: (
      <div>
        <p>CC: 1234-1234-1234-1234</p>
        <p>CCI: 1234-1234-1234-1234</p>
      </div>
    ),
  },
  {
    key: "2",
    label: "Interbank",
    children: (
      <div>
        <p>CC: 1234-1234-1234-1234</p>
        <p>CCI: 1234-1234-1234-1234</p>
      </div>
    ),
  },
  {
    key: "3",
    label: "Scotiabank",
    children: (
      <div>
        <p>CC: 1234-1234-1234-1234</p>
        <p>CCI: 1234-1234-1234-1234</p>
      </div>
    ),
  },
];

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Yape",
    children: (
      <div className="flex justify-center">
        <YapeInfo />
      </div>
    ),
  },
  {
    key: "2",
    label: "Plin",
    children: (
      <div className="flex justify-center">
        <PlinInfo />
      </div>
    ),
  },
  {
    key: "3",
    label: "Transferencia",
    children: <Collapse defaultActiveKey="3" accordion items={itemsNest} />,
  },
];

function YapeInfo() {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png"
      className="w-64 m-8"
      alt=""
    />
  );
}

function PlinInfo() {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png"
      className="w-64 m-8"
      alt=""
    />
  );
}

// Define la función getBase64
function getBase64(file: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
}

export default function PaymentStep({ setNextStep }: any) {
  const { getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [voucherImage, setVoucherImage] = useState<any>(null);
  const [disableYapePlin, setDisableYapePlin] = useState(false);

  useEffect(() => {
    if (getTotalPrice() > 500) {
      setDisableYapePlin(true);
    } else {
      setDisableYapePlin(false);
    }
  }, [getTotalPrice]);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const createOrderForm = async (values: any) => {
    try {
      setLoading(true);
      const orderId = await createOrder(values);

      // Subir la imagen del voucher si existe
      if (voucherImage) {
        await handleImageUpload(orderId.id, voucherImage.originFileObj); // Cambiado a voucherImage.originFileObj
      }

      setNextStep(100);
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden:", error);
    } finally {
      setLoading(false);
    }
  };

  const [form] = useForm();
  // Funcionalidad Tour
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankOptions, setBankOptions] = useState<Options[]>([]);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    switch (value) {
      case "YAPE":
        setBankOptions(YapeOptions);
        break;
      case "PLIN":
        setBankOptions(PlinOptions);
        break;
      case "TRANSFERENCIA_BANCARIA":
        setBankOptions(TransferOptions);
        break;
      default:
        setBankOptions([]);
    }
    form.setFieldsValue({ bankName: undefined });
  };
  type Options = {
    value: string;
    label: string;
  };

  const paymentMethodOptions = [
    { value: "YAPE", label: "YAPE", disabled: disableYapePlin },
    { value: "PLIN", label: "PLIN", disabled: disableYapePlin },
    { value: "TRANSFERENCIA_BANCARIA", label: "Transferencia bancaria" },
  ];

  const YapeOptions: Options[] = [
    { value: "Mibanco", label: "Mibanco" },
    { value: "Caja Huancayo", label: "Caja Huancayo" },
    { value: "Caja Ica", label: "Caja Ica" },
    { value: "Caja Piura", label: "Caja Piura" },
    { value: "Caja Sullana", label: "Caja Sullana" },
    { value: "Caja Tacna", label: "Caja Tacna" },
    { value: "Caja Trujillo", label: "Caja Trujillo" },
    { value: "Banco de la Nación", label: "Banco de la Nación" },
    { value: "BCP", label: "BCP" },
  ];

  const PlinOptions: Options[] = [
    { value: "Interbank", label: "Interbank" },
    { value: "Scotiabank", label: "Scotiabank" },
    { value: "BBVA", label: "BBVA" },
  ];

  const TransferOptions: Options[] = [
    { value: "Banco de Comercio", label: "Banco de Comercio" },
    { value: "BCP", label: "BCP" },
    {
      value: "Banco Interamericano de Finanzas (BanBif)",
      label: "Banco Interamericano de Finanzas (BanBif)",
    },
    { value: "Banco Pichincha", label: "Banco Pichincha" },
    { value: "BBVA", label: "BBVA" },
    { value: "Citibank Perú", label: "Citibank Perú" },
    { value: "Interbank", label: "Interbank" },
    { value: "MiBanco", label: "MiBanco" },
    { value: "Scotiabank Perú", label: "Scotiabank Perú" },
    { value: "Banco GNB Perú", label: "Banco GNB Perú" },
    { value: "Banco Falabella", label: "Banco Falabella" },
    { value: "Banco Ripley", label: "Banco Ripley" },
    { value: "Banco Santander Perú", label: "Banco Santander Perú" },
    { value: "Alfin Banco", label: "Alfin Banco" },
    { value: "Bank of China", label: "Bank of China" },
    { value: "Bci Perú", label: "Bci Perú" },
    { value: "ICBC PERU BANK", label: "ICBC PERU BANK" },
  ];

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Selecciona el metodo de pago",
      description:
        "En cada método encontrarás la información necesaria para realizar el pago.",
      target: () => ref1.current,
      nextButtonProps: {
        children: "Siguiente",
        className: "bg-blue-500 text-white",
      },
    },
    {
      title: "Llena el formulario con los datos de tu pago",
      description:
        "Encontrarás un formulario para llenar con los datos de tu pago, como el número de operación, el metodo de pago, el banco y para subir foto del voucher.",
      target: () => ref2.current,
      nextButtonProps: {
        children: "Siguiente",
        className: "bg-blue-500 text-white",
      },
      prevButtonProps: {
        children: "Anterior",
        className: "bg-white-500 text-black",
      },
    },
    {
      title: "Resumen de Compra",
      description:
        "Aquí encontrarás el resumen de tu compra. Puedes ver el total a pagar y los productos que estás comprando.",
      target: () => ref3.current,
      nextButtonProps: {
        children: "Finalizar",
        className: "bg-blue-500 text-white",
      },
      prevButtonProps: {
        children: "Anterior",
        className: "bg-white-500 text-black",
      },
    },
  ];

  const handleImageUpload = async (orderId: any, file: any) => {
    setLoading(true);
    try {
      await uploadVoucherImage(orderId, file);
      message.success("Imagen de voucher subida exitosamente");
      setVoucherImage(file);
      getBase64(file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
      });
    } catch (error) {
      console.error("Error al subir la imagen del voucher:", error);
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
    onChange(info: any) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setVoucherImage(info.file);
        getBase64(info.file.originFileObj, (imageUrl: any) => {
          setImageUrl(imageUrl);
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="flex justify-around">
      {/* Metodo de Pago */}
      <div className="w-[22rem]">
        <h2 className="text-lg mb-6">Elige método de pago</h2>
        <Collapse onChange={onChange} ref={ref1} accordion items={items} />
      </div>

      {/* Formulario Voucher */}
      <div className="w-1/3" ref={ref2}>
        <Form
          form={form}
          name="payment"
          onFinishFailed={() => {}}
          onFinish={(values) => {
            createOrderForm(values);
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
                },
              ]}
              className="cursor-text"
            >
              <Select
                placeholder="Método de Pago"
                className="w-full !h-16"
                size="large"
                options={paymentMethodOptions}
                onChange={handlePaymentMethodChange}
              />
            </Form.Item>

            {/* Input Nombre de Banco */}
            <Form.Item
              name="bankName"
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
                size="large"
                options={[...bankOptions]}
                disabled={!paymentMethod}
              />
            </Form.Item>

            {/* Input Número de Operación */}
            <Form.Item
              name="operationNumber"
              rules={[
                {
                  required: paymentMethod !== "TRANSFERENCIA_BANCARIA",
                  message: "Por favor ingrese su número de operación.",
                },
              ]}
              className="cursor-text"
            >
              {paymentMethod === "YAPE" || paymentMethod === "PLIN" ? (
                <Input
                  className="w-full rounded-xl p-4"
                  placeholder="Ingresa tu número de operación"
                  size="large"
                  disabled
                  defaultValue="-"
                />
              ) : (
                <Input
                  className="w-full rounded-xl p-4"
                  placeholder="Ingresa tu número de operación"
                  size="large"
                />
              )}
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
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="px-32 py-4 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-700"
              disabled={loading}
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
        <div className="border rounded-md shadow-md p-8" ref={ref3}>
          <h2 className="text-lg mb-4">Cart Summary</h2>
          <h2 className="text-2xl font-bold">Total S/. {getTotalPrice()}</h2>
        </div>
        <div className="flex justify-center mt-20 ">
          <Button
            className="w-[60%]  h-12 bg-indigo-200 text-md"
            onClick={() => setOpen(true)}
          >
            ¿Necesitas ayuda?
          </Button>
        </div>
      </div>

      {/* Tour */}
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} animated />
    </div>
  );
}
