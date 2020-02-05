import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";

interface Props {
  open: boolean;
  content: string;
  type: Color;
  onClose: Function;
}

export default function Notification({ open, content, type, onClose }: Props) {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    onClose(event);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert severity={type} onClose={handleClose}>
        {content}
      </Alert>
    </Snackbar>
  );
}
