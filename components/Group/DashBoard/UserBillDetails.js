import React from "react";
import BillCard from "./BillCard";

function UserBillDetails() {
  return (
    <div>
      <div className="flex flex-col mt-10">
        <div className="mb-4">
          <h1 className="font-bold text-lg ">Group Details</h1>
          <h1 className="text-slate-500 text-sm">
            Details regarding group payments
          </h1>
        </div>
      </div>
      <BillCard />
    </div>
  );
}

export default UserBillDetails;
