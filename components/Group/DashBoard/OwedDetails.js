import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BillSnapContext } from "../../../context/BillSnapContext";
import { db } from "../../../firebase";
import WaveLoading from "../../Loading/WaveLoading";
import { GoPrimitiveDot } from "react-icons/go";

function OwedDetails() {
  const { user } = useContext(BillSnapContext);
  const router = useRouter();
  const groupID = router.query.id;
  const [youAreOwedSnapShot, loading1] = useCollection(
    db
      .collection("groups")
      .doc(groupID)
      .collection("members")
      .doc(user.email)
      .collection("youAreOwed")
  );

  const [youOwedSnapShot, loading2] = useCollection(
    db
      .collection("groups")
      .doc(groupID)
      .collection("members")
      .doc(user.email)
      .collection("youOwed")
  );
  return (
    <div className="flex flex-col mt-10">
      <div className="mb-4">
        <h1 className="font-bold text-lg ">Other Details</h1>
        <h1 className="text-slate-500 text-sm">
          Details about amount to get and give.
        </h1>
      </div>
      {loading1 ? (
        <WaveLoading />
      ) : (
        <div className="flex flex-col bg-neutral-800 p-2 rounded-xl items-center m-1 my-2">
          <h1 className="font-semibold text-sky-500">You Are Owed</h1>
          <div className="mt-2  bg-neutral-900 p-3 rounded-xl w-full flex flex-col justify-center">
            {youAreOwedSnapShot?.docs.length != 0 ? (
              youAreOwedSnapShot?.docs?.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between text-slate-300 w-full items-center"
                >
                  <h1 className="text-slate-100">{member.data().owedByName}</h1>
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
        <div className="flex flex-col bg-neutral-800 p-2 rounded-xl items-center m-1 mb-10">
          <h1 className="font-semibold text-sky-500">You Owe</h1>
          <div className="mt-2  bg-neutral-900 p-3 rounded-xl w-full flex flex-col justify-center">
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

export default OwedDetails;
