import React, { useState } from "react";
import "./ColorPalette.css";

function ColorPalette({ config, changeColor }) {
  const { colors, type, title } = config;
  const [selectedColorIndex, setSelectedColor] = useState(colors[0]);

  return (
    <div className="color-palatte">
      <div className="title">{title}</div>
      <div className="colors-tray">
        <ul className="colors-list">
          {colors.map((color, index) => {
            return (
              <li
                key={index}
                className={`color-circle ${
                  index === selectedColorIndex ? "selected" : ""
                }`}
                style={{ background: color }}
                onClick={() => {
                  setSelectedColor(index);
                  changeColor(color, type);
                }}
              ></li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ColorPalette;
