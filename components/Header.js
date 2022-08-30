import React from "react";

function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-black py-2 px-5 border-b border-neutral-500 shadow-md lg:px-20 xl:px-56">
      <h1 className="logo text-4xl font-logo">BILL SNAP</h1>
      <div className="h-12 flex items-center space-x-2">
        <img
          className="h-12 w-12 rounded-full object-cover border-2 border-orange-400"
          src="https://avatars.githubusercontent.com/u/72876374?v=4"
        ></img>
        <h1 className="font-semibold text-sm text-slate-200">
          Vishwanth Barma
        </h1>
      </div>
    </div>
  );
}

export default Header;
