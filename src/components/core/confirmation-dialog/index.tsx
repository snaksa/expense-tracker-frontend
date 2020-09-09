import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import useTranslations from "translations";
import Button from "components/core/button";

interface Props {
  isOpen: boolean;
  title: string;
  content: string;
  onConfirm: Function;
  onCancel: Function;
}

const ConfirmationDialog: React.FunctionComponent<any> = ({
  isOpen,
  title,
  content,
  onConfirm,
  onCancel,
}: Props): JSX.Element => {
  const { t } = useTranslations();

  return (
    <Dialog
      open={isOpen}
      onClose={() => onCancel()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          {t("Cancel")}
        </Button>
        <Button onClick={onConfirm}>{t("OK")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
