import React, { useEffect, useRef, useState } from "react";

function UserManual() {
  const [showManual, setShowManual] = useState(false);
  const manualRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (manualRef.current && !manualRef.current.conatins(event.target)) {
        setShowManual(false);
      }
      if (showManual) {
        document.addEventListener("mousedown", handleClickOutside);
      }
    };
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showManual]);

  return (
    <div>
      <button
        onClick={() => setShowManual(!showManual)}
        className="relative py-2 px-6 cursor-pointer text-[#2c2c2c] text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-[#2c2c2c] hover:shadow-lg active:scale-90"
      >
        User Manual
      </button>

      {showManual && (
        <div className="absolute z-50 bg-[#FDF8F4] my-2 p-4 rounded-xl shadow-xl w-96 text-sm text-[#2c2c2c]">
          <ol className="list-decimal ml-5 space-y-1 text-[#2c2c2c]">
            <li>
              You have the option to select different corners of the room. You
              can choose from:
              <ul>
                <li>Right Corner</li>
                <li>Left Corner</li>
                <li>Whole Room</li>
              </ul>
            </li>
            <li>
              In the Product section, you can select various items, including:
              <ul>
                <li>Bed</li>
                <li>Sofa</li>
                <li>Decor</li>
                <li>Floors</li>
                <li>Walls</li>
              </ul>
            </li>
            <li>
              When you click on a product, it will appear in your room. You can
              adjust its position and size by clicking and dragging it.
            </li>
            <li>
              To delete a product, you can:
              <ul>
                <li>Double right-click on the product</li>
                <li>Right-click and press the Delete or Backspace key</li>
              </ul>
            </li>
            <li>Click on the Save button to save your progress.</li>
            <li>
              Click on the Reset button to remove all changes and start fresh.
            </li>
            <li>
              Click on the Export button to download your design as a PNG image.
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}

export default UserManual;
