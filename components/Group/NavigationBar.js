import React from "react";

function NavigationBar({ changeNav, nav }) {
  return (
    <div className="flex flex-col items-start space-y-3">
      <button
        onClick={() => changeNav("dashboard")}
        className={`font-semibold ${
          nav == "dashboard" ? "text-sky-500" : "text-slate-300"
        } bg-neutral-800 h-10 w-28 rounded-xl hover:bg-neutral-700 active:opacity-50`}
      >
        DashBoard
      </button>
      <button
        onClick={() => changeNav("payments")}
        className={`font-semibold ${
          nav == "payments" ? "text-sky-500" : "text-slate-300"
        } bg-neutral-800 h-10 w-28 rounded-xl hover:bg-neutral-700 active:opacity-50`}
      >
        Payments
      </button>
      <button
        onClick={() => changeNav("members")}
        className={`font-semibold ${
          nav == "members" ? "text-sky-500" : "text-slate-300"
        } bg-neutral-800 h-10 w-28 rounded-xl hover:bg-neutral-700 active:opacity-50`}
      >
        Members
      </button>
    </div>
  );
}

export default NavigationBar;
