import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import RoundImage from '../../molecules/round-image';
import LoginForm from '../../molecules/login-form';

const Hero = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.main} direction="column">
      <Grid item>
        <Box className={classes.image} mt={-10} mb={3} mx='auto'>
          <RoundImage src="https://pngimage.net/wp-content/uploads/2018/05/expense-icon-png-3.png" />
        </Box>
      </Grid>
      <Grid>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default Hero;
