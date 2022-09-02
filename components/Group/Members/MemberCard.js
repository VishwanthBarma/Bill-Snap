import React, { useContext } from "react";
import { BillSnapContext } from "../../../context/BillSnapContext";

function MemberCard({ photoURL, displayName, email }) {
  return (
    <div className="flex space-x-2 items-center bg-neutral-800 p-2 rounded-xl m-3">
      <img className="h-14 w-14 cover rounded-full" src={photoURL}></img>
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg sub-head2">{displayName}</h1>
        <h1 className="text-neutral-400">{email}</h1>
      </div>
    </div>
  );
}

export default MemberCard;
