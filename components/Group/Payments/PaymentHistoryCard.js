import React, { useContext, useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import { useRouter } from "next/router";
import WaveLoading from "../../Loading/WaveLoading";
import { BillSnapContext } from "../../../context/BillSnapContext";
import ReactModal from "react-modal";
import PayModal from "../../Modal/PayModal";
import { GoPrimitiveDot } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";

function PaymentHistoryCard({ paymentData, paymentID }) {
  const { user } = useContext(BillSnapContext);
  const router = useRouter();

  // console.log(router.pathname);

  const [amIPaid, setAmIPaid] = useState(null);

  const groupID = router.query.id;
  const [membersSnapShot, loading] = useCollection(
    db
      .collection("groups")
      .doc(groupID)
      .collection("payments")
      .doc(paymentID)
      .collection("selectedMembers")
  );

  useEffect(() => {
    checkAmIPaid();
  }, [paymentID]);

  const isPaidByMe = () => paymentData?.paidBy == user?.displayName;

  const checkIsMeASelectedMember = () => {
    const amIMember = membersSnapShot?.docs.findIndex(
      (member) => member.data().email == user?.email
    );
    return amIMember == -1 ? false : true;
  };

  const checkAmIPaid = () => {
    db.collection("groups")
      .doc(groupID)
      .collection("payments")
      .doc(paymentID)
      .collection("selectedMembers")
      .where("email", "==", user?.email)
      .get()
      .then((doc) => {
        const value = doc?.docs[0]?.data().paid;
        setAmIPaid(value);
      });
  };

  const showStatus = () => {
    if (isPaidByMe()) {
      return (
        <div className="flex items-center justify-center bg-neutral-900 p-2 rounded-xl">
          <h1 className="text-sm font-semibold">
            You Paid <span className="text-lg">{paymentData.splitAmount} </span>
            INR
          </h1>
        </div>
      );
    } else if (checkIsMeASelectedMember() && amIPaid) {
      return (
        <div className="flex justify-center bg-green-500 p-2 rounded-xl items-center space-x-1">
          <div className="bg-white rounded-full">
            <TiTick className="h-5 w-5 text-green-500" />
          </div>
          <h1 className="font-bold">Payment Done</h1>
        </div>
      );
    } else {
      return (
        <button
          onClick={() =>
            router.push(`/groups/${groupID}/?payment=${paymentID}`)
          }
          className="bg-sky-500 p-1 rounded-xl hover:bg-sky-400 active:bg-sky-600 px-10"
        >
          <h1 className="font-semibold">
            Pay{" "}
            <span className="text-lg font-bold">{paymentData.splitAmount}</span>{" "}
            INR
          </h1>
          <ReactModal
            isOpen={Boolean(router.query.payment)}
            onRequestClose={() => router.back()}
            style={{
              content: {
                top: "35%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                padding: 0,
                border: "none",
                backgroundColor: "",
                transform: "translate(-50%, -50%)",
              },
              overlay: {
                backgroundColor: "#334250a7",
              },
            }}
          >
            <PayModal
              notification={notification}
              paymentData={paymentData}
              paymentID={paymentID}
              groupID={groupID}
            />
          </ReactModal>
        </button>
      );
    }
  };

  const notification = () => {
    toast.success("Paid Successfully!");
  };

  return (
    <div className="flex flex-col">
      <Toaster />
      <div className="bg-zinc-800 bg-opacity-80 flex flex-col p-3 rounded-xl text-neutral-400 m-3">
        <h1 className="font-bold text-lg text-sky-500">
          {paymentData?.paymentTitle}
        </h1>
        <h1 className="text-xs mb-4">
          {new Date(paymentData?.timestamp.seconds * 1000).toDateString()}
        </h1>
        <div>
          <h1>
            Paid by:{" "}
            <span className="font-semibold text-md text-slate-100">
              {paymentData?.paidBy}
            </span>
          </h1>
        </div>
        <h1>
          Amount: <span className="text-slate-300">Rs.</span>
          <span className="font-semibold ml-1 text-lg text-slate-100">
            {paymentData?.paymentAmount}
          </span>
        </h1>
        <h1 className="flex items-center font-bold text-slate-200 mt-2 sub-head">
          Selected members{" "}
          <span className="font-semibold text-md text-slate-100 ml-2">
            {loading ? <WaveLoading /> : membersSnapShot?.docs.length}
          </span>
        </h1>
        <div className="bg-neutral-700 bg-opacity-40 p-3 mt-1 rounded-xl">
          {membersSnapShot?.docs.map((member) => (
            <div key={member.id} className="flex space-x-2 items-center">
              <h1 className="font-semibold text-slate-300">
                {member.data().displayName}
              </h1>
              <GoPrimitiveDot className="h-3 w-3" />
              <h1 className="text-slate-200">
                {member.data().amountToPay} <span>INR</span>
              </h1>
            </div>
          ))}
        </div>

        <div className="flex flex-col text-white mt-3">{showStatus()}</div>
      </div>
    </div>
  );
}

export default PaymentHistoryCard;
