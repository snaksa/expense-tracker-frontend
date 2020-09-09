import React from "react";
import Grid from "@material-ui/core/Grid";
import Title from "components/core/title";
import useStyles from "./styles";

interface Props {
  title: string;
  subtitle: string;
  color?: string;
}

const Heading: React.FunctionComponent<any> = ({
  title,
  subtitle,
  color,
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.main}
      direction="column"
      style={{ color: color }}
    >
      <Grid item>
        <Title variant="h3">{title}</Title>
      </Grid>
      <Grid item>
        <Title variant="h4">{subtitle}</Title>
      </Grid>
    </Grid>
  );
};

export default Heading;
