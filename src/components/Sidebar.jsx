import React from "react";
import Example from "./Example";

function Sidebar() {
  return (
    <div className="absolute right-0 h-full w-64 border-solid border-t-black border-l-black border-r-black border-t border-r border-l bg-gradient-to-b from-[#FDF8F4] to-[#E8DED5] text-[#2c2c2c]">
      <h2 className="text-xl font-bold p-4">Sidebar</h2>
      <ul className="p-4">
        <li className="py-2">Home</li>
        <li className="py-2">About</li>
        <li className="py-2">Services</li>
        <li className="py-2">Contact</li>
      </ul>
    </div>
  );
}

export default Sidebar;
