import React from "react";
import GooglePayButton from "@google-pay/button-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { db } from "../../firebase";

function PayModal({ notification, paymentData, paymentID, groupID }) {
  const router = useRouter();
  const handlePay = (e) => {
    e.preventDefault();

    router.back();
    notification();
  };

  return (
    <div className="bg-neutral-900 p-3 rounded-xl w-72 flex items-center justify-center flex-col h-72">
      <Toaster />
      <h1 className="font-semibold mb-3 text-xl">Payment</h1>
      <button
        onClick={(e) => handlePay(e)}
        className="bg-sky-500 p-2 rounded-xl font-semibold w-full mb-5"
      >
        Mark As Pay
      </button>

      {/* Google Pay */}

      <GooglePayButton
        className="m-3 rounded-xl"
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "1",
            currencyCode: "USD",
            countryCode: "US",
          },
          shippingAddressRequired: true,
          callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("Success", paymentRequest);
        }}
        onPaymentAuthorized={(paymentData) => {
          console.log("Payment Authorised Success", paymentData);
          return { transactionState: "SUCCESS" };
        }}
        onPaymentDataChanged={(paymentData) => {
          console.log("On Payment Data Changed", paymentData);
          return {};
        }}
        existingPaymentMethodRequired="false"
        buttonColor="white"
        buttonType="pay"
      />
    </div>
  );
}

export default PayModal;
