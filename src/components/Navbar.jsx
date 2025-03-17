import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect, useRef } from "react";

const menuItems = [
  { title: "Save/Reset", options: ["Save", "Reset", "Export", "Import"] },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle Mobile Menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <div className="md:flex md:justify-end md:items-end p-4 relative bg-gradient-to-r from-[#F6EEE9] to-[#DED3C7] shadow-md rounded-b-lg">
      
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {menuItems.map((menu, index) => (
          <Menu key={index} as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 hover:bg-gray-50">
              {menu.title}
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
            </MenuButton>
            <MenuItems className="mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5">
              <div className="py-1">
                {menu.options.map((option, i) => (
                  <MenuItem
                    key={i}
                    as="button"
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {option}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden text-2xl items-end flex justify-end absolute top-1 right-2 text-white">
        ☰
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div ref={menuRef} className="fixed inset-0 bg-gradient-to-b from-[#C1A788] to-[#8D7B68] text-white p-4 md:hidden z-50 flex flex-col items-end space-y-6 transition-all duration-300 ease-in-out">
          <button onClick={toggleMenu} className="text-2xl absolute top-4 right-4">✕</button>
          <nav className="mt-12 flex flex-col space-y-4 w-full items-center">
            {menuItems.map((menu, index) => (
              <Menu key={index} as="div" className="relative inline-block text-center">
                <MenuButton className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 hover:bg-gray-50">
                  {menu.title}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
                <MenuItems className="absolute z-10 mt-2 w-40 origin-top rounded-md bg-white ring-1 shadow-lg ring-black/5">
                  <div className="py-1">
                    {menu.options.map((option, i) => (
                      <MenuItem key={i}>
                        {({ active }) => (
                          <button className={`block w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100" : "text-gray-700"}`}>{option}</button>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;
