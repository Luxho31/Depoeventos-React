import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  getOrderById,
  getPaymentInfo,
  updateOrder,
} from "../../../services/cart-service/cart-service";

type TransactionData = {
  id: number;
  paymentMethod: string;
  bankName: string;
  operationNumber: string;
  date: string;
  totalPrice: number;
  status: string;
};

interface TransactionModalProps {
  type: string;
  id: number | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReload: () => void;
}

export default function TransactionModal({
  type,
  id,
  open,
  setOpen,
  handleReload,
}: TransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      getOrderByIdForm(id);
    }
  }, [id]);

  const getOrderByIdForm = async (orderId: number) => {
    try {
      setLoading(true);
      const order = await getOrderById(orderId);
      const paymentInfo = await getPaymentInfo(order.paymentId);

      // switch if payment_method_id is master or visa
      if (paymentInfo.payment_method_id === "master") {
        paymentInfo.payment_method_id = "MasterCard";
      } else if (paymentInfo.payment_method_id === "visa") {
        paymentInfo.payment_method_id = "Visa";
      }

      // switch if payment_type_id is credit_card or debit_card
      if (paymentInfo.payment_type_id === "credit_card") {
        paymentInfo.payment_type_id = "Tarjeta de crédito";
      } else if (paymentInfo.payment_type_id === "debit_card") {
        paymentInfo.payment_type_id = "Tarjeta de débito";
      }

      form.setFieldsValue({
        payment_method_id: paymentInfo.payment_method_id,
        payment_type_id: paymentInfo.payment_type_id,
        orderId: paymentInfo.order.id,
        date_approved: moment(paymentInfo.date_approved).format("YYYY-MM-DD"),
        transaction_amount: paymentInfo.transaction_amount,
        currency_id: paymentInfo.currency_id,
        net_amount: paymentInfo.transaction_details.net_received_amount,
      });
    } catch (error) {
      console.error("Error al obtener datos del producto:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderForm = async (values: TransactionData) => {
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
        onFinishFailed={() => {}}
        className="my-10 max-md:mx-20 md:mx-32"
        form={form}
      >
        {/* ------------------ Método de Pago ------------------ */}
        <div className="flex gap-x-4 max-sm:flex-col">
          <Form.Item
            name="payment_method_id"
            label="Método de pago"
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Input className="w-full rounded-xl p-4" size="large" disabled />
          </Form.Item>

          {/* ------------------ Tipo de Pago ------------------ */}
          <Form.Item
            name="payment_type_id"
            label="Tipo de pago"
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Input className="w-full rounded-xl p-4" size="large" disabled />
          </Form.Item>
        </div>
        {/* ------------------ Número de Orden ------------------ */}
        <div className="flex gap-x-4 max-sm:flex-col">
          <Form.Item
            name="orderId"
            label="Número de orden"
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Input className="w-full rounded-xl p-4" size="large" disabled />
          </Form.Item>

          {/* ------------------ Fecha de Operación ------------------ */}
          <Form.Item
            name="date_approved"
            label="Fecha de operación"
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Input className="w-full rounded-xl p-4" size="large" disabled />
          </Form.Item>
        </div>

        <div className="flex gap-x-4 max-sm:flex-col">
          {/* ------------------ Precio Total Pagado ------------------ */}
          <Form.Item
            name="transaction_amount"
            label="Precio total pagado"
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Input className="w-full rounded-xl p-4" size="large" disabled />
          </Form.Item>

          {/* ------------------ Precio Total Pagado ------------------ */}
          <Form.Item
            name="net_amount"
            label="Precio neto"
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Input className="w-full rounded-xl p-4" size="large" disabled />
          </Form.Item>

          {/* ------------------ Moneda ------------------ */}
          <Form.Item
            name="currency_id"
            label="Moneda"
            labelCol={{ span: 24 }}
            className="w-full"
          >
            <Input className="w-full rounded-xl p-4" size="large" disabled />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
