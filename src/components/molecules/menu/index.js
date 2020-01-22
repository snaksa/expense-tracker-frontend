import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import Title from '../../atoms/title';

const Menu = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.main} justify="flex-end" spacing={3}>
      <Grid item>
        <Title variant="subtitle2" display="inline">Login</Title>
      </Grid>
      <Grid item>
        <Title variant="subtitle2" display="inline">Register</Title>
      </Grid>
      <Grid item>
        <Title variant="subtitle2" display="inline">About</Title>
      </Grid>
    </Grid>
  );
}

export default Menu;
