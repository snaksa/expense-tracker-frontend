import React from "react";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";

export interface Props {
  option: {
    label?: string;
  };
}

const SidebarOption: React.FunctionComponent<Props> = ({
  option
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.main} p={1}>
      {option.label}
    </Box>
  );
};

export default SidebarOption;
