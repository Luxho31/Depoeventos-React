import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Switch,
  Button,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  createCoupon,
  getCouponById,
  updateCoupon,
  existsCouponByCode, // Asegúrate de tener este endpoint en tu service
} from "../../../services/coupons-service";

type CouponFormValues = {
  name: string;
  description?: string;
  code: string;
  value: number;
  expirationDate: Dayjs;
  active: boolean;
};
type CouponFormFields = CouponFormValues & { codeOriginal?: string };

export default function CouponModal({
  type,
  id,
  open,
  setOpen,
  handleReload,
}: {
  type: "create" | "edit" | "see";
  id: number | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReload: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<CouponFormFields>();
  const isReadOnly = type === "see";

  useEffect(() => {
    if (!open) return;

    if (type === "create") {
      form.resetFields();
      form.setFieldsValue({
        active: true,
        expirationDate: dayjs().add(1, "month"),
        value: 10,
        codeOriginal: undefined, // importante para que no dispare la validación
      });
    }

    if ((type === "edit" || type === "see") && id) {
      fetchCoupon(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, type, id]);

  const fetchCoupon = async (couponId: number) => {
    try {
      setLoading(true);
      const data = await getCouponById(couponId);
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        code: data.code,
        value: data.value,
        active: data.active,
        expirationDate: data.expirationDate
          ? dayjs(data.expirationDate)
          : undefined,
        codeOriginal: data.code, // clave: evita “repetido” si no cambias el código
      });
    } catch (error) {
      console.error("Error al obtener cupón:", error);
      message.error("No se pudo cargar el cupón.");
    } finally {
      setLoading(false);
    }
  };

  const onCreate = async (values: CouponFormValues) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        expirationDate: values.expirationDate?.format("YYYY-MM-DD"),
      };
      await createCoupon(payload);
      message.success("Cupón creado correctamente");
      closeAndReload();
    } catch (error) {
      console.error("Error al crear cupón:", error);
      message.error("No se pudo crear el cupón.");
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (values: CouponFormValues) => {
    if (!id) return;
    try {
      setLoading(true);
      const payload = {
        ...values,
        expirationDate: values.expirationDate?.format("YYYY-MM-DD"),
      };
      await updateCoupon(id, payload);
      message.success("Cupón actualizado correctamente");
      closeAndReload();
    } catch (error) {
      console.error("Error al actualizar cupón:", error);
      message.error("No se pudo actualizar el cupón.");
    } finally {
      setLoading(false);
    }
  };

  const onSee = () => setOpen(false);

  const closeAndReload = () => {
    setOpen(false);
    form.resetFields();
    handleReload();
  };

  const getTitle = (t: typeof type) =>
    t === "create"
      ? "Crear Cupón"
      : t === "edit"
      ? "Editar Cupón"
      : "Ver Cupón";

  const handleSubmit = () => {
    if (isReadOnly) return onSee();
    form.submit();
  };

  const onFinish = (values: CouponFormValues) => {
    if (type === "create") return onCreate(values);
    if (type === "edit") return onUpdate(values);
  };

  const disabledPastDates = (current: Dayjs) =>
    current && current.endOf("day").isBefore(dayjs().startOf("day"));

  return (
    <Modal
      title={getTitle(type)}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={800}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          {!isReadOnly && (
            <Button type="primary" loading={loading} onClick={handleSubmit}>
              {type === "create" ? "Crear" : "Guardar"}
            </Button>
          )}
          {isReadOnly && (
            <Button type="primary" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          )}
        </div>
      }
    >
      <Form<CouponFormFields>
        name="couponForm"
        form={form}
        layout="vertical"
        className="my-6 max-sm:mx-0 md:mx-6"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Nombre del cupón"
          rules={[{ required: true, message: "Ingresa el nombre del cupón" }]}
        >
          <Input
            size="large"
            disabled={isReadOnly}
            className="rounded-xl"
            placeholder="Ej. Descuento del 10%"
          />
        </Form.Item>

        <Form.Item
          name="code"
          label="Código"
          rules={[
            { required: true, message: "Ingresa el código" },
            {
              pattern: /^[A-Z0-9_-]{3,20}$/,
              message: "Usa 3–20 caracteres en MAYÚSCULAS, números, - o _",
            },
            {
              async validator(_, value) {
                if (isReadOnly || !value) return Promise.resolve();

                const v = String(value).toUpperCase().trim();
                const original = String(
                  form.getFieldValue("codeOriginal") || ""
                )
                  .toUpperCase()
                  .trim();

                // ➜ En edición, si no cambió el código, no validar contra backend
                if (type === "edit" && original && v === original) {
                  return Promise.resolve();
                }

                try {
                  const exists = await existsCouponByCode(v);
                  return exists
                    ? Promise.reject("El código ya existe")
                    : Promise.resolve();
                } catch {
                  // Si el endpoint de validación falla, no bloqueamos el flujo
                  return Promise.resolve();
                }
              },
              validateTrigger: "onBlur",
            },
          ]}
          normalize={(val) =>
            typeof val === "string" ? val.toUpperCase() : val
          }
        >
          <Input
            size="large"
            disabled={isReadOnly}
            className="rounded-xl font-mono"
            placeholder="EJ. DESC10"
          />
        </Form.Item>

        {/* Campo oculto para guardar el código original en edición */}
        {type === "edit" && (
          <Form.Item name="codeOriginal" hidden>
            <Input />
          </Form.Item>
        )}

        <div className="flex items-center justify-center gap-x-4 w-full">
          <Form.Item
            name="value"
            label="Valor (%)"
            className="w-full"
            rules={[
              { required: true, message: "Ingresa el porcentaje" },
              {
                validator: (_, v) =>
                  typeof v === "number" && v >= 0 && v <= 100
                    ? Promise.resolve()
                    : Promise.reject("Debe estar entre 0 y 100"),
              },
            ]}
          >
            <InputNumber
              size="large"
              disabled={isReadOnly}
              className="w-full rounded-xl"
              min={0}
              max={100}
              precision={0}
              placeholder="Ej. 10"
              addonAfter="%"
            />
          </Form.Item>

          <Form.Item
            name="expirationDate"
            label="Fecha de expiración"
            className="w-full flex items-center justify-center"
            rules={[
              { required: true, message: "Selecciona la fecha de expiración" },
              {
                validator: (_, value: Dayjs) =>
                  value && !disabledPastDates(value)
                    ? Promise.resolve()
                    : Promise.reject("No puede ser una fecha pasada"),
              },
            ]}
          >
            <DatePicker
              size="large"
              disabled={isReadOnly}
              className="w-full rounded-xl"
              format="DD/MM/YYYY"
              placeholder="Selecciona una fecha"
              disabledDate={disabledPastDates}
            />
          </Form.Item>

          <Form.Item
            name="active"
            label="Activo"
            valuePropName="checked"
            className="w-full flex items-center justify-center"
          >
            <Switch disabled={isReadOnly} />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Descripción"
          className="md:col-span-2"
        >
          <Input.TextArea
            disabled={isReadOnly}
            className="rounded-xl"
            rows={4}
            placeholder="Descripción del cupón (opcional)"
            maxLength={300}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
