import React from "react";
import CreateCard from "./CreateCard";
import GroupCard from "./GroupCard";

function CreateGroup() {
  return (
    <div className="mt-10">
      <h1 className="font-bold text-3xl sub-head">Your Bill Snap Groups</h1>
      <div className="flex mt-5 flex-wrap">
        <CreateCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </div>
    </div>
  );
}

export default CreateGroup;
