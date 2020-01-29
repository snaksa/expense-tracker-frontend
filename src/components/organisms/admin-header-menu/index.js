import React from 'react';
import { Grid, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from './styles';
import Button from '../../atoms/button';
import { useAuthDataContext } from '../../../services/auth-provider';

const AdminHeaderMenu = ({ setSidebarVisibility }) => {
  const classes = useStyles();

  const { onLogout } = useAuthDataContext();

  const logout = () => {
    onLogout();
  }

  return (
    <Grid container className={classes.main} justify='space-between'>
      <Grid item>
        <Box className={classes.mobileMenuIcon}>
          <Button onClick={setSidebarVisibility}>
            <MenuIcon fontSize={'large'} />
          </Button>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.logo}>
          Expense Tracker
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <Button onClick={logout}>
            <ExitToAppIcon fontSize={'large'} />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AdminHeaderMenu;
