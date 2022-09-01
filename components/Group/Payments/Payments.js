import React from "react";
import PaymentHistory from "./PaymentHistory";
import TotalPayment from "./TotalPayment";

function Payments() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-4">
          <h1 className="font-bold text-lg ">Payment History</h1>
          <h1 className="text-slate-500 text-sm">
            Bill Payment History of this group
          </h1>
        </div>

        <TotalPayment />
        <PaymentHistory />
      </div>
    </div>
  );
}

export default Payments;
