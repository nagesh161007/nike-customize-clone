import React, { useState } from "react";
import "./ColorPalette.css";

function ColorPalette({ config, changeColor, indexString }) {
  const { colors, types, title, modelPosition } = config;
  const [selectedColorIndex, setSelectedColor] = useState(colors[0]);

  return (
    <div className="color-palatte">
      <div className="color-tab-title">
        {title}
        {"  "}
        {indexString}
      </div>
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
                  changeColor(color, types, modelPosition);
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
