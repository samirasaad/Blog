import React from "react";
import { confirmAlert } from "react-confirm-alert";
import Btn from "./../../components/controls/Btn/Btn";
import "react-confirm-alert/src/react-confirm-alert.css";

const ConfirmatiomDialog = ({
  handleConfirm,
  handleCancel,
  confirmText,
  cancelText,
  clickableItem,
  dialogTitle,
  className,
}) => {
  const openDialog = () => {
    confirmAlert({
      title: dialogTitle,
      //   message: "Are you sure to do this.",
      buttons: [
        {
          label: confirmText,
          onClick: handleConfirm,
        },
        {
          label: cancelText,
          onClick: handleCancel,
        },
      ],
    });
  };

  return (
    <Btn
      content={clickableItem}
      handleClick={openDialog}
      className={className}
    />
  );
};

export default ConfirmatiomDialog;
