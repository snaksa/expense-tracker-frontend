import React from 'react';
import { Grid, Box, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from './styles';
import Button from '../../atoms/button';

const AdminHeaderMenu = () => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Grid container justify='flex-end' className={classes.main} justify='space-between'>
      <Grid item>
        <Box className={classes.mobileMenuIcon}>
          <Button>
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
          <Button>
            <ExitToAppIcon fontSize={'large'} />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AdminHeaderMenu;
