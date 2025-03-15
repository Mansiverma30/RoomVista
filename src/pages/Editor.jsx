import React from "react";
import Navbar from "../components/Navbar";

function Editor() {
  return (
    <div className=" gap-10 md:gap-20 px-0 md:px-0">
      <h1 className="text-[#2C2C2C] font-bold font-sans text-xl md:text-4xl text-start pl-3 pt-1  pb-3 absolute z-50">
        RoomVista
      </h1>
      <Navbar/>
      <hr />
    </div>
  );
}

export default Editor;
