import { increment, serverTimestamp, updateDoc } from "firebase/firestore";
import Multiselect from "multiselect-react-dropdown";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BillSnapContext } from "../../../context/BillSnapContext";
import { db } from "../../../firebase";
import OwedDetails from "./OwedDetails";
import UserBillDetails from "./UserBillDetails";

function DashBoard({ groupID }) {
  const { group, user, getCurrentGroupDetails, getUserCurrentGroupDetails } =
    useContext(BillSnapContext);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions();
    getCurrentGroupDetails(groupID);
    getUserCurrentGroupDetails(groupID);
  }, [group]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const notification = toast.loading("Creating your payment...");

    if (selectedMembers.length == 0) return;
    const splitAmount = amount / (selectedMembers.length + 1);
    const yourOwedAmount = amount - splitAmount;

    db.collection("groups")
      .doc(groupID)
      .collection("payments")
      .add({
        paymentTitle: title,
        paymentAmount: amount,
        splitAmount: splitAmount,
        paidBy: user.displayName,
        timestamp: serverTimestamp(),
      })
      .then((doc) => {
        selectedMembers.forEach((member) => {
          db.collection("groups")
            .doc(groupID)
            .collection("payments")
            .doc(doc.id)
            .collection("selectedMembers")
            .doc(member.email)
            .set({
              paid: false,
              amountToPay: splitAmount,
              displayName: member.displayName,
              email: member.email,
              uid: member.uid,
              photoURL: member.photoURL,
            });

          db.collection("groups")
            .doc(groupID)
            .collection("members")
            .doc(member.email)
            .collection("youOwed")
            .add({
              owedToEmail: user.email,
              owedToName: user.displayName,
              owedAmount: splitAmount,
              paymentTitle: title,
            });

          db.collection("groups")
            .doc(groupID)
            .collection("members")
            .doc(user.email)
            .collection("youAreOwed")
            .add({
              owedByEmail: member.email,
              owedByName: member.displayName,
              owedAmount: splitAmount,
              paymentTitle: title,
            });

          db.collection("groups")
            .doc(groupID)
            .collection("members")
            .doc(member.email)
            .update({
              youOwed: increment(splitAmount),
            });
        });
      });

    db.collection("groups")
      .doc(groupID)
      .collection("members")
      .doc(user.email)
      .update({
        youAreOwed: increment(yourOwedAmount),
      });

    // update total expanse
    db.collection("groups")
      .doc(groupID)
      .update({
        totalExpense: increment(amount),
      });

    // TODO ADD NOTIFICATION

    setAmount("");
    setTitle("");
    setSelectedMembers([]);

    toast.success("Payment created successfully!", {
      id: notification,
    });
  };

  const getOptions = () => {
    const otherMembers = group?.involvedMembers?.filter(
      (member) => member.email != user.email
    );
    setOptions(otherMembers);
  };

  const multiSelectStyles = {
    multiselectContainer: {
      borderRadius: "30px",
      zIndex: "0",
      position: "realtive",
    },

    searchBox: {
      background: "#262626",
      borderRadius: "12px",
      border: "0",
      padding: "10px",
    },

    optionContainer: {
      borderRadius: "12px",
      padding: "8px",
      zIndex: "50",
      position: "absolute",
      width: "100%",
      backgroundColor: "#262626",
    },
  };

  return (
    <div className="flex flex-col">
      <Toaster />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="mb-4">
          <h1 className="font-bold text-lg ">Add Bill Payment</h1>
          <h1 className="text-slate-500 text-sm">
            Split your Bill Payment with your group members
          </h1>
        </div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          maxLength="30"
          className="bg-neutral-800 outline-none p-3 rounded-xl font-semibold"
          placeholder="Enter Title"
          type="text"
          required
        ></input>
        <input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          min="0"
          className="bg-neutral-800 outline-none p-3 rounded-xl font-semibold"
          placeholder="Enter Amount"
          type="number"
          required
        ></input>
        <Multiselect
          avoidHighlightFirstOption={true}
          value={selectedMembers}
          style={multiSelectStyles}
          options={options}
          displayValue="displayName"
          onSelect={(item) => setSelectedMembers(item)}
        />
        <button
          type="submit"
          className="bg-sky-500 p-2 rounded-xl font-semibold hover:bg-sky-400 active:opacity-50"
        >
          Submit
        </button>
      </form>
      <UserBillDetails />
      <OwedDetails />
    </div>
  );
}

export default DashBoard;
