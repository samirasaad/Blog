import React from "react";

const Btn = ({ type, className, handleClick, disabled, content }) => {
  return (
    <button
      className={className}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Btn;
