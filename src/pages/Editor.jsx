import React from "react";
import Navbar from "../components/Navbar";
import Room from "../canvas/Room";
import { useNavigate } from "react-router-dom";

function Editor() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F6EEE9] to-[#DED3C7]">
      <button onClick={()=> navigate("/")} className="text-[#2c2c2c] font-bold font-sans text-xl md:text-4xl text-start pl-3 pt-1 pb-3 absolute z-50">
        RoomVista
      </button>
      <Navbar />
      <hr className="border-transparent" />
      <Room />
    </div>
  );
}

export default Editor;
