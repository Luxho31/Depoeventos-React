import { SmileOutlined } from "@ant-design/icons";
import "animate.css";
import { Progress, Tooltip } from "antd";
import { useState } from "react";
import { useCart } from "../../../context/CartProvider";
import { createOrder } from "../../../services/cart-service/cart-service";
import CartTable from "./components/cart-table";
import PaymentStep from "./components/payment-step";

export default function Cart() {
  const [progressPercent, setProgressPercent] = useState(0);
  const { products, getTotalPrice } = useCart();
  const [preferenceId, setPreferenceId] = useState("");

  const createOrderForm = async () => {
    try {
      const response = await createOrder();
      const preferenceId = response.preferenceId;
      setPreferenceId(preferenceId);
      setProgressPercent(50);
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <div className="flex flex-col w-[80%] m-auto mt-24 min-h-screen">
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
        className={`${
          progressPercent === 0 ? "block" : "hidden"
        } flex max-xl:flex-col items-start gap-x-12 `}
      >
        {/* <div className="w-[60rem] mb-24"> */}
        <div className="w-full mb-12">
          <CartTable />
        </div>
        {products.length != 0 ? (
          <div className="flex flex-col justify-around gap-y-8 max-sm:w-full mb-24">
            <div className="bg-[#f3f3f9] h-fit w-full flex flex-col justify-between rounded-3xl shadow-md p-8">
              <div className="max-sm:hidden">
                <h2 className="text-lg">¿Tienes un cupón?</h2>
                <div className="w-full flex justify-center mt-4 mb-8">
                  <Tooltip title="Proximamente..." placement="right">
                    <div className="w-full flex max-sm:flex-col max-sm:gap-y-6 justify-between border-neutral-300 border max-sm:border-none rounded-full ps-6 pe-1 py-1 max-sm:px-0">
                      <input
                        type="text"
                        className="sm:border-none sm:outline-none border-neutral-300 border rounded-full p-6"
                        placeholder="Ingresa tu cupón"
                        disabled
                      />
                      <button
                        className="bg-neutral-900 text-white rounded-full px-8 py-3 max-sm:py-4 hover:bg-neutral-700"
                        disabled
                      >
                        Aplicar
                      </button>
                    </div>
                  </Tooltip>
                </div>
                <hr className="h-px bg-neutral-300" />
              </div>

              <div className="my-8 flex flex-col gap-2">
                <div className="flex justify-between">
                  <h2 className="text-lg text-slate-400">Subtotal</h2>
                  <h2 className="text-lg text-slate-400 line-through">
                    S/. {getTotalPrice()}.00
                  </h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text-lg text-slate-400">Descuento</h2>
                  <h2 className="text-lg text-slate-400">- S/. 0.00</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">Total</h2>
                  <h2 className="text-xl font-semibold">
                    S/. {getTotalPrice()}.00
                  </h2>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="w-[90%] bg-neutral-900 text-white rounded-2xl py-4 hover:bg-neutral-700"
                  onClick={() => {
                    createOrderForm();
                  }}
                >
                  Continuar compra
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* Pasarela de Pago */}
      <div className={`${progressPercent === 50 ? "block" : "hidden"} mb-24`}>
        <PaymentStep preferenceId={preferenceId} />
      </div>
    </div>
  );
}
