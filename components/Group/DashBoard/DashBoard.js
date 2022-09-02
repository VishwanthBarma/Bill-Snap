import { increment, updateDoc } from "firebase/firestore";
import Multiselect from "multiselect-react-dropdown";
import { withRouter } from "next/router";
import { userAgent } from "next/server";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { BillSnapContext } from "../../../context/BillSnapContext";
import { db } from "../../../firebase";
import PaymentHistory from "../Payments/PaymentHistory";
import TotalPayment from "../Payments/TotalPayment";
import UserBillDetails from "./UserBillDetails";

function DashBoard({ groupID }) {
  const {
    group,
    user,
    getOtherUserGroupDetails,
    updateUserMember,
    userCurrentGroupDetails,
    otherUserGroupDetails,
    getCurrentGroupDetails,
  } = useContext(BillSnapContext);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions();
    getCurrentGroupDetails(groupID);
  }, [group]);

  const handleSubmit = (e) => {
    const splitAmount = amount / (selectedMembers.length + 1);

    db.collection("groups").doc(groupID).collection("payments").doc(title).set({
      paymentTitle: title,
      paymentAmount: amount,
      selectedMembers: selectedMembers,
      splitAmount: splitAmount,
    });

    // getOtherUserGroupDetails(groupID);

    // const addingAmount = amount - splitAmount;

    // handleSplitAmount();
    //Update

    // ADD NOTIFICATION

    setAmount("");
    setTitle("");
    setSelectedMembers([]);
  };

  const handleSplitAmount = async (addingAmount) => {
    // updating total revenue
    updateUserMember(addingAmount);

    const docRef = db.collection("groups").doc(groupID);
    await updateDoc(docRef, {
      totalRevenue: increment(amount),
    });

    await updateDoc(docRef, {
      members: {
        userCurrentGroupDetails,
        ...otherUserGroupDetails,
      },
    });
  };

  const getOptions = () => {
    const otherMembers = group?.members?.filter(
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
    </div>
  );
}

export default DashBoard;
