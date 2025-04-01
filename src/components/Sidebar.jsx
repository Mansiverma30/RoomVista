import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import products from "./assets";
function Sidebar({ onAddObject, onChangeFloorTexture, onChangeWallTexture }) {
  const [openMenus, setOpenMenus] = useState({});

  // Toggle the state of a specific menu
  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="absolute right-0 h-full w-64 border-solid  bg-gradient-to-b from-[#FDF8F4] to-[#E8DED5] text-[#2c2c2c] overflow-y-auto overflow-x-hidden">
      <h1 className="px-4 py-4 text-2xl font-semibold text-[#2c2c2c]">
        Products
      </h1>
      {products.map((p, index) => (
        <div key={index}>
          <button
            className="flex relative w-full items-center justify-between px-4 py-4 text-xl font-semibold text-[#2c2c2c] hover:bg-gray-200"
            onClick={() => toggleMenu(index)}
          >
            {p.prod}
            <ChevronDownIcon
              aria-hidden="true"
              className={`-mr-1 size-5 text-gray-400 transition-transform ${
                openMenus[index] ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {openMenus[index] && (
            <div className="mt-2 px-4 py-4 rounded-md">
              <ul className="py-1">
                {p.prodOpt.map((img, imgIndex) => (
                  <li key={imgIndex} className="mb-2">
                    <img
                      src={img}
                      alt={`Image ${imgIndex + 1}`}
                      className="w-[200px] h-[200px] rounded-lg shadow-md cursor-pointer"
                      onClick={() => {
                        const newImg = new window.Image();
                        newImg.src = img;
                        newImg.crossOrigin = "anonymous";
                        newImg.onload = () => {
                          if (p.prod === "Wall") {
                            onChangeWallTexture(newImg);
                          } else if (p.prod === "Floor") {
                            onChangeFloorTexture(newImg);
                          } else {
                            onAddObject({
                              src: img,
                              width: 100,
                              height: 100,
                              x: 50,
                              y: 50,
                            });
                          }
                        };
                        newImg.onerror = (e) =>
                          console.error("Error loading image:", e);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
