import { ThreeBounce } from "better-react-spinkit";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <ThreeBounce size={30} color="orange" />
    </div>
  );
}

export default Loading;
