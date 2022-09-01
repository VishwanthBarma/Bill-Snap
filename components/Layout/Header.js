import React, { useContext } from "react";
import { BillSnapContext } from "../../context/BillSnapContext";

function Header() {
  const { user } = useContext(BillSnapContext);
  return (
    <div
      className={`${
        user ? "justify-between" : "justify-center"
      } sticky top-0 z-50 flex items-center bg-black h-16 px-5 border-b border-neutral-500 shadow-md lg:px-20 xl:px-56`}
    >
      <h1 className="logo text-4xl font-logo">BILL SNAP</h1>
      {user && (
        <div className="h-12 flex items-center space-x-2">
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-orange-400"
            src={user.photoURL}
            atl="profile"
          ></img>
          <h1 className="font-semibold text-sm text-slate-200">
            {user.displayName}
          </h1>
        </div>
      )}
    </div>
  );
}

export default Header;
