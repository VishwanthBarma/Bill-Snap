import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BillSnapContext } from "../../context/BillSnapContext";
import { auth } from "../../firebase";

function Header() {
  const { user } = useContext(BillSnapContext);
  const [profileClicked, setProfileClicked] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`${
        user ? "justify-between" : "justify-center"
      } sticky top-0 z-50 flex items-center bg-black h-16 px-5 border-b border-neutral-500 shadow-md lg:px-20 xl:px-56`}
    >
      <h1 className="logo text-4xl font-logo">BILL SNAP</h1>
      {user && (
        <button onClick={() => setProfileClicked(!profileClicked)}>
          <div className="h-12 flex items-center space-x-2">
            <img
              className="h-12 w-12 rounded-full object-cover border-2 border-orange-400"
              src={user.photoURL}
              atl="profile"
            ></img>
            {!profileClicked ? (
              <h1 className="font-semibold text-sm text-slate-200">
                {user.displayName}
              </h1>
            ) : (
              <button
                onClick={() => {
                  auth.signOut();
                  router.push("/");
                }}
                className="bg-neutral-700 p-2 rounded-xl"
              >
                Log Out
              </button>
            )}
          </div>
        </button>
      )}
    </div>
  );
}

export default Header;
