import React, { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BillSnapContext } from "../../../context/BillSnapContext";
import { db } from "../../../firebase";
import SubLoading from "../../Loading/SubLoading";
import MemberCard from "./MemberCard";

function Members({ groupID }) {
  const { group } = useContext(BillSnapContext);
  const [membersSnapshot, loading] = useCollection(
    db.collection("groups").doc(groupID).collection("members")
  );
  return (
    <>
      {loading ? (
        <SubLoading />
      ) : (
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="font-bold text-xl">Group Members</h1>
          </div>
          <div>
            {membersSnapshot?.docs?.map((member) => (
              <MemberCard
                key={member?.data().id}
                photoURL={member?.data().photoURL}
                displayName={member?.data().displayName}
                email={member?.data().email}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Members;
