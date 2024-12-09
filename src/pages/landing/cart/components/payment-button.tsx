import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { mercadoPago } from "../../../../utils/routes/general.routes";

const PUBLIC_KEY = mercadoPago.PUBLIC_KEY;

export default function PaymentButton({ preferenceId }: any | undefined) {
  initMercadoPago(PUBLIC_KEY, {
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
