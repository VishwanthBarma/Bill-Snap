import React, { useState } from "react";
import DashBoard from "../../components/Group/DashBoard";
import NavigationBar from "../../components/Group/NavigationBar";
import Profile from "../../components/Group/Profile";

function Group({ group }) {
  const [selectedNav, setSelectedNav] = useState("dashboard");
  const handleNavChange = (nav) => {
    setSelectedNav(nav);
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
        <NavigationBar changeNav={handleNavChange} />
        <div className="pl-3">
          {selectedNav == "dashboard" ? <DashBoard /> : <Profile />}
        </div>
      </div>
    </div>
  );
}

export default Group;

export async function getServerSideProps({ params }) {
  const group = params.id;
  return { props: { group } };
}
