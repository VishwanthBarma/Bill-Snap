import React, { useContext, useEffect } from "react";
import { BillSnapContext } from "../../../context/BillSnapContext";
import PaymentHistory from "./PaymentHistory";
import TotalPayment from "./TotalPayment";

function Payments({ groupID }) {
  const { getCurrentGroupPayments } = useContext(BillSnapContext);
  useEffect(() => {
    getCurrentGroupPayments(groupID);
  }, [groupID]);

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
