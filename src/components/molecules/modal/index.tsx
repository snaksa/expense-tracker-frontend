import React from "react";
import MaterialModal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useStyles from './styles';

interface Props {
  title: string,
  children: any;
  isOpen: boolean; 
  handleClose: any;
}

export default function Modal({title, children, isOpen, handleClose}: Props) {
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
            <Box className={classes.header}>
              {title}
            </Box>
            <Box className={classes.content}>
              {children}
            </Box>
          </div>
        </Fade>
      </MaterialModal>
    </div>
  );
}
