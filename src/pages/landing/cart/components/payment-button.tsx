import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";

export default function PaymentButton({ preferenceId }: any | undefined) {
  initMercadoPago("TEST-706cf6c0-223d-46dd-96b6-b5e41feb4362", {
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
