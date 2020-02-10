import React from "react";
import { Box, Grid, Icon } from "@material-ui/core";
import useStyles from "./styles";
import { NavLink } from "react-router-dom";

export interface Props {
  option: {
    label?: string;
    to?: string;
    icon?: any;
  };
}

const SidebarOption: React.FunctionComponent<Props> = ({
  option
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <NavLink
        to={option.to ?? ""}
        exact
        className={classes.link}
        activeClassName={classes.active}
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