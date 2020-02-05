import React from "react";
import { Grid, Box } from "@material-ui/core";
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon
} from "@material-ui/icons";
import useStyles from "./styles";
import { useAuthDataContext } from "../../../services/auth-provider";
import Button from "../../atoms/button";

interface Props {
  setSidebarVisibility: Function;
}

const AdminHeaderMenu: React.FunctionComponent<Props> = ({
  setSidebarVisibility
}: Props): JSX.Element => {
  const classes = useStyles();

  const { onLogout } = useAuthDataContext();

  const logout = () => {
    onLogout();
  };

  return (
    <Grid container className={classes.main} justify="space-between">
      <Grid item>
        <Box className={classes.mobileMenuIcon}>
          <Button onClick={setSidebarVisibility}>
            <MenuIcon fontSize={"large"} />
          </Button>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.logo}>Expense Tracker</Box>
      </Grid>
      <Grid item>
        <Box>
          <Button onClick={logout}>
            <ExitToAppIcon fontSize={"large"} />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminHeaderMenu;
