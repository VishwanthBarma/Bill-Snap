import React from "react";

function MemberCard() {
  return (
    <div className="flex space-x-2 items-center bg-neutral-800 p-2 rounded-xl m-3">
      <img
        className="h-14 w-14 cover rounded-full"
        src="https://burst.shopifycdn.com/photos/fog-on-dark-waters-edge.jpg?width=1200&format=pjpg&exif=1&iptc=1"
      ></img>
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg sub-head2">Gone Uttam Netha</h1>
        <h1 className="text-neutral-400">goneuttamnetha@gmail.com</h1>
      </div>
    </div>
  );
}

export default MemberCard;
