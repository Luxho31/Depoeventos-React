import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";

export default function PaymentButton({ preferenceId }: any | undefined) {
  initMercadoPago("APP_USR-3ff5b38d-9481-4d03-ad7e-beb179b2c5de", {
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
