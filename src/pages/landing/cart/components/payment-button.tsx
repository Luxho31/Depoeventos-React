import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import { createOrder } from "../../../../services/cart-service/cart-service";
import { useCart } from "../../../../context/CartProvider";

type Order = {
    id: number;
    paymentMethod: string;
    bankName: string;
    operationNumber: string;
    date: string;
    totalPrice: number;
    status: string;
};

export default function PaymentButton() {
    const { getTotalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [preferenceId, setPreferenceId] = useState("");

    initMercadoPago("TEST-5bbe59f5-ff49-49d3-a879-7529ea4813d0", {
        locale: "es-PE",
    });

    const createOrderForm = async (values: Order) => {
        try {
            setLoading(true);
            const order = await createOrder(values);
            console.log(order);

            if (order) setPreferenceId(order.preference_id);

            clearCart();
            return order
        } catch (error) {
            console.error("Error al crear la orden:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* <button onClick={() => createOrderForm}>Comprar</button> */}
            {/* {preferenceId && ( */}
                <Wallet
                    initialization={{
                        preferenceId: preferenceId,
                    }}
                    customization={{ texts: { valueProp: "smart_option" }}}
                    // onClick={() => createOrderForm}
                />
            {/* )} */}
        </>
    );
}
