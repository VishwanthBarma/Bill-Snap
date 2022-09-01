import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { BillSnapContext } from "../../context/BillSnapContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

function CreateGroupModal() {
  const { user } = useContext(BillSnapContext);
  const [title, setTitle] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  //   const [options, setOptions] = useState([]);

  const [optionsSnapshot, loading] = useCollection(
    db.collection("users").where("uid", "!=", user.uid)
  );

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanlla", label: "Vanilla" },
    { value: "vailla", label: "Vanilla" },
    { value: "vanill", label: "Vanilla" },
    { value: "vanlla", label: "Vanilla" },
    { value: "vana", label: "Vanilla" },
    { value: "illa", label: "Vanilla" },
    { value: "anilla", label: "Vanilla" },
    { value: "vnilla", label: "Vanilla" },
  ];

  //   useEffect(() => {
  //     getOptions();
  //   }, [optionsSnapshot]);

  //   const getOptions = () => {
  //     optionsSnapshot?.docs.map((data) => {
  //       setOptions((prev) => [
  //         ...prev,
  //         {
  //           value: data.data().uid,
  //           label: data.data().displayName,
  //         },
  //       ]);
  //     });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
    <div className="flex flex-col justify-center items-center bg-neutral-900 p-4 rounded-xl">
      <h1 className="font-bold text-2xl sub-head">Create Group</h1>
      <div className="flex mt-5">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center justify-center">
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 w-72 rounded-xl p-2 font-semibold outline-none bg-neutral-800"
              type="text"
              maxLength={40}
              placeholder="Enter Title"
              required
              value={title}
            ></input>
          </div>
          {/* select members */}
          <Select
            onChange={(item) => setSelectedGroupMembers(item)}
            className="select"
            styles={colorStyles}
            value={selectedGroupMembers}
            options={options}
            isMulti={true}
          />
          <button className="font-semibold w-full bg-sky-500 p-2 rounded-xl hover:bg-sky-400 active:bg-sky-600">
            Add Group
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;
