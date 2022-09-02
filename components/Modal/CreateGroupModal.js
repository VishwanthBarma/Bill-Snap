import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { BillSnapContext } from "../../context/BillSnapContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Multiselect from "multiselect-react-dropdown";

function CreateGroupModal() {
  const { user } = useContext(BillSnapContext);
  const [title, setTitle] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [options, setOptions] = useState([]);

  const [optionsSnapshot, loading] = useCollection(
    db.collection("users").where("email", "!=", user.email)
  );

  useEffect(() => {
    getOptions();
  }, [optionsSnapshot]);

  const getOptions = () => {
    optionsSnapshot?.docs.map((data) => {
      setOptions((prev) => [...prev, data.data()]);
    });
  };

  const handleSubmit = (e) => {
    db.collection("groups")
      .add({
        title: title,
        groupLength: selectedGroupMembers.length + 1,
        totalRevenue: 0,
        members: [
          {
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            moneyToGet: 0,
            moneyToGive: 0,
            takeFrom: [],
            giveTo: [],
          },
          ...selectedGroupMembers,
        ],
        payments: [],
      })
      .then((doc) => {
        console.log("Document written with ID : ", doc.id);
      });

    setTitle("");
    setSelectedGroupMembers([]);
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
    <div className="flex flex-col justify-center items-center bg-neutral-900 p-10 rounded-xl">
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
          <Multiselect
            style={multiSelectStyles}
            options={options}
            displayValue="displayName"
            onSelect={(item) => setSelectedGroupMembers(item)}
          />

          {submitLoading ? (
            <h1>Loading</h1>
          ) : (
            <button className="font-semibold w-full bg-sky-500 p-2 rounded-xl hover:bg-sky-400 active:bg-sky-600">
              Add Group
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;

// members: [
//     {
//       email: user.email,
//       displayName: user.displayName,
//       uid: user.uid,
//       photoURL: user.photoURL,
//       moneyToGet: 0,
//       moneyToGive: 0,
//       takeFrom: [],
//       giveTo: [],
//     },
//     ...selectedGroupMembers,
//   ],
