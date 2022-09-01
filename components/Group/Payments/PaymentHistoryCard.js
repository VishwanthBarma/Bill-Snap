import React from "react";
import ProgressBar from "./ProgressBar";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

function PaymentHistoryCard() {
  return (
    <div className="flex flex-col">
      <div className="bg-zinc-800 bg-opacity-80 flex flex-col p-3 rounded-xl text-neutral-400 m-3">
        <h1 className="font-bold text-lg sub-head2">Goa Hotel Bill</h1>
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
        <div className="flex flex-col text-white mt-3">
          {/* <button className="bg-sky-500 p-2 rounded-xl hover:bg-sky-400 active:bg-sky-600">
            <h1 className="font-bold">
              Pay <span className="">200</span> INR
            </h1>
          </button>
          <div className="flex justify-center bg-green-500 p-2 rounded-xl mt-2 items-center space-x-1">
            <div className="bg-white rounded-full">
              <TiTick className="h-5 w-5 text-green-500" />
            </div>
            <h1 className="font-bold">Payment Done</h1>
          </div>
          <h1 className="text-sm">
            You Paid <span className="text-lg">200 INR</span>
          </h1>
          <button className="bg-neutral-900 mt-2 p-2 rounded-xl hover:bg-neutral-700 active:opacity-50">
            <h1 className="font-semibold">Others to Pay</h1>
          </button>
          <ProgressBar progressPercentage={10} /> */}
        </div>
      </div>
    </div>
  );
}

export default PaymentHistoryCard;
