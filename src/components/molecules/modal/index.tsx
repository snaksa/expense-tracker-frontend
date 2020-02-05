import React from "react";
import { Modal as MaterialModal, Box, Backdrop, Fade } from "@material-ui/core";
import useStyles from "./styles";

interface Props {
  title: string;
  children: any;
  isOpen: boolean;
  handleClose: any;
}

const Modal: React.FunctionComponent<any> = ({
  title,
  children,
  isOpen,
  handleClose
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <MaterialModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <Box className={classes.header}>{title}</Box>
            <Box className={classes.content}>{children}</Box>
          </div>
        </Fade>
      </MaterialModal>
    </div>
  );
};

export default Modal;
