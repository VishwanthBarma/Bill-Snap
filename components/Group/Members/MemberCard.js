import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { GoPrimitiveDot } from "react-icons/go";
import { db } from "../../../firebase";
import WaveLoading from "../../Loading/WaveLoading";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

function MemberCard({ photoURL, displayName, email, youOwed, youAreOwed }) {
  const router = useRouter();
  const groupID = router.query.id;
  const [clickedMore, setClickedMore] = useState(false);
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
      {!clickedMore && (
        <button
          onClick={() => setClickedMore(!clickedMore)}
          className="bg-neutral-900 p-2 rounded-xl font-semibold text-sky-500 flex justify-center"
        >
          <BsFillCaretDownFill className="h-5 w-5 text-sky-500" />
        </button>
      )}

      {clickedMore && (
        <div>
          <div className="flex flex-col p-2 space-y-2 bg-neutral-900 bg-opacity-70 rounded-xl md:px-20 mb-3">
            <div className="flex flex-col justify-start rounded-xl bg-opacity-50 items-center">
              <h1 className="font-semibold text-sky-400">You Are Owed</h1>

              <h1 className="font-semibold">Rs. {youAreOwed}</h1>
            </div>
            <hr className=""></hr>
            <div className="flex flex-col justify-start rounded-xl bg-opacity-50 items-center">
              <h1 className="font-semibold text-sky-400">You Owe</h1>

              <h1 className="font-semibold">Rs. {youOwed}</h1>
            </div>
          </div>
          {loading1 ? (
            <WaveLoading />
          ) : (
            <div className="flex flex-col p-1 rounded-xl items-start">
              <h1 className="font-semibold text-sky-500">Get From</h1>
              <div className="mt-1 bg-neutral-900 bg-opacity-50 p-3 rounded-xl w-full flex divide-y-2 divide-neutral-500 flex-col justify-center md:px-20">
                {youAreOwedSnapShot?.docs.length != 0 ? (
                  youAreOwedSnapShot?.docs?.map((member) => (
                    <div
                      key={member.id}
                      className="flex justify-center text-slate-300 w-full items-center  py-1"
                    >
                      <h1 className="f text-slate-100">
                        {member.data().owedByName}
                      </h1>
                      <GoPrimitiveDot className="h-3 w-3 mx-2" />

                      <h1>Rs. {member.data().owedAmount}</h1>
                      <GoPrimitiveDot className="h-3 w-3 mx-2" />
                      <h1>{member.data().paymentTitle}</h1>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 justify-center text-center">
                    No Payments
                  </div>
                )}
              </div>
            </div>
          )}

          {loading2 ? (
            <WaveLoading />
          ) : (
            <div className="flex flex-col p-1 rounded-xl items-start">
              <h1 className="font-semibold text-sky-500">Give To</h1>
              <div className="mt-1 bg-neutral-900 bg-opacity-50 p-3 rounded-xl w-full flex divide-y-2 divide-neutral-500 flex-col justify-center md:px-20">
                {youOwedSnapShot?.docs.length != 0 ? (
                  youOwedSnapShot?.docs?.map((member) => (
                    <div
                      key={member.id}
                      className="flex justify-center text-slate-300 w-full items-center py-1"
                    >
                      <h1 className=" text-slate-100">
                        {member.data().owedToName}
                      </h1>
                      <GoPrimitiveDot className="h-3 w-3 mx-2" />

                      <h1>Rs. {member.data().owedAmount}</h1>
                      <GoPrimitiveDot className="h-3 w-3 mx-2" />
                      <h1>{member.data().paymentTitle}</h1>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 justify-center text-center">
                    No Payments
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {clickedMore && (
        <button
          onClick={() => setClickedMore(!clickedMore)}
          className="bg-neutral-900 p-2 rounded-xl font-semibold text-sky-500 mt-1 flex justify-center"
        >
          <BsFillCaretUpFill className="h-5 w-5 text-sky-500" />
        </button>
      )}
    </div>
  );
}

export default MemberCard;
