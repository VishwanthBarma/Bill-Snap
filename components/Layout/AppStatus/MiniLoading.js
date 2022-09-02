import { ChasingDots } from "better-react-spinkit";
import React from "react";

function MiniLoading() {
  return (
    <div className="flex items-center justify-center m-10">
      <ChasingDots size={30} color="orange" />
    </div>
  );
}

export default MiniLoading;
