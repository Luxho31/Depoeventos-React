import {
  CloseCircleOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import "animate.css";
import { Checkbox, Form, Progress, Spin, Tag } from "antd";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import Terminos from "../../../assets/pdf/tyc.pdf";
import { useCart } from "../../../context/CartProvider";
import { createOrder } from "../../../services/cart-service/cart-service";
import CartTable from "./components/cart-table";
import PaymentStep from "./components/payment-step";

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
  const [appliedCoupons, setAppliedCoupons] = useState<any[]>([]);

  const [completedOrder, setCompletedOrder] = useState(false);

  const [termsChecked, setTermsChecked] = useState(false);
  const [dataUsageChecked, setDataUsageChecked] = useState(false);

  const handleCheckboxChange = (checkboxType: any) => {
    if (checkboxType === "terms") {
      const newTermsChecked = !termsChecked;
      setTermsChecked(newTermsChecked);
      setDisabledTerms(!(newTermsChecked && dataUsageChecked));
    } else if (checkboxType === "dataUsage") {
      const newDataUsageChecked = !dataUsageChecked;
      setDataUsageChecked(newDataUsageChecked);
      setDisabledTerms(!(termsChecked && newDataUsageChecked));
    }
  };

  const createOrderForm = async (values: any) => {
    try {
      console.log("Valores Create Order Form: ", values);
      setLoading(true);
      if (values.discount === undefined) {
        values.discount = "-";
      }

      console.log(values.discount);
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

  const calculateDiscount = () => {
    let discount = 0;
    if (couponCode.trim() === "") {
      toast.error("No se ha ingresado un cupón.");
      return discount;
    }

    if (appliedCoupons.length > 0) {
      toast.error(
        "Ya hay un cupón aplicado. No se pueden agregar más cupones."
      );

      return discount;
    }

    if (couponCode === "PROFESORES2025") {
      setDiscountApplied(true);
      discount = getTotalPrice() * (1 - 0.5);
      setDiscount(discount);
      setAppliedCoupons([couponCode]);
      toast.success("Cupón aplicado con éxito.");
      // } else
      // if (couponCode === "COMPLETOSUMMERSPVC") {
      //   setDiscountApplied(true);
      //   discount = getTotalPrice() * (1 - 0.0909);
      //   setDiscount(discount);
      //   setAppliedCoupons([couponCode]);
      //   toast.success("Cupón aplicado con éxito.");
      // } else if (couponCode === "MEDIOSUMMERSPVC") {
      //   setDiscountApplied(true);
      //   discount = getTotalPrice() * (1 - 0.0769);
      //   setDiscount(discount);
      //   setAppliedCoupons([couponCode]);
      //   toast.success("Cupón aplicado con éxito.");
    } else {
      setCouponCode("");
      toast.error("Cupón inválido.");
    }

    setCouponCode("");
    return discount;
  };

  const handleBackButton = () => {
    setProgressPercent(0);
    setCompletedOrder(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col w-[80%] m-auto mt-24 min-h-screen">
      <Toaster richColors />
      {/* Progress Bar */}
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
        className={`${progressPercent === 0 ? "block" : "hidden"
          } flex max-xl:flex-col items-start gap-x-12 `}
      >
        {/* <div className="w-[60rem] mb-24"> */}
        <div className="w-full mb-12">
          <CartTable />
        </div>

        {products.length != 0 ? (
          <div className="flex flex-col justify-around gap-y-8 max-sm:w-full w-[36rem] mb-24">
            <Form
              name="summary"
              form={form}
              onFinish={(values) => {
                if (!disabledTerms) {
                  createOrderForm(values);
                }
              }}
              onFinishFailed={() => { }}
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
                      if (
                        // coupon === "COMPLETOSUMMERSPVC" ||
                        // coupon === "MEDIOSUMMERSPVC" || 
                        coupon === "PROFESORES2025"
                      ) {
                        setDiscountApplied(false);
                      }
                      const updatedCoupons = appliedCoupons.filter(
                        (c) => c !== coupon
                      );
                      setAppliedCoupons(updatedCoupons);
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
                    S/. {getTotalPrice()}.00
                  </h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text-lg text-slate-400">Descuento</h2>
                  {discountApplied ? (
                    <h2 className="text-lg text-slate-400">
                      S/. {(getTotalPrice() - discount).toFixed(2)}
                    </h2>
                  ) : (
                    <h2 className="text-lg text-slate-400">- S/. 0.00</h2>
                  )}
                </div>
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">Total</h2>
                  {discountApplied ? (
                    <h2 className="text-xl font-semibold">
                      S/. {discount.toFixed(2)}
                    </h2>
                  ) : (
                    <h2 className="text-xl font-semibold">
                      S/. {getTotalPrice().toFixed(2)}
                    </h2>
                  )}
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
                    Acepto el uso de mis datos para fines comerciales
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
        ) : (
          <></>
        )}
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
