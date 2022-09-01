import React, { useContext } from "react";
import { BillSnapContext } from "../../../context/BillSnapContext";
import PaymentHistoryCard from "./PaymentHistoryCard";

function PaymentHistory() {
  return (
    <div>
      <PaymentHistoryCard />
      <PaymentHistoryCard />
      <PaymentHistoryCard />
      <PaymentHistoryCard />
      <PaymentHistoryCard />
      <PaymentHistoryCard />
      <PaymentHistoryCard />
    </div>
  );
}

export default PaymentHistory;
