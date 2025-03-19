import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Line, Image, Transformer } from "react-konva";
import Sidebar from "../components/Sidebar";
import sofa1 from "../assets/sofa1.png";
import floor1 from "../assets/floor1.png"

function Room({ sidebarWidth = 300, src = sofa1, image1 = floor1 }) {
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const transformerRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - sidebarWidth,
    height: window.innerHeight,
  });
  const [pattern, setPattern] = useState(null);

  useEffect(() => {
    const img1 = new window.Image();
    img1.src = image1;
    img1.onload = () => setPattern(img1);
    console.log("Ho raha hai render")
  }, [image1]);

  const cornerOptions = [
    { label: "Left Corner", value: "left" },
    { label: "Right Corner", value: "right" },
    { label: "No Corner", value: null },
  ];
  const [cornerPosition, setCornerPosition] = useState("right");

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth - sidebarWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarWidth]);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.crossOrigin = "anonymous"; // To avoid CORS issues
    img.onload = () => setImage(img);
  }, [src]);

  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <div className="bg-gradient-to-b from-[#FDF8F4] to-[#E8DED5] h-full">
      <Sidebar />
      {/* Buttons to switch corners */}
      <div className="gap-2 flex flex-wrap px-3 py-3">
        <h1 className="text-[#2c2c2c] text-base font-bold py-2 px-2">
          Select Room Corner:
        </h1>
        {cornerOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setCornerPosition(option.value)}
            className="relative py-2 px-6 text-[#2c2c2c] text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-[#2c2c2c] hover:shadow-lg active:scale-90"
          >
            {option.label}
          </button>
        ))}
      </div>
      <br />

      {/* Canvas */}
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={(e) => {
          // Deselect when clicking outside
          if (e.target === e.target.getStage()) {
            setIsSelected(false);
          }
        }}
      >
        <Layer>
          {/* Room Rectangle */}
          <Rect
            x={10}
            y={10}
            width={dimensions.width - 100}
            height={dimensions.height - 100}
            fill="#f8ffff"
            stroke="black"
            
          />

          {/* Right Corner Perspective Lines */}
          {cornerPosition === "right" && (
            <>
              <Line
                points={[
                  10,
                  dimensions.height - 250,
                  dimensions.width - 300,
                  dimensions.height - 250,
                ]}
                fillPatternImage={pattern}
                stroke="black"
                strokeWidth={2}
              />
              <Line
                points={[
                  dimensions.width - 90,
                  dimensions.height - 90,
                  dimensions.width - 300,
                  dimensions.height - 250,
                ]}
                fillPatternImage={pattern}
                stroke="black"
                strokeWidth={2}
              />
              <Line
                points={[
                  dimensions.width - 300,
                  dimensions.height * 0.015,
                  dimensions.width - 300,
                  dimensions.height - 250,
                ]}
                stroke="black"
                strokeWidth={2}
                fillPatternImage={pattern}
              />
            </>
          )}

          {/* Left Corner Perspective Lines */}
          {cornerPosition === "left" && (
            <>
              <Line
                points={[
                  200,
                  dimensions.height - 250,
                  dimensions.width - 90,
                  dimensions.height - 250,
                ]}
                stroke="black"
                strokeWidth={2}
              />
              <Line
                points={[10, dimensions.height - 90, 200, dimensions.height - 250]}
                stroke="black"
                strokeWidth={2}
                fillPatternImage={pattern}
              />
              <Line
                points={[200, dimensions.height * 0.015, 200, dimensions.height - 250]}
                stroke="black"
                strokeWidth={2}
                
              />
            </>
          )}

          {/* Image (Floor) */}
          {image && (
            <Image
              image={image}
              ref={imageRef}
              draggable
              x={100}
              y={100}
              width={200}
              height={200}
              onClick={() => setIsSelected(true)}
              onTap={() => setIsSelected(true)}
              onTransformEnd={() => {
                const node = imageRef.current;
                console.log("New Size:", node.width(), node.height());
              }}
            />
          )}
          {isSelected && <Transformer ref={transformerRef} />}
        </Layer>
      </Stage>
    </div>
  );
}

export default Room;
