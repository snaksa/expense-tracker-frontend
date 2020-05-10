import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Grid, Icon } from "@material-ui/core";
import useStyles from "./styles";

export interface Props {
  option: {
    label?: string;
    to?: string;
    icon?: any;
  };
  onClick: any;
}

const SidebarOption: React.FunctionComponent<Props> = ({
  option,
  onClick,
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <NavLink
        to={option.to ?? ""}
        exact
        className={classes.link}
        activeClassName={classes.active}
        onClick={onClick}
      >
        <Box p={3}>
          <Grid container justify="flex-start" alignItems="center" spacing={1}>
            <Grid item>
              <Icon fontSize="small">{option.icon}</Icon>
            </Grid>
            <Grid item>{option.label}</Grid>
          </Grid>
        </Box>
      </NavLink>
    </Box>
  );
};

export default SidebarOption;
