import { withRouter } from "next/router";
import React, { useState } from "react";
import Select from "react-select";
import PaymentHistory from "../Payments/PaymentHistory";
import TotalPayment from "../Payments/TotalPayment";
import UserBillDetails from "./UserBillDetails";

function DashBoard() {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setAmount("");
    setTitle("");
    setSelectedMembers([]);
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#2b2b2b",
      border: "none",
      borderRadius: "12px",
      padding: "5px",
      color: "#fff",
    }),
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
        <Select
          onChange={(item) => setSelectedMembers(item)}
          className="select"
          styles={colorStyles}
          value={selectedMembers}
          options={options}
          isMulti={true}
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
