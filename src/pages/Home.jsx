import React from "react";
import img1 from "../assets/home1.webp";
import img2 from "../assets/home2.webp";
import img3 from "../assets/home3.webp";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-[#FDF8F4] to-[#E8DED5] min-h-screen grid grid-rows-[auto_1fr_auto] gap-10 md:gap-20 px-4 md:px-10">
      {/* Navbar - Fixed at the top */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#F6EEE9] to-[#DED3C7] py-4 shadow-md z-50">
        <h1 className="text-[#222] font-bold font-sans text-xl md:text-4xl text-start p-2">
          RoomVista
        </h1>
      </nav>

      {/* Main Content */}
      <div className="grid place-items-center text-center mt-24 gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center">
          {/* Text Section */}
          <div className="text-[#222] max-w-full md:max-w-2xl md:text-start">
            <h1 className="text-[#222] font-bold font-serif text-2xl md:text-3xl mb-4">
              Design Your Room with RoomVista
            </h1>
            <p className="text-[#444] font-sans text-lg md:text-xl mb-6">
              RoomVista is a simple tool to help you design your room. You can
              choose from a variety of furniture and decor items to create your
              dream room.
            </p>

            {/* Image Grid for Small Screens (Stacked) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {[img1, img2].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Home Design ${index + 1}`}
                  className="h-auto w-full rounded-lg shadow-lg bg-gradient-to-b from-[#FDF8F4] to-[#E8DED5]"
                  loading="lazy"
                />
              ))}
            </div>

            <button
              className="bg-gradient-to-r from-[#B58E72] to-[#8D6E5C] hover:from-[#8D6E5C] hover:to-[#6D4C41] text-white px-6 py-3 rounded w-fit font-serif mt-4 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => {
                navigate("/editor");
              }}
            >
              Get Started
            </button>
          </div>

          {/* Bento Grid for Medium and Larger Screens */}
          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-span-1 row-span-2">
              <img
                src={img1}
                alt="Home Design 1"
                className="h-full w-full object-cover rounded-lg shadow-lg lazy-loading"
                loading="lazy"
              />
            </div>
            <img
              src={img2}
              alt="Home Design 2"
              className="h-auto w-full rounded-lg shadow-lg lazy-loading"
              loading="lazy"
            />
            <img
              src={img3}
              alt="Home Design 3"
              className="h-auto w-full rounded-lg shadow-lg lazy-loading"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
