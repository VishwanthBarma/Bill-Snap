import Link from "next/link";
import React from "react";

function GroupCard({ group }) {
  return (
    <div>
      <Link href={`/groups/${group.id}`} passHref>
        <a>
          <button>
            <div className="h-48 w-48 m-3 hover:scale-105 transition ease-linear bg-neutral-800 flex flex-col justify-between rounded-xl p-3">
              <h1 className="font-bold text-xl sub-head">
                {group.data().title}
              </h1>
              <h1 className="font-semibold text-slate-300">
                <span className="text-slate-200 font-bold text-lg">
                  {group.data().groupLength}
                </span>{" "}
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
