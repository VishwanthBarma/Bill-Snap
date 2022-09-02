import { getAuth } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BillSnapContext } from "../../context/BillSnapContext";
import { app, auth, db } from "../../firebase";
import MiniLoading from "../Layout/AppStatus/MiniLoading";
import CreateCard from "./CreateCard";
import GroupCard from "./GroupCard";

function CreateGroup() {
  const { user, currentUser } = useContext(BillSnapContext);
  const [groupsSnapshot, loading] = useCollection(
    db
      .collection("groups")
      .where("members", "array-contains-any", [currentUser])
  );

  return (
    <div className="mt-10">
      <h1 className="font-bold text-3xl">Your Bill Snap Groups</h1>
      <div className="flex mt-5 flex-wrap">
        <CreateCard />
        {loading ? (
          <MiniLoading />
        ) : (
          groupsSnapshot.docs.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))
        )}
      </div>
    </div>
  );
}

export default CreateGroup;
