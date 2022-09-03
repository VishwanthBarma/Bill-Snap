import React, { useContext } from "react";
import { BillSnapContext } from "../../../context/BillSnapContext";
import PaymentHistoryCard from "./PaymentHistoryCard";

function PaymentHistory() {
  const { currentGroupPayments } = useContext(BillSnapContext);
  return (
    <div>
      {currentGroupPayments?.map((payment) => (
        <PaymentHistoryCard
          paymentData={payment.data()}
          paymentID={payment.id}
        />
      ))}
    </div>
  );
}

export default PaymentHistory;
