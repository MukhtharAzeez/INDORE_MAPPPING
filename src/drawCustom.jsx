import React, { useState, useRef, useEffect } from "react";

function HouseDesignCreator({ setMapToDisplay, showMap }) {
  const [map, setMap] = useState(showMap);

  const canvasRef = useRef(null);

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
    ctx.lineWidth = 2;

    map.forEach((shape) => {
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
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <button onClick={() => setMapToDisplay(true)}>Show Canvas</button>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    
    </div>
  );
}

export default HouseDesignCreator;