import Link from "next/link";
import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { auth, provider } from "../../../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <div>
      <div className="h-screen bg-neutral-900">
        <div className=" text-white flex flex-col items-center p-8">
          <div className="bg-white  bg-opacity-95 text-black h-[29.5rem] w-[22.5rem] sm:h-[40rem] sm:w-[29rem] mt-[3rem] shadow-2xl shadow-slate-400  rounded-3xl sm:p-9 p-10">
            <div className="flex flex-col items-center">
              <h1 className="font-bold mt-5 text-3xl">SIGN IN FOR FREE</h1>
              <p className="">Built for FindCoder Hackathon.</p>
            </div>
            <div className="flex flex-col items-center relative h-[20rem]">
              <h1 className="text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
                BILL
              </h1>
              <h1 className="text-[8rem] font-bold absolute top-[7rem] text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500">
                SNAP
              </h1>
            </div>

            <div
              onClick={signIn}
              className="cursor-pointer flex flex-col items-center bg-neutral-800  p-3 rounded-3xl shadow-lg shadow-orange-200 hover:translate-y-[-3px]"
            >
              <button className="flex items-center font-semibold text-lg text-orange-100">
                <BsGoogle className="mr-3" />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
