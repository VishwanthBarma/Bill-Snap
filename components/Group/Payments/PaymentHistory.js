import React, { useContext } from "react";
import { BillSnapContext } from "../../../context/BillSnapContext";
import PaymentHistoryCard from "./PaymentHistoryCard";

function PaymentHistory() {
  const { currentGroupPayments } = useContext(BillSnapContext);
  return (
    <>
      {currentGroupPayments?.length == 0 ? (
        <div className="flex bg-neutral-800 p-2 rounded-xl font-bold mt-5 justify-center">
          <h1>No Payments</h1>
        </div>
      ) : (
        <div>
          {currentGroupPayments?.map((payment) => (
            <PaymentHistoryCard
              paymentData={payment.data()}
              paymentID={payment.id}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default PaymentHistory;
