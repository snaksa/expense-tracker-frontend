import React from 'react';
import { Box, Grid, Link } from '@material-ui/core';
import Title from '../../atoms/title';
import useStyles from './styles';

const HeroMenu = () => {
  const classes = useStyles();

  return (
    <Box pr={3}>
      <Grid container className={classes.main} justify="flex-end" spacing={3}>
        <Grid item>
          <Link to={'/'}>
            <Title variant="subtitle2" display="inline">Login</Title>
          </Link>
        </Grid>
        <Grid item>
          <Link to={'/register'}>
            <Title variant="subtitle2" display="inline">Register</Title>
          </Link>
        </Grid>
        <Grid item>
          <Title variant="subtitle2" display="inline">About</Title>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroMenu;
