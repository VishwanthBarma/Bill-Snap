import React from "react";

function NavigationBar({ changeNav }) {
  return (
    <div className="flex flex-col items-start space-y-3">
      <button
        onClick={() => changeNav("dashboard")}
        className="font-semibold bg-neutral-800 h-10 w-28 rounded-xl hover:bg-neutral-700 active:opacity-50"
      >
        DashBoard
      </button>
      <button
        onClick={() => changeNav("profile")}
        className="font-semibold bg-neutral-800 h-10 w-28 rounded-xl hover:bg-neutral-700 active:opacity-50"
      >
        Profile
      </button>
    </div>
  );
}

export default NavigationBar;
