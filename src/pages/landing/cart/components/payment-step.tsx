import { useState, useEffect } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useCart } from "../../../../context/CartProvider";
import { FaCheck } from "react-icons/fa";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../context/AuthProvider";

export default function PaymentStep(preferenceId: string) {
  const [walletLoading, setWalletLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const walletTimeout = setTimeout(() => {
      setWalletLoading(false);
    }, 3000);

    const pageTimeout = setTimeout(() => {
      setPageLoading(false);
    }, 5000);

    return () => {
      clearTimeout(walletTimeout);
      clearTimeout(pageTimeout);
    };
  }, []);

  initMercadoPago("TEST-5bbe59f5-ff49-49d3-a879-7529ea4813d0", {
    locale: "es-PE",
  });

  const { getTotalPrice, products } = useCart();
  const { userInfo } = useAuth();

  const payerData = {
    name: userInfo?.firstName + " " + userInfo?.lastName,
    email: userInfo?.username,
    country: userInfo?.country === "Peru" ? "Perú" : userInfo?.country,
  };

  type Children = {
    id: number;
    name: string;
  };

  if (walletLoading || pageLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center text-white">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between gap-4 xl:flex-row">
      <div className="w-full flex flex-col gap-4 md:flex-row xl:flex-col xl:w-2/5">
        {/* Cart Summary */}
        <div className="border rounded-md shadow-md p-8 w-full">
          <h2 className="text-xl mb-4">Cart Summary</h2>
          <h2 className="text-lg">Total S/. {getTotalPrice()}</h2>
        </div>

        {/* Información del pagador */}
        <div className="border rounded-md shadow-md p-8 w-full">
          <h2 className="text-lg font-semibold mb-4">
            Información del pagador
          </h2>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-600">Nombre:</p>
            <p className="text-sm">{payerData.name}</p>
          </div>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-600">Email:</p>
            <p className="text-sm">{payerData.email}</p>
          </div>
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-600">País:</p>
            <p className="text-sm">{payerData.country}</p>
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
                    product: {
                      children: Children;
                      name: string;
                    },
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
                <p className="text-sm"> - </p>
              </div>
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-600">
                  Fecha de compra
                </p>
                <p className="text-sm">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          {/* Renderizar el Wallet una vez que ha cargado */}
          <div className="flex items-center justify-center">
            <Wallet
              initialization={{ preferenceId: preferenceId }}
              customization={{
                texts: { valueProp: "smart_option" },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
