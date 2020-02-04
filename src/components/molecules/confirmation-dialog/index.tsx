import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import Button from '../../atoms/button';

interface Props {
  isOpen: boolean;
  title: string;
  content: string;
  onConfirm: Function;
  onCancel: Function;
}

export default function ConfirmationDialog({isOpen, title, content, onConfirm, onCancel}: Props) {
  return (
      <Dialog
        open={isOpen}
        onClose={() => onCancel()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color='secondary'>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
  );
}
