import React, { useEffect, useRef, useState, useCallback } from "react";
import { Stage, Layer, Shape, Image, Transformer } from "react-konva";
import Sidebar from "../components/Sidebar";
import floor from "../assets/floor1.png";
import wall from "../assets/wall1.png";
import products from "../components/assets"; // an array of images

function Room({
  sidebarWidth = 200,
  floor1 = floor,
  wall1 = wall,
  src = products,
}) {
  const cornerOptions = [
    { label: "Whole Room", value: "whole" },
    { label: "Left Corner", value: "left" },
    { label: "Right Corner", value: "right" },
  ];
  const [setImage] = useState(null);
  const [cornerPosition, setCornerPosition] = useState("whole");
  const [isSelected, setIsSelected] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - sidebarWidth,
    height: window.innerHeight,
  });
  const [floorTexture, setFloorTexture] = useState(null);
  const [wallTexture, setWallTexture] = useState(null);
  const [floorSrc] = useState(floor1);
  const [wallSrc] = useState(wall1);
  const [objects, setObjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedObjId, setSelectedObjId] = useState(null);
  const transformerRef = useRef(null);
  const imageRefs = useRef({});

  const stageRef = useRef(null);
  /* Handling the size of canvas */
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

  /* Handling the floor and wall images */
  useEffect(() => {
    const floorImg = new window.Image();
    floorImg.crossOrigin = "anonymous";
    floorImg.src = floorSrc;
    floorImg.onload = () => setFloorTexture(floorImg);
    floorImg.onerror = () => console.error("Failed to load floor texture");

    const wallImg = new window.Image();
    wallImg.crossOrigin = "anonymous";
    wallImg.src = wallSrc;
    wallImg.onload = () => setWallTexture(wallImg);
    wallImg.onerror = () => console.error("Failed to load wall texture");
    return () => {
      floorImg.onload = null;
      wallImg.onload = null;
    };
  }, [floorSrc, wallSrc]);

  /* Handling the product images */
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => setImage(img);
  }, [src]);

  const handleAddObject = (imgObj) => {
    const { src } = imgObj;
    if (!src) {
      console.error("Image source is undefined or null.");
      return;
    }

    console.log("Adding object with image source:", src);

    const img = new window.Image();
    img.src = src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      setObjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          image: img,
          x: Math.random() * 500,
          y: Math.random() * 500,
          width: 100,
          height: 100,
        },
      ]);
      console.log("Image loaded successfully.");
    };

    img.onerror = (err) => {
      console.error("Failed to load image:", err);
    };
  };

  //Delete assets
  const handleDelete = useCallback(() => {
    if (selectedObjId !== null) {
      setObjects((prev) => prev.filter((obj) => obj.id !== selectedObjId));
      setSelectedObjId(null);
      console.log("Deleted object with ID:", selectedObjId);
    }
  }, [selectedObjId]);

  // Listen for the "Delete" or "Backspace" key to remove an object
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        selectedObjId !== null
      ) {
        handleDelete();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedObjId, handleDelete]);

  useEffect(() => {
    if (selectedId && transformerRef.current && imageRefs.current[selectedId]) {
      transformerRef.current.nodes([imageRefs.current[selectedId]]);
      transformerRef.current.getLayer()?.batchDraw();
    } else {
      console.warn("Transformer or ImageRef is null");
    }
  }, [selectedId, objects]);

  /* Handling Local Storgae */

  return (
    <div className="bg-gradient-to-b from-[#FDF8F4] to-[#E8DED5] h-full">
      <Sidebar
        onAddObject={handleAddObject}
        onChangeWallTexture={setWallTexture}
        onChangeFloorTexture={setFloorTexture}
      />
      <div className="gap-2 flex flex-wrap px-0 py-3">
        <h1 className="text-[#2c2c2c] text-base font-bold py-2 px-2">
          Select Room Corner:
        </h1>
        {cornerOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setCornerPosition(option.value)}
            className="relative py-2 px-6 cursor-pointer text-[#2c2c2c] text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-[#2c2c2c] hover:shadow-lg active:scale-90"
          >
            {option.label}
          </button>
        ))}
        <br />
        <button className="relative py-2 px-6 cursor-pointer text-[#2c2c2c] text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-[#2c2c2c] hover:shadow-lg active:scale-90">
          Save
        </button>
        <button className="relative py-2 px-6 cursor-pointer text-[#2c2c2c] text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-[#2c2c2c] hover:shadow-lg active:scale-90">
          Reset
        </button>
        <button className="relative py-2 px-6 cursor-pointer text-[#2c2c2c] text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-[#2c2c2c] hover:shadow-lg active:scale-90">
          Export
        </button>
      </div>
      <br />
      <Stage
        width={dimensions.width - 85}
        height={dimensions.height - 90}
        ref={stageRef}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            setIsSelected(false);
          }
        }}
      >
        <Layer>
          {/*Center Wall*/}
          <Shape
            sceneFunc={(ctx, shape) => {
              ctx.beginPath();
              ctx.moveTo(dimensions.width * 0.01, dimensions.height * 0.015);
              ctx.lineTo(dimensions.width - 90, dimensions.height * 0.015);
              ctx.lineTo(dimensions.width - 90, dimensions.height * 0.65);
              ctx.lineTo(dimensions.width * 0.01, dimensions.height * 0.65);
              ctx.closePath();
              ctx.fillStrokeShape(shape);
            }}
            fillPatternImage={wallTexture}
            stroke="black"
            strokeWidth={2}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setIsSelected(false);
              }
            }}
          />

          {/* Right Wall */}
          {cornerPosition === "right" && (
            <>
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(dimensions.width - 90, dimensions.height - 90); // Bottom-right corner
                  ctx.lineTo(dimensions.width - 300, dimensions.height - 250); // Connect to floor
                  ctx.lineTo(dimensions.width - 300, dimensions.height * 0.015); // Top left of the right wall
                  ctx.lineTo(dimensions.width - 90, dimensions.height * 0.015); // Top-right corner
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillPatternImage={wallTexture}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
              />
              {/* Floor */}
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(12.5, dimensions.height - 250); // Left-floor corner
                  ctx.lineTo(dimensions.width - 300, dimensions.height - 250); // Right-floor corner
                  ctx.lineTo(dimensions.width - 90, dimensions.height - 90); // Bottom-right of the room
                  ctx.lineTo(12.5, dimensions.height - 100); // Bottom-left of the room
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillPatternImage={floorTexture}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
              />
            </>
          )}
          {/* Whole Room */}
          {cornerPosition === "whole" && (
            <>
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(dimensions.width - 90, dimensions.height - 90); // Bottom-right corner
                  ctx.lineTo(dimensions.width - 300, dimensions.height - 250); // Connect to floor
                  ctx.lineTo(dimensions.width - 300, dimensions.height * 0.015); // Top left of the right wall
                  ctx.lineTo(dimensions.width - 90, dimensions.height * 0.015); // Top-right corner
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillPatternImage={wallTexture}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
              />
              {/* Floor */}
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(200, dimensions.height - 250); // Left-floor corner
                  ctx.lineTo(dimensions.width - 300, dimensions.height - 250); // Right-floor corner
                  ctx.lineTo(dimensions.width - 90, dimensions.height - 90); // Bottom-right of the room
                  ctx.lineTo(10, dimensions.height - 90); // Bottom-left of the room
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillPatternImage={floorTexture}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
              />
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(10, dimensions.height - 90);
                  ctx.lineTo(200, dimensions.height - 250);
                  ctx.lineTo(200, dimensions.height * 0.015);
                  ctx.lineTo(10, dimensions.height * 0.015);
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillPatternImage={wallTexture}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
              />
            </>
          )}

          {/* Left Wall */}
          {cornerPosition === "left" && (
            <>
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(10, dimensions.height - 90);
                  ctx.lineTo(200, dimensions.height - 250);
                  ctx.lineTo(200, dimensions.height * 0.015);
                  ctx.lineTo(10, dimensions.height * 0.015);
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillPatternImage={wallTexture}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
              />
              {/* Floor */}
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(200, dimensions.height - 250);
                  ctx.lineTo(dimensions.width - 90, dimensions.height - 250);
                  ctx.lineTo(dimensions.width - 90, dimensions.height - 90);
                  ctx.lineTo(10, dimensions.height - 90);
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillPatternImage={floorTexture}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
              />
            </>
          )}

          {objects.map((obj) => (
            <Image
              key={obj.id}
              ref={(node) => (imageRefs.current[obj.id] = node)}
              image={obj.image}
              x={obj.x}
              y={obj.y}
              width={obj.width}
              height={obj.height}
              draggable
              onClick={() => {
                setSelectedId(obj.id);
                setIsSelected(true);
              }}
              onContextMenu={(e) => {
                e.evt.preventDefault();
                setSelectedObjId(obj.id);
                handleDelete();
              }}
              onTap={() => {
                setSelectedId(obj.id);
                setIsSelected(true);
              }}
              onDragEnd={(e) => {
                setObjects((prev) =>
                  prev.map((item) =>
                    item.id === obj.id
                      ? { ...item, x: e.target.x(), y: e.target.y() }
                      : item
                  )
                );
              }}
              onTransformEnd={() => {
                const node = imageRefs.current[obj.id];
                if (node) {
                  setObjects((prev) =>
                    prev.map((item) =>
                      item.id === obj.id
                        ? {
                            ...item,
                            x: node.x(),
                            y: node.y(),
                            width: node.width(),
                            height: node.height(),
                          }
                        : item
                    )
                  );
                  console.log("New Size:", node.width(), node.height());
                }
              }}
            />
          ))}

          {/* Transformer */}
          {selectedId && isSelected && <Transformer ref={transformerRef} />}
        </Layer>
      </Stage>
    </div>
  );
}

export default Room;
