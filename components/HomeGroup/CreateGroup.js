import { getAuth } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import toast, { Toaster } from "react-hot-toast";
import { BillSnapContext } from "../../context/BillSnapContext";
import { app, auth, db } from "../../firebase";
import MiniLoading from "../Loading/MiniLoading";
import CreateCard from "./CreateCard";
import GroupCard from "./GroupCard";

function CreateGroup() {
  const { user, currentUser } = useContext(BillSnapContext);

  const [allInvolvedGroupsSnapShot, loading] = useCollection(
    db
      .collection("groups")
      .where("involvedMembers", "array-contains", currentUser)
  );

  const notification = () => {
    toast.success("Group Created Successfully!");
  };

  return (
    <div className="mt-10">
      <Toaster />

      <h1 className="font-bold text-3xl text-center md:text-start">
        Your Bill Snap Groups
      </h1>
      <div className="flex mt-5 md:flex-wrap flex-col md:flex-row items-center justify-center md:justify-start">
        <CreateCard notification={notification} />
        {loading ? (
          <MiniLoading />
        ) : (
          allInvolvedGroupsSnapShot?.docs?.map((group) => (
            <GroupCard key={group.id} group={group.data()} id={group.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default CreateGroup;
