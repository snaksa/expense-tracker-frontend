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
    <Grid container>
      <Grid item xs={12} sm={12} md={2} lg={1} className={classes.sidebar}></Grid>
      <Grid item xs={12} sm={12} md={10} lg={11}>
        <Grid container className={classes.main} justify="space-between">
          <Grid item>
            <Box className={classes.mobileMenuIcon}>
              <Button onClick={setSidebarVisibility} color='secondary'>
                <MenuIcon fontSize={"small"} />
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Box className={classes.logo}>Expense Tracker</Box>
          </Grid>
          <Grid item>
            <Box>
              <Button onClick={logout} color="secondary">
                <ExitToAppIcon fontSize={"small"} />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminHeaderMenu;
