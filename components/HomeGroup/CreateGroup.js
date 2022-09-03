import { getAuth } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BillSnapContext } from "../../context/BillSnapContext";
import { app, auth, db } from "../../firebase";
import MiniLoading from "../Loading/MiniLoading";
import CreateCard from "./CreateCard";
import GroupCard from "./GroupCard";

function CreateGroup() {
  const { user, currentUser, getAllInvolvedGroups, allInvolvedGroups } =
    useContext(BillSnapContext);

  useEffect(() => {
    getAllInvolvedGroups();
  }, [allInvolvedGroups]);

  return (
    <div className="mt-10">
      <h1 className="font-bold text-3xl">Your Bill Snap Groups</h1>
      <div className="flex mt-5 flex-wrap">
        <CreateCard />
        {allInvolvedGroups?.length == 0 ? (
          <MiniLoading />
        ) : (
          allInvolvedGroups?.map((group) => (
            <GroupCard key={group.id} group={group.data()} id={group.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default CreateGroup;
