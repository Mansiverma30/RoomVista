import React, { useEffect, useRef, useState, useCallback } from "react";
import { Stage, Layer, Shape, Image, Transformer } from "react-konva";
import Sidebar from "../components/Sidebar";
import floor from "../assets/floor1.png";
import wall from "../assets/wall1.png";
import products from "../components/assets"; // an array of images
import UserManual from "../components/UserManual";

function Room({ sidebarWidth = 200, src = products }) {
  // Options for selecting the corner of the room
  const cornerOptions = [
    { label: "Whole Room", value: "whole" },
    { label: "Left Corner", value: "left" },
    { label: "Right Corner", value: "right" },
  ];

  // State for various functionalities
  const [image, setImage] = useState([]); // Stores product image
  const [cornerPosition, setCornerPosition] = useState("whole"); // Stores the selected corner position
  const [isSelected, setIsSelected] = useState(false); // Tracks if an object is selected

  // Stores the dimensions of the canvas
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - sidebarWidth,
    height: window.innerHeight,
  });

  // Stores the floor and wall textures
  const [floorTexture, setFloorTexture] = useState(null);
  const [wallTexture, setWallTexture] = useState(null);

  // Image sources for the floor and wall
  const [floorSrc, setFloorSrc] = useState(null);
  const [wallSrc, setWallSrc] = useState(null);

  // Stores the objects (furniture, decorations, etc.) added to the canvas
  const [objects, setObjects] = useState([]);

  // Tracks the selected object ID
  const [selectedId, setSelectedId] = useState(null);
  const [selectedObjId, setSelectedObjId] = useState(null);

  // Refs for transformer and image elements
  const transformerRef = useRef(null);
  const imageRefs = useRef({});

  // Ref for the stage (entire canvas)
  const stageRef = useRef(null);

  /* Handling the size of the canvas - Resizes when the window size changes */
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

  /* Loading product images */
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => setImage(img);
  }, [src]);

  /* Function to add an image object to the canvas */
  const handleAddObject = (imgObj) => {
    const { src } = imgObj;
    if (!src) {
      console.error("image source is undefined or null.");
      return;
    }

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
          width: img.naturalWidth / 6,
          height: img.naturalHeight / 4,
        },
      ]);
    };

    img.onerror = (err) => {
      console.error("Failed to load image:", err);
    };
  };

  /* Function to delete a selected object */
  const handleDelete = useCallback(() => {
    if (selectedObjId !== null) {
      setObjects((prev) => prev.filter((obj) => obj.id !== selectedObjId));
      setSelectedObjId(null);
      console.log("Deleted object with ID:", selectedObjId);
    }
  }, [selectedObjId]);

  /* Listen for the "Delete" or "Backspace" key to remove an object */
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

  /* Updates the transformer when an object is selected */
  useEffect(() => {
    if (selectedId && transformerRef.current && imageRefs.current[selectedId]) {
      transformerRef.current.nodes([imageRefs.current[selectedId]]);
      transformerRef.current.getLayer()?.batchDraw();
    } else {
      console.warn("Transformer or ImageRef is null");
    }
  }, [selectedId, objects]);

  /* Loading the floor and wall images and setting them as textures */
  useEffect(() => {
    const floorImg = new window.Image();
    const wallImg = new window.Image();

    floorImg.crossOrigin = "anonymous";
    wallImg.crossOrigin = "anonymous";

    floorImg.src = floorSrc || floor;
    wallImg.src = wallSrc || wall;

    const handleFloorLoad = () => setFloorTexture(floorImg);
    const handleWallLoad = () => setWallTexture(wallImg);

    const handleError = (type) => () =>
      console.error(`Failed to load ${type} texture`);

    floorImg.onload = handleFloorLoad;
    floorImg.onerror = handleError("floor");

    wallImg.onload = handleWallLoad;
    wallImg.onerror = handleError("wall");

    return () => {
      floorImg.onload = floor;
      floorImg.onerror = floor;
      wallImg.onload = wall;
      wallImg.onerror = wall;
    };
  }, [floorSrc, wallSrc]);

  // LOAD DESIGN (No need to reload textures manually here)
  useEffect(() => {
    const saved = localStorage.getItem("roomVistaDesign");
    if (!saved) return;

    const {
      cornerPosition,
      wallSrc,
      floorSrc,
      objects = [],
    } = JSON.parse(saved); // fallback to empty array

    setCornerPosition(cornerPosition || "whole");
    setWallSrc(wallSrc || wall);
    setFloorSrc(floorSrc || floor);

    if (Array.isArray(objects) && objects.length > 0) {
      const loadedObjects = objects.map((obj) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = obj.image.src;
        return new Promise((resolve) => {
          img.onload = () => {
            resolve({
              ...obj,
              image: img,
            });
          };
          img.onerror = () => resolve(null);
        });
      });

      Promise.all(loadedObjects).then((results) => {
        const filtered = results.filter(Boolean);
        setObjects(filtered); // these already include correct x, y, width, height
      });
    }
  }, []);

  // SAVE
  const handleSave = () => {
    const designToSave = {
      cornerPosition,
      wallSrc,
      floorSrc,
      objects: objects.map((obj) => ({
        id: obj.id,
        x: obj.x,
        y: obj.y,
        width: obj.width,
        height: obj.height,
        image: { src: obj.image.src },
      })),
    };

    localStorage.setItem("roomVistaDesign", JSON.stringify(designToSave));
    alert("Design saved successfully!");
  };

  // RESET
  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your design?"
    );
    if (!confirmReset) return;

    localStorage.removeItem("roomVistaDesign");
    setObjects([]);
    setCornerPosition("whole");
    setWallSrc(wall);
    setFloorSrc(floor);
    alert("Design has been reset.");
  };

  //Export design
  const handleExport = () => {
    if (!stageRef.current) return;

    const uri = stageRef.current.toDataURL({ pixelRatio: 2 }); // pixelRatio=2 gives better quality
    const link = document.createElement("a");
    link.download = "roomVista_design.png";
    link.href = uri;
    link.click();
  };

  return (
    <div className="bg-gradient-to-b from-[#FDF8F4] to-[#E8DED5] h-full">
      <Sidebar
        onAddObject={handleAddObject}
        onChangeFloorTexture={setFloorTexture}
        onChangeWallTexture={setWallTexture}
        setSelectedFloorSrc={setFloorSrc}
        setSelectedWallSrc={setWallSrc}
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
        <button
          className="relative py-2 px-6 cursor-pointer text-[#2c2c2c] text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-[#2c2c2c] hover:shadow-lg active:scale-90"
          onClick={handleSave} // Save the design
        >
          Save
        </button>
        <button
          className="relative py-2 px-6 cursor-pointer text-[#2c2c2c] text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-[#2c2c2c] hover:shadow-lg active:scale-90"
          onClick={handleReset} // Reset the design
        >
          Reset
        </button>
        <button
          className="relative py-2 px-6 cursor-pointer text-[#2c2c2c] text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-[#2c2c2c] hover:shadow-lg active:scale-90"
          onClick={handleExport}
        >
          Export
        </button>
        <UserManual />
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
            fillPatternRepeat="repeat"
            fillPatternEnabled={true}
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
                fillPatternRepeat="repeat"
                fillPatternEnabled={true}
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
                fillPatternScale={{ x: 0.15, y: 0.15 }}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
                fillPatternRepeat="repeat"
                fillPatternEnabled={true}
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
                fillPatternRepeat="repeat"
                fillPatternEnabled={true}
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
                fillPatternScale={{ x: 0.15, y: 0.15 }}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
                fillPatternRepeat="repeat"
                fillPatternEnabled={true}
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
                fillPatternRepeat="repeat"
                fillPatternEnabled={true}
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
                fillPatternRepeat="repeat"
                fillPatternEnabled={true}
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
                fillPatternScale={{ x: 0.15, y: 0.15 }}
                stroke="black"
                strokeWidth={2}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsSelected(false);
                  }
                }}
                fillPatternRepeat="repeat"
                fillPatternEnabled={true}
              />
            </>
          )}

          {objects.map((obj) => (
            <Image
              key={obj.id}
              ref={(node) => {
                if (node) imageRefs.current[obj.id] = node;
              }}
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
              onDragEnd={(e) => {
                const newX = e.target.x();
                const newY = e.target.y();
                setObjects((prev) =>
                  prev.map((item) =>
                    item.id === obj.id ? { ...item, x: newX, y: newY } : item
                  )
                );
              }}
              onTransformEnd={() => {
                const node = imageRefs.current[obj.id];
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                // Reset scaling to 1 after applying transformation to width/height
                node.scaleX(1);
                node.scaleY(1);

                const updated = {
                  x: node.x(),
                  y: node.y(),
                  width: node.width() * scaleX,
                  height: node.height() * scaleY,
                };

                setObjects((prev) =>
                  prev.map((item) =>
                    item.id === obj.id ? { ...item, ...updated } : item
                  )
                );

                console.log("Updated after transform:", updated);
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
