import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import Title from '../../atoms/title';

interface Props {
  title: string;
  subtitle: string;
}

const Heading: React.FunctionComponent<any> = (
  {title, subtitle}: Props
): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container className={classes.main} direction="column">
      <Grid item>
        <Title variant="h3">{title}</Title>
      </Grid>
      <Grid item>
        <Title variant="h4">{subtitle}</Title>
      </Grid>
    </Grid>
  );
}

export default Heading;
