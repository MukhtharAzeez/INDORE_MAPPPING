import React, { useState, useRef, useEffect } from "react";
import "./leafLet.css";

function HouseDesignCreator({ setShowMap, showMap, setMapToDisplay }) {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState(showMap);
  const [currentShape, setCurrentShape] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [freelyDraw, setFreelyDraw] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);

  const updateMousePosition = (x, y) => {
    setMousePosition({ x, y });
  };
  useEffect(() => {
    // window.addEventListener("mousemove", updateMousePosition);
    //   return () => {
    //     window.removeEventListener("mousemove", updateMousePosition);
    //   };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Define canvas properties (e.g., size, background color)
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 200;
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all shapes
    ctx.strokeStyle = "black";
    ctx.lineWidth = lineWidth;

    console.log(shapes);
    shapes.forEach((shape) => {
      if (shape.length >= 2) {
        ctx.beginPath();
        for (let i = 1; i < shape.length; i++) {
          ctx.moveTo(shape[i - 1].x, shape[i - 1].y);
          ctx.lineTo(shape[i].x, shape[i].y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    });

    // Draw the current shape
    if (currentShape.length >= 2) {
      ctx.beginPath();

      for (let i = 1; i < currentShape.length; i++) {
        ctx.moveTo(currentShape[i - 1].x, currentShape[i - 1].y);
        ctx.lineTo(currentShape[i].x, currentShape[i].y);
      }

      ctx.closePath();
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.stroke();
    }
  }, [shapes, currentShape]);

  const setFreelyDrawing = () => {
    setFreelyDraw(!freelyDraw);
    saveCurrentShape();
    setMousePosition(0, 0);
  };

  const handleCanvasClick = (e) => {
    if (!freelyDraw) {
      setUndoStack([]);
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updateMousePosition(e.clientX, e.clientY);
      setCurrentShape([...currentShape, { x, y }]);
    }
  };

  const handleCanvasMouseDown = () => {
    if (freelyDraw) {
      setDrawing(true);
    }
  };

  const handleCanvasMouseUp = () => {
    if (freelyDraw) {
      setDrawing(false);
      saveCurrentShape();
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (freelyDraw && drawing) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCurrentShape([...currentShape, { x, y }]);
    }
  };

  const saveCurrentShape = () => {
    if (currentShape.length > 0) {
      setShapes([...shapes, currentShape]);
      setUndoStack([...undoStack, currentShape]);
      setRedoStack([]);
    }

    setCurrentShape([]);
  };

  const undo = () => {
    let undo;
    let lastShape;
    if (currentShape.length) {
      undo = currentShape.slice(0, -1);
      lastShape = currentShape[currentShape.length - 1];
      setCurrentShape(undo);
    } else if (shapes.length) {
      undo = shapes[shapes.length - 1].slice(0, -1);
      lastShape = shapes[shapes.length - 1];
      setShapes(undo);
    }
    setUndoStack([...undoStack, lastShape]);
  };

  const redo = () => {
    if (undoStack.length) {
      const redo = undoStack.pop();
      setCurrentShape([...currentShape, redo]);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1>House Design Creator</h1>
        {!freelyDraw ? (
          <>
            <button onClick={saveCurrentShape}>New Area</button>
            <button onClick={setFreelyDrawing}>Freely Drawing</button>
          </>
        ) : (
          <button onClick={setFreelyDrawing}>Normal Drawing</button>
        )}
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button
          onClick={() => {
            setShowMap(shapes);
            setMapToDisplay(false);
          }}
        >
          Show Map
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseDown={handleCanvasMouseDown}
        onMouseUp={handleCanvasMouseUp}
        onMouseMove={handleCanvasMouseMove}
        style={{ border: "1px solid black" }}
      />
      <div>
        <div
          className="perpendicular-lines"
          style={{ left: mousePosition.x, top: 0, height: "100%" }}
        ></div>
        <div
          className="perpendicular-lines"
          style={{ left: 0, top: mousePosition.y, width: "100%" }}
        ></div>
        <div
          className="mouse-pointer"
          style={{ left: mousePosition.x - 4, top: mousePosition.y - 4 }}
        ></div>
      </div>
    </>
  );
}

export default HouseDesignCreator;
