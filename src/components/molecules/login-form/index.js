import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import TextField from '../../atoms/text-field';
import Button from '../../atoms/button';

const LoginForm = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.main} direction="column">
      <Grid item>
        <TextField label='Email' variant="outlined" />
      </Grid>
      <Grid>
        <TextField label='Password' type="password" variant="outlined" />
      </Grid>
      <Grid>
        <Box mt={1}>
          <Button>Login</Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
