import {
    Button
} from "antd";
import { useState } from "react";
import { useCart } from "../../../../context/CartProvider";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";


export default function PaymentStep({ preferenceId }: any) {
    initMercadoPago("TEST-5bbe59f5-ff49-49d3-a879-7529ea4813d0", {
        locale: "es-PE",
    });
    const [open, setOpen] = useState(false);
    const { products, getTotalPrice } = useCart();

    return (

        <>
            <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
            < div className="w-[22rem]" >
                <div className="border rounded-md shadow-md p-8">
                    <h2 className="text-lg mb-4">Cart Summary</h2>
                    <h2 className="text-2xl font-bold">
                        Total S/. {getTotalPrice()}
                    </h2>
                </div>
                <div className="flex justify-center mt-20 ">
                    <Button
                        className="w-[60%]  h-12 bg-indigo-200 text-md"
                        onClick={() => setOpen(true)}
                    >
                        ¿Necesitas ayuda?
                    </Button>
                </div>
            </div >
        </>
    );
}
