import React, { useContext } from "react";
import { BillSnapContext } from "../../../context/BillSnapContext";

function BillCard() {
  const { group, userCurrentGroupDetails } = useContext(BillSnapContext);

  return (
    <div className="flex flex-col items-center bg-neutral-800 space-y-3 rounded-xl divide-y-2 divide-sky-500 p-2">
      <div className="flex flex-col space-y-1 items-center">
        <h1 className="font-semibold text-lg text-sky-500">
          Total Group Expense
        </h1>
        <h1 className="font-bold text-xl">
          Rs.{" "}
          <span className="font-bold text-2xl sub-head">
            {group?.totalExpense}
          </span>
        </h1>
      </div>
      <div className="flex pt-3 space-x-4">
        <div className="flex flex-col items-center bg-neutral-900 md:w-44 w-40 p-2 rounded-xl">
          <h1 className="font-semibold">You are owed</h1>
          <h1 className="font-semibold text-lg">
            Rs.{" "}
            <span className="sub-head2 text-2xl font-bold">
              {userCurrentGroupDetails?.youAreOwed}
            </span>
          </h1>
        </div>
        <div className="flex flex-col items-center bg-neutral-900 md:w-44 w-40 p-2 rounded-xl">
          <h1 className="font-semibold">You owe</h1>
          <h1 className="font-semibold text-lg">
            Rs.{" "}
            <span className="sub-head2 text-2xl font-bold">
              {userCurrentGroupDetails?.youOwed}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default BillCard;
