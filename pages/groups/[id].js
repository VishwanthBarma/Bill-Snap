import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import DashBoard from "../../components/Group/DashBoard/DashBoard";
import Members from "../../components/Group/Members/Members";
import NavigationBar from "../../components/Group/NavigationBar";
import Payments from "../../components/Group/Payments/Payments";
import SubLoading from "../../components/Loading/SubLoading";
import { BillSnapContext } from "../../context/BillSnapContext";
import { db } from "../../firebase";

function Group({ groupID }) {
  const {
    group,
    getCurrentGroupDetails,
    getUserCurrentGroupDetails,
    userCurrentGroupDetails,
    setAppStatus,
  } = useContext(BillSnapContext);
  const [selectedNav, setSelectedNav] = useState("dashboard");
  const router = useRouter();

  useEffect(() => {
    getCurrentGroupDetails(groupID);
    getUserCurrentGroupDetails(groupID);
  }, [groupID]);

  const handleNavChange = (nav) => {
    setSelectedNav(nav);
  };

  const app = (status) => {
    switch (status) {
      case "payments":
        return <Payments groupID={groupID} />;
      case "members":
        return <Members />;
      default:
        return <DashBoard groupID={groupID} />;
    }
  };

  return (
    <>
      {group ? (
        <div className="mt-5 flex flex-col space-y-5 divide-y-2 divide-sky-500">
          <div className="flex flex-col items-start">
            <button
              onClick={() => router.push("/")}
              className="text-sky-500 mb-2"
            >
              Back
            </button>
            <h1 className="text-2xl font-bold sub-head">{group?.title}</h1>
            <h1 className="text-slate-300">
              <span className="font-semibold">{group?.groupLength}</span>{" "}
              members
            </h1>
          </div>
          <div className="flex pt-5 space-x-3 divide-x-2 divide-neutral-700">
            <NavigationBar changeNav={handleNavChange} nav={selectedNav} />
            <div className="pl-3 w-full">{app(selectedNav)}</div>
          </div>
        </div>
      ) : (
        <SubLoading />
      )}
    </>
  );
}

export default Group;

export async function getServerSideProps({ params }) {
  const groupID = params.id;
  return { props: { groupID } };
}
