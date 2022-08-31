import React from "react";
import MemberCard from "./MemberCard";

function Members() {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h1 className="font-bold text-xl">Group Members</h1>
      </div>
      <div>
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </div>
    </div>
  );
}

export default Members;
