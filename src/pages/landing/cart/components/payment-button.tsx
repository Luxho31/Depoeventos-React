import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";

export default function PaymentButton({ preferenceId }: string | any) {
    initMercadoPago("TEST-5bbe59f5-ff49-49d3-a879-7529ea4813d0", {
        locale: "es-PE",
    });
    return (
        <>
            {preferenceId && (
                <Wallet

                    initialization={{
                        preferenceId: preferenceId,
                    }}
                    customization={{ texts: { valueProp: "smart_option" } }}
                />
            )}
        </>
    );
}
