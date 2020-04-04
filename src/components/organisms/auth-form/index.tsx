import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";
import RoundImage from "../../molecules/round-image";

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
              <RoundImage src="https://pngimage.net/wp-content/uploads/2018/05/expense-icon-png-3.png" />
            </Box>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
