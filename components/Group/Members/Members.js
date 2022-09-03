import React, { useContext } from "react";
import { BillSnapContext } from "../../../context/BillSnapContext";
import MemberCard from "./MemberCard";

function Members() {
  const { group } = useContext(BillSnapContext);
  console.log(group);
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h1 className="font-bold text-xl">Group Members</h1>
      </div>
      <div>
        {group?.involvedMembers?.map((member) => (
          <MemberCard
            photoURL={member?.photoURL}
            displayName={member?.displayName}
            email={member?.email}
          />
        ))}
      </div>
    </div>
  );
}

export default Members;
