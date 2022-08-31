import React, { useContext, useEffect, useState } from "react";
import DashBoard from "../../components/Group/DashBoard/DashBoard";
import Members from "../../components/Group/Members/Members";
import NavigationBar from "../../components/Group/NavigationBar";
import Payments from "../../components/Group/Payments";
import { BillSnapContext } from "../../context/BillSnapContext";

function Group({ group }) {
  const { setGroup } = useContext(BillSnapContext);
  const [selectedNav, setSelectedNav] = useState("dashboard");

  useEffect(() => {
    setGroup(group);
  }, []);

  const handleNavChange = (nav) => {
    setSelectedNav(nav);
  };

  const app = (status) => {
    switch (status) {
      case "payments":
        return <Payments />;
      case "members":
        return <Members />;
      default:
        return <DashBoard />;
    }
  };

  return (
    <div className="mt-5 flex flex-col space-y-5 divide-y-2 divide-sky-500">
      <div className="flex space-y-1 flex-col">
        <h1 className="text-2xl font-bold sub-head">Group Name</h1>
        <h1 className="text-slate-300">
          <span className="font-semibold">10</span> members
        </h1>
      </div>
      <div className="flex pt-5 space-x-3 divide-x-2 divide-neutral-700">
        <NavigationBar changeNav={handleNavChange} nav={selectedNav} />
        <div className="pl-3 w-full">{app(selectedNav)}</div>
      </div>
    </div>
  );
}

export default Group;

export async function getServerSideProps({ params }) {
  const group = params.id;
  return { props: { group } };
}
