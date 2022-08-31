import Link from "next/link";
import React from "react";

function GroupCard() {
  return (
    <div>
      <Link href="/groups/1" passHref>
        <a>
          <button>
            <div className="h-48 w-48 m-3 hover:scale-105 transition ease-linear bg-neutral-800 flex flex-col justify-between rounded-xl p-3">
              <h1 className="font-bold text-xl sub-head">
                Bengalore Tour In September
              </h1>
              <h1 className="font-semibold text-slate-300">
                <span className="text-slate-200 font-bold text-lg">10</span>{" "}
                members
              </h1>
            </div>
          </button>
        </a>
      </Link>
    </div>
  );
}

export default GroupCard;
