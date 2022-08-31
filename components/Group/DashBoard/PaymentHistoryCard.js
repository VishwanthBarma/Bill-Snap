import React from "react";

function PaymentHistoryCard() {
  return (
    <div className="bg-zinc-800 bg-opacity-80 flex flex-col p-3 rounded-xl text-neutral-400 m-3">
      <h1 className="font-semibold text-lg sub-head">Goa Hotel Bill</h1>
      <h1>
        Paid by:{" "}
        <span className="font-semibold text-lg text-slate-100">someone</span>
      </h1>
      <h1>
        Selected members{" "}
        <span className="font-semibold text-lg text-slate-100">5</span>
      </h1>
      <h1>
        Amount: Rs.{" "}
        <span className="font-semibold text-lg text-slate-100">2000</span>/-
      </h1>
    </div>
  );
}

export default PaymentHistoryCard;
