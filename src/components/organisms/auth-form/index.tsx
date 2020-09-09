import React from "react";
import { Grid, Box } from "@material-ui/core";
import RoundImage from "components/core/round-image";
import useStyles from "./styles";

interface Props {
  children: any;
}

const AuthForm = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.hero} direction="column">
      <Grid item>
        <Grid container className={classes.form} direction="column">
          <Grid item>
            <Box className={classes.image} mt={-21} mb={3} mx="auto">
              <RoundImage src="./authIcon.png" />
            </Box>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
