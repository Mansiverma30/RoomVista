import React from "react";
import Room from "../canvas/Room";
import { useNavigate } from "react-router-dom";

function Editor() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F6EEE9] to-[#DED3C7]">
      <button
        onClick={() => navigate("/")}
        className="text-[#2c2c2c] font-bold font-sans text-3xl md:text-4xl text-start pl-3 pt-1 pb-3 relative top-0 z-50 md:flex md:justify-start md:items-end w-full p-4 bg-gradient-to-r from-[#F6EEE9] to-[#DED3C7] shadow-md rounded-b-lg"
      >
        RoomVista
      </button>
      <hr className="border-transparent" />
      <Room />
    </div>
  );
}

export default Editor;
