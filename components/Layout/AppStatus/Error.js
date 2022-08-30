import React from "react";
import ErrorIcon from "../../../public/Icons/ErrorIcon.png";

function Error() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center space-y-3">
      <Image src={ErrorIcon} height={200} width={200} />
      <div className="border-[1px] border-red-500 p-3 px-5 rounded-xl">
        <h1 className="font-semibold text-white">
          An error occurred. Please try again.
        </h1>
      </div>
    </div>
  );
}

export default Error;
