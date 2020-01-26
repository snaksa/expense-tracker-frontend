import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import SidebarOption from '../../atoms/sidebar-option';

const Sidebar = ({ isVisible, options }) => {
  const classes = useStyles();
  return isVisible ? (
    <Grid container className={classes.main} direction='column'>
      {
        options.map(option => <Grid item>
          <SidebarOption option={option} />
        </Grid>)
      }
    </Grid>
  )
  : '';
}

export default Sidebar;
