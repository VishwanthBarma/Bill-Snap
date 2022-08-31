import React from "react";
import { HiViewGridAdd } from "react-icons/hi";
function CreateCard() {
  return (
    <div className="m-3">
      <button className="active:opacity-50 hover:scale-105 transition ease-linear">
        <div className="h-48 w-48 bg-black rounded-xl space-y-1 flex flex-col items-center justify-center group">
          <HiViewGridAdd className="h-10 w-10 text-zinc-700 group-hover:text-zinc-300" />
          <h1 className="font-semibold text-zinc-700 group-hover:text-zinc-300">
            Create Group
          </h1>
        </div>
      </button>
    </div>
  );
}

export default CreateCard;
