import {
  CloseCircleOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import "animate.css";
import { Checkbox, Form, Progress, Spin, Tag } from "antd";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import Terminos from "../../../assets/pdf/TerminosCondiciones.pdf";
import PoliticasPrivacidad from "../../../assets/pdf/PoliticaPrivacidad.pdf";
import { useCart } from "../../../context/CartProvider";
import { createOrder } from "../../../services/cart-service/cart-service";
import { getAllCoupons } from "../../../services/coupons-service";
import CartTable from "./components/cart-table";
import PaymentStep from "./components/payment-step";

type Coupon = {
  id: number;
  name: string;
  description?: string;
  code: string;
  expirationDate?: string;
  active: boolean;
  value: number;
};

export default function Cart() {
  const [progressPercent, setProgressPercent] = useState(0);
  const { products, getTotalPrice } = useCart();

  const [preferenceId, setPreferenceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledTerms, setDisabledTerms] = useState(true);

  const [discount, setDiscount] = useState(0);

  const [form] = Form.useForm();

  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([]);

  const [completedOrder, setCompletedOrder] = useState(false);

  const [termsChecked, setTermsChecked] = useState(false);
  const [dataUsageChecked, setDataUsageChecked] = useState(false);

  // === NUEVO: cupones activos desde backend ===
  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>([]);
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const isExpired = (iso?: string) => !!iso && iso < todayISO;
  const normalize = (s: string) => s.trim().toUpperCase();
  const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCoupons();
        const onlyActive = (Array.isArray(data) ? data : []).filter(
          (c: Coupon) => c.active && !isExpired(c.expirationDate)
        );
        setActiveCoupons(onlyActive);
      } catch (e) {
        console.error("Error cargando cupones activos:", e);
        setActiveCoupons([]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (checkboxType: "terms" | "dataUsage") => {
    if (checkboxType === "terms") {
      const newTermsChecked = !termsChecked;
      setTermsChecked(newTermsChecked);
      setDisabledTerms(!(newTermsChecked && dataUsageChecked));
    } else {
      const newDataUsageChecked = !dataUsageChecked;
      setDataUsageChecked(newDataUsageChecked);
      setDisabledTerms(!(termsChecked && newDataUsageChecked));
    }
  };

  const createOrderForm = async (values: any) => {
    try {
      setLoading(true);
      if (values.discount === undefined || values.discount === "") {
        values.discount = appliedCoupons[0] ?? "-";
      }
      const response = await createOrder(values.discount);
      const preferenceId = response.preferenceId;
      setPreferenceId(preferenceId);
      setProgressPercent(50);
      setCompletedOrder(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error al crear la orden:", error);
    } finally {
      setLoading(false);
    }
  };

  // === NUEVO: aplicar cupón activo ===
  const calculateDiscount = () => {
    if (couponCode.trim() === "") {
      toast.error("No se ha ingresado un cupón.");
      return;
    }

    if (appliedCoupons.length > 0) {
      toast.error(
        "Ya hay un cupón aplicado. No se pueden agregar más cupones."
      );
      return;
    }

    const entered = normalize(couponCode);
    const found = activeCoupons.find((c) => normalize(c.code) === entered);

    if (!found) {
      setCouponCode("");
      toast.error("Cupón inválido o no activo.");
      return;
    }

    if (isExpired(found.expirationDate)) {
      setCouponCode("");
      toast.error("El cupón está vencido.");
      return;
    }

    const pct = clamp(Number(found.value) || 0, 0, 100);
    const total = Number(getTotalPrice());
    const finalTotal = Number((total * (1 - pct / 100)).toFixed(2));

    setDiscountApplied(true);
    setDiscount(finalTotal);
    setAppliedCoupons([found.code]);
    setCouponCode("");

    toast.success(`Cupón aplicado: ${found.code} (-${pct}%)`);
  };

  const handleBackButton = () => {
    setProgressPercent(0);
    setCompletedOrder(false);
    window.scrollTo(0, 0);
  };

  const total = Number(getTotalPrice());
  const discountAmount = discountApplied
    ? Number((total - discount).toFixed(2))
    : 0;

  return (
    <div className="flex flex-col w-[80%] m-auto mt-24 min-h-screen">
      <Toaster richColors />
      <div className="w-full text-center">
        <div className={`${progressPercent === 0 ? "block" : "hidden"}`}>
          <h1 className="animate__animated animate__backInDown">
            Resumen de compra
          </h1>
        </div>
        <div className={`${progressPercent === 50 ? "block" : "hidden"}`}>
          <h1 className="animate__animated animate__backInDown">
            Realizar pago
          </h1>
        </div>
        <div className={`${progressPercent === 100 ? "block" : "hidden"}`}>
          <h1 className="animate__animated animate__backInDown">
            Compra realizada
          </h1>
        </div>
        <div className="relative mt-8 mb-12">
          <Progress percent={progressPercent} showInfo={false} />
          <SmileOutlined
            className="text-2xl"
            style={{
              position: "absolute",
              top: "50%",
              left: `calc(${progressPercent}% - 2px)`,
              transform: "translateY(-50%)",
              transition: "left 0.26s ease-in-out",
            }}
          />
        </div>
      </div>

      {/* Table Cart */}
      <div
        className={`${
          progressPercent === 0 ? "block" : "hidden"
        } flex max-xl:flex-col items-start gap-x-12 `}
      >
        <div className="w-full mb-12">
          <CartTable />
        </div>

        {products.length !== 0 ? (
          <div className="flex flex-col justify-around gap-y-8 max-sm:w-full w-[36rem] mb-24">
            <Form
              name="summary"
              form={form}
              onFinish={(values) => {
                if (!disabledTerms) {
                  createOrderForm(values);
                }
              }}
              onFinishFailed={() => {}}
              className="bg-[#f3f3f9] h-fit w-full flex flex-col justify-between rounded-3xl shadow-md p-8"
            >
              <div className="mb-8">
                <h2 className="text-lg">¿Tienes un cupón?</h2>
                <div className="w-full flex justify-center mt-4 mb-4">
                  <div className="w-full flex max-sm:flex-col max-sm:gap-y-6 justify-between border-neutral-300 border max-sm:border-none rounded-full p-1 max-sm:px-0">
                    <Form.Item name="discount" className="m-0 p-0">
                      <input
                        type="text"
                        className="sm:border-none sm:outline-none w-full bg-transparent border-neutral-300 border rounded-full p-4"
                        placeholder="Ingresa tu cupón"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        id="couponCode"
                      />
                    </Form.Item>
                    <button
                      type="button"
                      className="bg-neutral-900 text-white rounded-full px-8 py-3 max-sm:py-4 hover:bg-neutral-700"
                      onClick={() => {
                        if (couponCode.trim() !== "") {
                          calculateDiscount();
                        } else {
                          toast.error("No se ha ingresado un cupón.");
                        }
                      }}
                    >
                      Aplicar
                    </button>
                  </div>
                </div>

                {appliedCoupons.map((coupon, index) => (
                  <Tag
                    key={index}
                    closeIcon={<CloseCircleOutlined />}
                    onClose={() => {
                      setDiscountApplied(false);
                      setDiscount(0);
                      setAppliedCoupons([]);
                    }}
                  >
                    {coupon}
                  </Tag>
                ))}
              </div>

              <hr className="h-px bg-neutral-300" />

              <div className="my-8 flex flex-col gap-2">
                <div className="flex justify-between">
                  <h2 className="text-lg text-slate-400">Subtotal</h2>
                  <h2 className="text-lg text-slate-400 line-through">
                    S/. {total.toFixed(2)}
                  </h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text-lg text-slate-400">Descuento</h2>
                  <h2 className="text-lg text-slate-400">
                    {discountApplied
                      ? `S/. ${discountAmount.toFixed(2)}`
                      : "- S/. 0.00"}
                  </h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">Total</h2>
                  <h2 className="text-xl font-semibold">
                    {discountApplied
                      ? `S/. ${discount.toFixed(2)}`
                      : `S/. ${total.toFixed(2)}`}
                  </h2>
                </div>
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-y-3">
                <div className="flex flex-col items-center justify-center">
                  <Checkbox
                    className="text-md"
                    onChange={() => handleCheckboxChange("terms")}
                    disabled={loading}
                  >
                    He leído y acepto los{" "}
                    <a
                      className="text-blue-500 font-semibold hover:text-blue-700"
                      href={Terminos}
                      target="_blank"
                    >
                      términos y condiciones
                    </a>
                  </Checkbox>
                  <Checkbox
                    className="text-md"
                    onChange={() => handleCheckboxChange("dataUsage")}
                    disabled={loading}
                  >
                    Acepto el uso de mis datos para fines comerciales -{" "}
                    <a
                      className="text-blue-500 font-semibold hover:text-blue-700"
                      href={PoliticasPrivacidad}
                      target="_blank"
                    >
                      Política de privacidad
                    </a>
                  </Checkbox>
                </div>

                <button
                  className={
                    disabledTerms
                      ? "w-[90%] bg-neutral-400 text-white rounded-2xl py-4 hover:bg-neutral-600"
                      : "w-[90%] bg-neutral-900 text-white rounded-2xl py-4 hover:bg-neutral-700"
                  }
                  disabled={disabledTerms || loading}
                >
                  {loading ? (
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                    />
                  ) : (
                    "Realizar Pago"
                  )}
                </button>
              </div>
            </Form>
          </div>
        ) : null}
      </div>

      {/* Pasarela de Pago */}
      <div className={`${progressPercent === 50 ? "block" : "hidden"} mb-24`}>
        {completedOrder && (
          <PaymentStep
            preferenceId={preferenceId}
            discount={discount}
            couponCode={appliedCoupons}
          />
        )}
        <button
          type="button"
          onClick={handleBackButton}
          className="flex justify-center items-center gap-x-1 font-semibold max-sm:w-full mt-8 duration-300 hover:duration-300 hover:animate-pulse"
        >
          <FaChevronLeft className="text-lg" />
          Regresar
        </button>
      </div>
    </div>
  );
}
