import React from "react";
import CreateCard from "./CreateCard";
import GroupCard from "./GroupCard";

function CreateGroup() {
  return (
    <div className="mt-10">
      <h1 className="font-bold text-3xl">Your Bill Snap Groups</h1>
      <div className="flex mt-5 flex-wrap">
        <CreateCard />
        <GroupCard />
      </div>
    </div>
  );
}

export default CreateGroup;
