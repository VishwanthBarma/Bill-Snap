import { Router, useRouter } from "next/router";
import React, { useContext } from "react";
import { HiViewGridAdd } from "react-icons/hi";
import ReactModal from "react-modal";
import { BillSnapContext } from "../../context/BillSnapContext";
import CreateGroupModal from "../Modal/CreateGroupModal";
function CreateCard() {
  const router = useRouter();
  const { user } = useContext(BillSnapContext);
  return (
    <div className="m-3">
      <button
        onClick={() =>
          router.push(`${router.pathname}/?creategroup=${user?.uid}`)
        }
        className="active:opacity-50 hover:scale-105 transition ease-linear shadow-lg shadow-neutral-800 rounded-xl"
      >
        <div className="h-48 w-48 bg-black rounded-xl space-y-1 flex flex-col items-center justify-center group">
          <HiViewGridAdd className="h-10 w-10 text-zinc-700 group-hover:text-zinc-300" />
          <h1 className="font-semibold text-zinc-700 group-hover:text-zinc-300">
            Create Group
          </h1>
        </div>
      </button>
      <ReactModal
        isOpen={Boolean(router.query.creategroup)}
        onRequestClose={() => router.back()}
        style={{
          content: {
            top: "50%",
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
        <CreateGroupModal />
      </ReactModal>
    </div>
  );
}

export default CreateCard;
