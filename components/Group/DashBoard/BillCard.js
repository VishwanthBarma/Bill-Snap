import React from "react";

function BillCard() {
  return (
    <div className="flex flex-col items-center bg-neutral-800 space-y-3 rounded-xl divide-y-2 divide-sky-500 p-2">
      <div className="flex flex-col space-y-1 items-center">
        <h1 className="font-semibold text-lg">Total Group Expense</h1>
        <h1 className="font-bold text-xl">
          INR <span className="font-bold text-2xl sub-head">40000</span>
        </h1>
      </div>
      <div className="flex pt-3 space-x-4">
        <div className="flex flex-col items-center bg-neutral-900 w-44 p-2 rounded-xl">
          <h1 className="font-semibold">You are owed</h1>
          <h1 className="font-semibold text-lg">
            INR <span className="sub-head2 text-2xl font-bold">200</span>
          </h1>
        </div>
        <div className="flex flex-col items-center bg-neutral-900 w-44 p-2 rounded-xl">
          <h1 className="font-semibold">You owe</h1>
          <h1 className="font-semibold text-lg">
            INR <span className="sub-head2 text-2xl font-bold">5000</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default BillCard;