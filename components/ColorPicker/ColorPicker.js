import React from "react";
import { ChromePicker } from "react-color";
import "react-color-picker/index.css";

const Picker = ({ colorValue, handleColorChange }) => {
  return (
    <ChromePicker
      onChangeComplete={handleColorChange}
      color={colorValue}
      disableAlpha={true}
    />
  );
};

export default Picker;
