import { LoadingOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  getOrderById,
  updateOrder,
} from "../../../services/cart-service/cart-service";

export default function TransactionModal({
  type,
  id,
  open,
  setOpen,
  handleReload
}: any) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) getOrderByIdForm(id);
  }, [id]);

  const getOrderByIdForm = async (orderId: number) => {
    try {
      setLoading(true);
      const order = await getOrderById(orderId);
      form.setFieldsValue({
        // id: order.;
        paymentMethod: order.paymentMethod,
        bankName: order.bankName,
        operationNumber: order.operationNumber,
        date: moment(order.date),
        totalPrice: order.totalPrice,
        status: order.status,
        photo: order.photo,
      });
    } catch (error) {
      console.error("Error al obtener datos del producto:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderForm = async (values: any) => {
    try {
      setLoading(true);
      await updateOrder(values, id);
      setOpen(false);
      handleReload();
    } catch (error) {
      console.error("Error al actualizar una orden:", error);
    } finally {
      setLoading(false);
    }
  };

  const seeOrderForm = async (id: number) => {
    try {
      setLoading(true);
      await getOrderById(id);
    } catch (error) {
      console.error("Error al ver una orden:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (type: string) => {
    switch (type) {
      case "edit":
        return "Editar Orden";
      case "see":
        return "Ver Orden";
      default:
        return "Orden";
    }
  };

  const chooseMethod = (type: string) => {
    switch (type) {
      case "edit":
        return updateOrderForm;
      case "see":
        return seeOrderForm;
      default:
        return updateOrderForm;
    }
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
        onFinish={(values) => {
          chooseMethod(type)(values);
        }}
        onFinishFailed={() => { }}
        className="my-10 max-md:mx-20 md:mx-32"
        form={form}
      >
        {/* ------------------ Método de Pago ------------------ */}
        <Form.Item
          name="paymentMethod"
          label="Método de pago"
          rules={[
            {
              required: true,
              message: "El método de pago es requerido",
            },
          ]}
        >
          <Input
            className="w-full rounded-xl p-4"
            placeholder="Método de pago"
            size="large"
            disabled={type === "see" || type === "edit"}
          />
        </Form.Item>

        {/* ------------------ Nombre del Banco ------------------ */}
        <Form.Item
          name="bankName"
          label="Nombre del banco"
          rules={[
            {
              required: true,
              message: "El nombre del banco es requerido",
            },
          ]}
        >
          <Input
            className="w-full rounded-xl p-4"
            placeholder="Nombre del banco"
            size="large"
            disabled={type === "see" || type === "edit"}
          />
        </Form.Item>

        {/* ------------------ Número de Operación ------------------ */}
        <Form.Item
          name="operationNumber"
          label="Número de operación"
          rules={[
            {
              required: true,
              message: "El número de operación es requerido",
            },
          ]}
        >
          <Input
            className="w-full rounded-xl p-4"
            placeholder="Número de operación"
            size="large"
            disabled={type === "see" || type === "edit"}
          />
        </Form.Item>

        {/* ------------------ Fecha de Operación ------------------ */}
        <Form.Item
          name="date"
          label="Fecha de operación"
          rules={[
            {
              required: true,
              message: "La fecha de operación es requerida",
            },
          ]}
        >
          <DatePicker
            className="w-full rounded-xl p-4"
            placeholder="Fecha de operación"
            size="large"
            disabled={type === "see" || type === "edit"}
          />
        </Form.Item>

        {/* ------------------ Precio Total Pagado ------------------ */}
        <Form.Item
          name="totalPrice"
          label="Precio total pagado"
          rules={[
            {
              required: true,
              message: "El precio total pagado es requerido",
            },
          ]}
        >
          <Input
            className="w-full rounded-xl p-4"
            placeholder="Precio total pagado"
            size="large"
            disabled={type === "see" || type === "edit"}
          />
        </Form.Item>

        {/* ------------------ Estado ------------------ */}
        <Form.Item
          name="status"
          label="Estado"
          rules={[{ required: true, message: "El estado es requerido" }]}
        >
          {/* <Input
                        className="w-full rounded-xl p-4"
                        placeholder="Estado"
                        size="large"
                        disabled={type === "see"}
                    /> */}
          <Select
            style={{ width: 120 }}
            options={[
              { value: "PENDING", label: "PENDING" },
              { value: "SUCCESS", label: "SUCCESS" },
              { value: "DENIED", label: "DENIED" },
            ]}
            disabled={type == "see"}
          />
        </Form.Item>

        {/* ------------------ Foto Voucher ------------------ */}
        <Form.Item name="photo" label="Foto voucher">
          {form.getFieldValue("photo") && (
            <img
              src={form.getFieldValue("photo")}
              alt="Voucher"
              className="w-60"
            />
          )}
        </Form.Item>

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
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : type === "see" ? (
              "Cerrar"
            ) : (
              getTitle(type)
            )}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
