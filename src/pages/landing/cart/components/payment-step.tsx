import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "../../../../context/AuthProvider";
import { useCart } from "../../../../context/CartProvider";

export default function PaymentStep({ preferenceId, discount }: any) {
    // const [walletLoading, setWalletLoading] = useState(true);
    // const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        console.log("Descuento: ", discount);

        // const walletTimeout = setTimeout(() => {
        //     setWalletLoading(false);
        // }, 3000);

        // const pageTimeout = setTimeout(() => {
        //     setPageLoading(false);
        // }, 5000);

        // return () => {
        //     clearTimeout(walletTimeout);
        //     clearTimeout(pageTimeout);
        // };
    }, []);

    initMercadoPago("APP_USR-3ff5b38d-9481-4d03-ad7e-beb179b2c5de", {
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

    // if (walletLoading || pageLoading) {
    //     return (
    //         <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center text-white">
    //             <Spin
    //                 indicator={
    //                     <LoadingOutlined style={{ fontSize: 24 }} spin />
    //                 }
    //             />
    //         </div>
    //     );
    // }

    const asignarNombre = () => {
        if (discount === true) {
            return "Descuento: PROFESORES2024";
        }
        return "Sin descuento";
    };

    return (
        <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full flex flex-col gap-4 md:flex-row xl:flex-col xl:w-2/5">
                {/* Cart Summary */}
                <div className="border rounded-md shadow-md p-8 w-full">
                    <h2 className="text-xl mb-4">Cart Summary</h2>

                    {discount ? (
                        <h2 className="text-lg">
                            Total S/. {getTotalPrice() / 2}
                        </h2>
                    ) : (
                        <h2 className="text-lg">Total S/. {getTotalPrice()}</h2>
                    )}
                    <h2 className="text-lg">{asignarNombre()}</h2>
                </div>

                {/* Información del pagador */}
                <div className="border rounded-md shadow-md p-8 w-full">
                    <h2 className="text-lg font-semibold mb-4">
                        Información del pagador
                    </h2>
                    <div className="mb-2">
                        <p className="text-sm font-semibold text-gray-600">
                            Nombre:
                        </p>
                        <p className="text-sm">{payerData.name}</p>
                    </div>
                    <div className="mb-2">
                        <p className="text-sm font-semibold text-gray-600">
                            Email:
                        </p>
                        <p className="text-sm">{payerData.email}</p>
                    </div>
                    <div className="mb-2">
                        <p className="text-sm font-semibold text-gray-600">
                            País:
                        </p>
                        <p className="text-sm">{payerData.country}</p>
                    </div>
                </div>
            </div>
            {/* Información de pago */}
            <div className="w-full xl:w-3/5">
                <div className="h-full border rounded-md shadow-md p-8">
                    <h2 className="text-lg font-semibold mb-4">
                        Información de pago
                    </h2>
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
                                        <li
                                            key={index}
                                            className="flex items-center gap-x-2"
                                        >
                                            <FaCheck className="text-green-700 text-xs" />
                                            <p className="text-sm">
                                                {product.name} (
                                                {product.children.name})
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
                                <p className="text-sm">
                                    {new Date().toLocaleDateString()}
                                </p>
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
