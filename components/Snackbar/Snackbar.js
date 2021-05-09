import React from "react";
import ReactSnackBar from "react-js-snackbar";

const Snackbar = ({ isOpen, msg, type }) => {

    return (
    <div>
      <ReactSnackBar
        Icon={type == "error" ? <span>❗</span> : <span>✅ </span>}
        Show={isOpen}
      >
        {msg}
      </ReactSnackBar>
    </div>
  );
};
export default Snackbar;
