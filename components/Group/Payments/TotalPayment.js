import React, { useContext } from "react";
import { BillSnapContext } from "../../../context/BillSnapContext";

function TotalPayment() {
  const { group } = useContext(BillSnapContext);
  return (
    <div className="m-3 flex flex-col bg-neutral-700 rounded-xl p-2 justify-center items-center">
      <h1 className="font-bold text-sky-400 text-lg">Total Expense</h1>
      <h1 className="text-sm text-slate-400">The Total expense of the group</h1>
      <div className="flex bg-neutral-800 justify-center items-center w-full p-2 rounded-xl mt-2">
        <h1 className="font-bold text-xl">
          Rs. <span className="sub-head">{group.totalExpense}</span>
        </h1>
      </div>
    </div>
  );
}

export default TotalPayment;
