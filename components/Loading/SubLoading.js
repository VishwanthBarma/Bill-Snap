import { Circle } from "better-react-spinkit";
import React from "react";
import Header from "../Layout/Header";

function SubLoading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Circle size={66} color="orange" />
    </div>
  );
}

export default SubLoading;
