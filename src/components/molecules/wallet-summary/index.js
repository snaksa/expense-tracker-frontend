import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import Title from '../../atoms/title';

const WalletSummary = ({ id, name, amount, color, onClick }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(true);

  return (
    <Grid
      container
      className={classes.main}
      direction="column"
      onClick={
        () => {
          onClick(id, !checked);
          setChecked(!checked);
        }
      }
      style={{ opacity: checked ? 1 : 0.3 }}
    >
      <Grid item>
        <Box p={2} style={{ backgroundColor: color }}>
        </Box>
      </Grid>
      <Grid item>
        <Box p={1}>
          <Title variant="subtitle2">{name}</Title>
          <Title variant="subtitle1">${amount}</Title>
        </Box>
      </Grid>
    </Grid>
  );
}

export default WalletSummary;
