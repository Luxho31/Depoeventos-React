import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "../../../../context/AuthProvider";
import { useCart } from "../../../../context/CartProvider";
import { mercadoPago } from "../../../../utils/routes/general.routes";

const PUBLIC_KEY = mercadoPago.PUBLIC_KEY;

export default function PaymentStep({
  preferenceId,
  discount,
  couponCode,
}: {
  preferenceId: string;
  discount: number;
  couponCode: string[];
}) {
  useEffect(() => {
    initMercadoPago(PUBLIC_KEY, { locale: "es-PE" });
  }, []);

  useEffect(() => {
    console.log("Descuento (total final): ", discount);
    console.log("Código(s) de cupón: ", couponCode);
  }, [discount, couponCode]);

  const { getTotalPrice, products } = useCart();
  const { userInfo } = useAuth();

  const payerData = {
    name: `${userInfo?.firstName ?? ""} ${userInfo?.lastName ?? ""}`.trim(),
    email: userInfo?.username,
    country: userInfo?.country === "Peru" ? "Perú" : userInfo?.country,
  };

  type Children = { id: number; name: string };
  const total = useMemo(() => Number(getTotalPrice()) || 0, [getTotalPrice]);
  const hasDiscount = discount > 0 && discount < total;
  const discountAmount = hasDiscount
    ? Number((total - discount).toFixed(2))
    : 0;
  const percent =
    hasDiscount && total > 0 ? Math.round((discountAmount / total) * 100) : 0;

  const code =
    Array.isArray(couponCode) && couponCode.length > 0
      ? couponCode[0]
      : undefined;

  const cupLabel = code
    ? `Descuento: ${code}${percent ? ` (-${percent}%)` : ""}`
    : "Sin descuento";

  return (
    <div className="flex flex-col justify-between gap-4 xl:flex-row">
      <div className="w-full flex flex-col gap-4 md:flex-row xl:flex-col xl:w-2/5">
        {/* Resumen del carrito */}
        <div className="border rounded-md shadow-md p-8 w-full">
          <h2 className="text-xl mb-4">Resumen del carrito</h2>

          {/* Total original */}
          <h2 className="text-lg">Total S/. {total.toFixed(2)}</h2>

          {/* Monto descontado */}
          <h2 className="text-lg">
            Descuento: S/. {discountAmount.toFixed(2)}
          </h2>

          {/* Total a pagar */}
          <h2 className="text-lg font-semibold mt-2">
            Total a pagar: S/. {(hasDiscount ? discount : total).toFixed(2)}
          </h2>
        </div>

        {/* Información del pagador */}
        <div className="border rounded-md shadow-md p-8 w-full">
          <h2 className="text-lg font-semibold mb-4">
            Información del pagador
          </h2>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-600">Nombre:</p>
            <p className="text-sm">{payerData.name || "-"}</p>
          </div>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-600">Email:</p>
            <p className="text-sm">{payerData.email || "-"}</p>
          </div>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-600">País:</p>
            <p className="text-sm">{payerData.country || "-"}</p>
          </div>
        </div>
      </div>

      {/* Información de pago */}
      <div className="w-full xl:w-3/5">
        <div className="h-full border rounded-md shadow-md p-8">
          <h2 className="text-lg font-semibold mb-4">Información de pago</h2>
          <div className="flex flex-col mx-4 sm:flex-row sm:justify-between sm:mx-16 my-8">
            <div className="mb-2">
              <p className="text-sm font-semibold text-gray-600">
                Productos adquiridos
              </p>
              <ul className="list-disc">
                {products.map(
                  (
                    product: { children: Children; name: string },
                    index: number
                  ) => (
                    <li key={index} className="flex items-center gap-x-2">
                      <FaCheck className="text-green-700 text-xs" />
                      <p className="text-sm">
                        {product.name} ({product.children.name})
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-600">
                  Cupón aplicado:
                </p>
                <p className="text-sm">{cupLabel}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-600">
                  Fecha de compra
                </p>
                <p className="text-sm">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Wallet
              initialization={{ preferenceId }}
              customization={{ texts: { valueProp: "smart_option" } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
