import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { GoPrimitiveDot } from "react-icons/go";
import { BillSnapContext } from "../../../context/BillSnapContext";
import { db } from "../../../firebase";
import WaveLoading from "../../Loading/WaveLoading";

function MemberCard({ photoURL, displayName, email }) {
  const router = useRouter();
  const groupID = router.query.id;
  const [youAreOwedSnapShot, loading1] = useCollection(
    db
      .collection("groups")
      .doc(groupID)
      .collection("members")
      .doc(email)
      .collection("youAreOwed")
  );

  const [youOwedSnapShot, loading2] = useCollection(
    db
      .collection("groups")
      .doc(groupID)
      .collection("members")
      .doc(email)
      .collection("youOwed")
  );

  return (
    <div className="flex flex-col bg-neutral-800 rounded-xl p-2 m-3">
      <div className="flex space-x-2 items-center mb-2">
        <img className="h-14 w-14 cover rounded-full" src={photoURL}></img>
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg sub-head">{displayName}</h1>
          <h1 className="text-neutral-400">{email}</h1>
        </div>
      </div>
      {loading1 ? (
        <WaveLoading />
      ) : (
        <div className="flex flex-col p-1 rounded-xl items-start">
          <h1 className="font-semibold text-sky-500">Get From</h1>
          <div className="mt-1 bg-neutral-900 bg-opacity-50 p-3 rounded-xl w-full flex flex-col justify-center">
            {youAreOwedSnapShot?.docs.length != 0 ? (
              youAreOwedSnapShot?.docs?.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between text-slate-300 w-full items-center"
                >
                  <h1 className="f text-slate-100">
                    {member.data().owedByName}
                  </h1>
                  <GoPrimitiveDot className="h-3 w-3" />

                  <h1>Rs. {member.data().owedAmount}</h1>
                  <GoPrimitiveDot className="h-3 w-3" />
                  <h1>{member.data().paymentTitle}</h1>
                </div>
              ))
            ) : (
              <div className="text-slate-400">No Payments</div>
            )}
          </div>
        </div>
      )}
      {loading2 ? (
        <WaveLoading />
      ) : (
        <div className="flex flex-col p-1 rounded-xl items-start">
          <h1 className="font-semibold text-sky-500">Give To</h1>
          <div className="mt-1 bg-neutral-900 bg-opacity-50 p-3 rounded-xl w-full flex flex-col justify-center">
            {youOwedSnapShot?.docs.length != 0 ? (
              youOwedSnapShot?.docs?.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between text-slate-300 w-full items-center"
                >
                  <h1 className=" text-slate-100">
                    {member.data().owedToName}
                  </h1>
                  <GoPrimitiveDot className="h-3 w-3" />

                  <h1>Rs. {member.data().owedAmount}</h1>
                  <GoPrimitiveDot className="h-3 w-3" />
                  <h1>{member.data().paymentTitle}</h1>
                </div>
              ))
            ) : (
              <div className="text-slate-400">No Payments</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberCard;
