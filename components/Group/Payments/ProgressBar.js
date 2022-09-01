import React from "react";

function ProgressBar({ progressPercentage }) {
  return (
    <div className="h-4 rounded-xl bg-neutral-900 bg-opacity-70 m-2 p-1">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full rounded-xl shadow-lg ${
          progressPercentage < 70 ? "bg-sky-600" : "bg-green-600"
        }`}
      ></div>
    </div>
  );
}

export default ProgressBar;
