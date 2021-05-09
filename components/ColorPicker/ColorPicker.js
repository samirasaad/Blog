import React from "react";
import { BlockPicker } from "react-color";
import "react-color-picker/index.css";

const Picker = ({ colorValue, handleColorChange }) => {
  return (
    <BlockPicker onChangeComplete={handleColorChange} color={colorValue} />
  );
};

export default Picker;
